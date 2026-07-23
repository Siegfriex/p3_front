import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router';

import { loadAtlasBundle } from '@/shared/api/atlas/loadAtlasBundle';
import { loadAtlasManifest, type AtlasUnavailableReason } from '@/shared/api/atlas/loadAtlasManifest';
import { ATLAS_PLOT_RECT } from '@/shared/config/atlas/atlasEncoding';
import { ATLAS_DATA_UNAVAILABLE_COPY } from '@/shared/config/atlas/atlasWarnings';
import { parseAtlasQueryState, serializeAtlasQueryState } from '@/shared/lib/atlas/atlasQueryState';
import { createProjectionScale } from '@/shared/lib/atlas/scaleProjection';
import { toAtlasViewModel } from '@/shared/lib/atlas/toAtlasViewModel';
import type { AtlasViewModelBundle } from '@/shared/types/atlas';
import { PageFrame } from '@/shared/ui/PageFrame';
import { AtlasDataUnavailable, AtlasLoadingState, AtlasProjectionNote } from '@/shared/ui/atlas';
import { AtlasExplorer } from '@/widgets/atlas-explorer/AtlasExplorer';
import { AtlasMetadataRail } from '@/widgets/atlas-explorer/AtlasMetadataRail';
import { AtlasSectionHeader } from '@/widgets/atlas-explorer/AtlasSectionHeader';
import { AtlasUnavailableShell } from '@/widgets/atlas-explorer/AtlasUnavailableShell';
import { AtlasRouteError } from './AtlasRouteError';

type AtlasPageState =
  | { status: 'loading' }
  | { status: 'unavailable'; reason: AtlasUnavailableReason }
  | { status: 'error'; error: Error }
  | { status: 'ready'; bundle: AtlasViewModelBundle };

export function AtlasPage() {
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();
  const [retryKey, setRetryKey] = useState(0);
  const [pageState, setPageState] = useState<AtlasPageState>({ status: 'loading' });
  const queryResult = useMemo(() => parseAtlasQueryState(location.search), [location.search]);

  useEffect(() => {
    const controller = new AbortController();
    void (async () => {
      try {
        const manifestResult = await loadAtlasManifest(undefined, fetch, controller.signal);
        if (manifestResult.status === 'unavailable') {
          setPageState({ status: 'unavailable', reason: manifestResult.reason });
          return;
        }
        const transport = await loadAtlasBundle(manifestResult.manifest, manifestResult.baseUrl, fetch, controller.signal);
        const bounds = {
          xMin: transport.projectionMeta.x_min,
          xMax: transport.projectionMeta.x_max,
          yMin: transport.projectionMeta.y_min,
          yMax: transport.projectionMeta.y_max,
        };
        const bundle = toAtlasViewModel(transport, createProjectionScale(bounds, ATLAS_PLOT_RECT), manifestResult.baseUrl);
        setPageState({ status: 'ready', bundle });
      } catch (error) {
        if (controller.signal.aborted) return;
        setPageState({ status: 'error', error: error instanceof Error ? error : new Error('Unknown Atlas error') });
      }
    })();
    return () => controller.abort();
  }, [retryKey]);

  const fixtureProvenance = import.meta.env.DEV && import.meta.env.VITE_ATLAS_FIXTURE_PROVENANCE === 'CONTRACT_FIXTURE'
    ? 'CONTRACT_FIXTURE'
    : undefined;
  const releaseState = pageState.status === 'ready'
    ? `RELEASE ${pageState.bundle.releaseId}`
    : pageState.status === 'loading'
      ? 'RELEASE 확인 중'
      : 'APPROVED DATA 미연결';

  return (
    <main id="main-content" className="py-12 md:py-16 lg:py-20" data-testid="atlas-page" tabIndex={-1}>
      <PageFrame>
        <AtlasSectionHeader
          index="A"
          eyebrow="FULL EXPLORER / PUBLIC RECORD"
          title="답변행태 지도"
          thesis="승인된 aggregate node만 표시하는 URL 기반 증거 탐색면입니다. 브라우저는 투영·집계·상태를 새로 계산하지 않습니다."
          aside={<p className={`inline-flex min-h-11 w-full items-center justify-center border px-4 font-mono text-xs font-bold ${pageState.status === 'ready' ? 'border-[var(--atlas-state-ready)] bg-[var(--color-behavior-blue-bg)]' : 'border-[var(--atlas-state-warning)] bg-[var(--color-behavior-amber-bg)]'}`} role="status">{releaseState}</p>}
        />
        <div className="mt-6">
          <AtlasMetadataRail
            items={[
              { label: 'Layer 01', value: 'PUBLIC RECORD' },
              { label: 'Layer 02', value: 'QUESTION / ANSWER FIELD' },
              { label: 'Layer 03', value: 'EVIDENCE TRACE' },
              { label: 'Renderer', value: 'AGGREGATE SVG / 2D', tone: pageState.status === 'ready' ? 'default' : 'warning' },
            ]}
          />
        </div>

        <div className="mt-12">
          {pageState.status === 'loading' ? (
            <AtlasLoadingState />
          ) : null}
          {pageState.status === 'unavailable' ? (
            <div className="space-y-6">
              <AtlasDataUnavailable
                title={ATLAS_DATA_UNAVAILABLE_COPY.title}
                description={ATLAS_DATA_UNAVAILABLE_COPY.description}
                reason={pageState.reason}
                actions={(
                  <>
                    <Link className="atlas-action-primary" to="/#answers">Story Answers로 돌아가기</Link>
                    <Link className="atlas-action-secondary" to="/data">데이터 승인 상태 확인</Link>
                    <Link className="atlas-action-secondary" to="/method">투영 방법 확인</Link>
                  </>
                )}
              />
              {queryResult.issues.length > 0 ? <p className="border border-[var(--atlas-state-warning)] bg-[var(--color-behavior-amber-bg)] px-4 py-3 text-sm" role="status">URL parameter {queryResult.issues.length}개는 안전한 기본값으로 해석됩니다.</p> : null}
              <AtlasUnavailableShell />
              <AtlasProjectionNote />
            </div>
          ) : null}
          {pageState.status === 'error' ? (
            <AtlasRouteError
              error={pageState.error}
              onRetry={() => {
                setPageState({ status: 'loading' });
                setRetryKey((value) => value + 1);
              }}
            />
          ) : null}
          {pageState.status === 'ready' ? (
            <AtlasExplorer
              bundle={pageState.bundle}
              query={queryResult.state}
              queryIssues={queryResult.issues}
              fixtureProvenance={fixtureProvenance}
              onQueryChange={(query) => setSearchParams(serializeAtlasQueryState(query))}
            />
          ) : null}
        </div>
      </PageFrame>
    </main>
  );
}
