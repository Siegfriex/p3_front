import { useMemo, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router';

import { useAtlasRelease } from '@/shared/api/atlas/useAtlasRelease';
import type { NodeFilterState } from '@/shared/config/atlas/atlasEncoding';
import { useDetailNavigation } from '@/shared/hooks/useDetailNavigation';
import { selectStoryAtlasNodes } from '@/shared/lib/atlas/atlasNodeParity';
import {
  buildAtlasHrefFromPreview,
  parseAtlasQueryState,
  serializeAtlasQueryState,
} from '@/shared/lib/atlas/atlasQueryState';
import { ANSWER_TYPES, type AtlasQueryState } from '@/shared/types/atlas';
import { ChapterFrame } from '@/shared/ui/ChapterFrame';
import { PageFrame } from '@/shared/ui/PageFrame';
import { AtlasDataUnavailable, AtlasEmptyState, AtlasLoadingState, AtlasProjectionNote } from '@/shared/ui/atlas';
import { AtlasControls } from '@/widgets/atlas-explorer/AtlasControls';
import { AtlasDomMirror } from '@/widgets/atlas-explorer/AtlasDomMirror';
import { AtlasLegend } from '@/widgets/atlas-explorer/AtlasLegend';
import { AtlasMetadataRail } from '@/widgets/atlas-explorer/AtlasMetadataRail';
import { AtlasScene } from '@/widgets/atlas-explorer/AtlasScene';
import { AtlasSectionHeader } from '@/widgets/atlas-explorer/AtlasSectionHeader';
import { StoryAtlasDossier } from './StoryAtlasDossier';
import './story-atlas-vid.css';

export function ChapterAnswersAtlas() {
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();
  const release = useAtlasRelease();
  const releaseBundle = release.status === 'ready' ? release.bundle : null;
  const { openEvidence } = useDetailNavigation();
  const [previewNodeId, setPreviewNodeId] = useState<string | null>(null);
  const [focusNodeId, setFocusNodeId] = useState<string | null>(null);
  const queryResult = useMemo(() => parseAtlasQueryState(location.search), [location.search]);
  const query = queryResult.state;
  const explorerHref = buildAtlasHrefFromPreview(query.status, query.types);
  const fixtureMode = import.meta.env.DEV
    && import.meta.env.VITE_ATLAS_FIXTURE_PROVENANCE === 'CONTRACT_FIXTURE';

  const storySelection = useMemo(() => {
    if (!releaseBundle) return null;
    try {
      return {
        nodes: selectStoryAtlasNodes(
          releaseBundle.nodes,
          releaseBundle.storyPreviewNodeIds,
          {
            explorerReleaseId: releaseBundle.releaseId,
            storyReleaseId: releaseBundle.releaseId,
            explorerProjectionId: releaseBundle.projectionId,
            storyProjectionId: releaseBundle.projectionId,
          },
        ),
        error: null,
      };
    } catch (error) {
      return { nodes: [], error: error instanceof Error ? error : new Error('Unknown Story selection error') };
    }
  }, [releaseBundle]);

  const storyNodes = useMemo(() => storySelection?.nodes ?? [], [storySelection]);
  const filteredNodes = useMemo(
    () => storyNodes.filter((node) => (query.status === 'all' || node.status === query.status) && query.types.includes(node.answerType)),
    [query.status, query.types, storyNodes],
  );
  const matchedIds = useMemo(() => new Set(filteredNodes.map((node) => node.id)), [filteredNodes]);
  const filterStates = useMemo(
    () => new Map(storyNodes.map((node): [string, NodeFilterState] => [node.id, matchedIds.has(node.id) ? 'matched' : 'excluded'])),
    [matchedIds, storyNodes],
  );
  const selectedNode = query.nodeId ? storyNodes.find((node) => node.id === query.nodeId) ?? null : null;

  const updateQuery = (next: AtlasQueryState) => setSearchParams(serializeAtlasQueryState(next));
  const reset = () => updateQuery({ status: 'all', types: [...ANSWER_TYPES], nodeId: null, view: 'nodes' });

  return (
    <ChapterFrame id="answers" orderNumber="CHAPTER 04">
      <PageFrame className="story-atlas-vid">
        <AtlasSectionHeader
          index="04"
          eyebrow="어떻게 답했나 / STORY PREVIEW"
          title="답변은 어디에 모였는가"
          thesis="같은 주제 공간 안에서 답변이 어떤 행동 유형과 처리 상태를 보이는지 탐색합니다. 위치는 topic space, 모양과 내부 표식은 답변행태를 뜻합니다."
          aside={<AtlasProjectionNote compact />}
          headingLevel="h2"
        />

        <div className="mt-6">
          <AtlasMetadataRail
            label="Story Preview 계약 상태"
            items={[
              { label: 'Story role', value: 'EDITORIAL PREVIEW' },
              { label: 'Explorer role', value: 'URL-BACKED FIELD' },
              { label: 'Data status', value: release.status === 'ready' ? 'APPROVED RELEASE' : 'UNAVAILABLE', tone: release.status === 'ready' ? 'default' : 'warning' },
              { label: 'Fallback', value: 'PROHIBITED', tone: 'signal' },
            ]}
          />
        </div>

        {fixtureMode ? (
          <p className="mt-8 border border-[var(--atlas-state-warning)] bg-[var(--color-behavior-amber-bg)] px-4 py-3 font-mono text-xs font-bold" data-testid="story-fixture-provenance">
            CONTRACT_FIXTURE / 개발·테스트 전용
          </p>
        ) : null}

        <div className="mt-8">
          {release.status === 'loading' ? <AtlasLoadingState testId="story-atlas-loading" /> : null}
          {release.status === 'unavailable' ? (
            <AtlasDataUnavailable
              title="Story Preview의 승인 데이터를 불러올 수 없습니다"
              description="current release pointer 또는 승인 manifest가 없으며 개발용 node를 대신 표시하지 않습니다."
              reason={release.reason}
              testId="story-atlas-data-unavailable"
              actions={(
                <>
                  <Link className="atlas-action-primary" to={explorerHref}>전체 답변행태 지도 보기</Link>
                  <Link className="atlas-action-secondary" to="/data">데이터 승인 상태 확인</Link>
                </>
              )}
            />
          ) : null}
          {release.status === 'error' || storySelection?.error ? (
            <AtlasDataUnavailable
              title="Story Preview 계약 검증에 실패했습니다"
              description={(release.status === 'error' ? release.error : storySelection?.error)?.message ?? '알 수 없는 오류'}
              reason="STORY_APPROVED_VIEWMODEL_INVALID"
              testId="story-atlas-data-unavailable"
              actions={<button className="atlas-action-primary" type="button" onClick={release.retry}>다시 시도</button>}
            />
          ) : null}
          {release.status === 'ready' && storySelection && !storySelection.error ? (
            <section
              className="story-atlas-ready flex flex-col"
              data-testid="story-atlas-ready"
              data-release-id={release.bundle.releaseId}
              data-projection-id={release.bundle.projectionId}
              data-projection-hash={release.bundle.projectionHash}
              onKeyDown={(event) => {
                if (event.key === 'Escape' && query.nodeId) updateQuery({ ...query, nodeId: null });
              }}
            >
              <div className="flex flex-col gap-3 border-y border-[var(--line-medium)] py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="redline-meta text-[var(--ink-tertiary)]">APPROVED RELEASE / SHARED VIEWMODEL</p>
                  <p className="mt-1 break-all font-mono text-xs font-bold">{release.bundle.releaseId}</p>
                </div>
                <p className="inline-flex min-h-11 items-center border border-[var(--atlas-state-ready)] bg-[var(--color-behavior-blue-bg)] px-4 font-mono text-xs font-bold">
                  preview nodes {storyNodes.length}개
                </p>
              </div>
              {queryResult.issues.length > 0 ? (
                <p className="border border-[var(--atlas-state-warning)] px-4 py-3 text-sm" role="status">URL parameter {queryResult.issues.length}개를 안전한 기본값으로 해석했습니다.</p>
              ) : null}
              <AtlasControls
                status={query.status}
                types={query.types}
                onStatusChange={(status) => updateQuery({ ...query, status, nodeId: null })}
                onTypesChange={(types) => updateQuery({ ...query, types, nodeId: null })}
                onReset={reset}
              />
              <AtlasLegend />
              <div className="story-atlas-workspace">
                <AtlasScene
                  nodes={storyNodes}
                  nodeFilterStates={filterStates}
                  selectedNodeId={selectedNode?.id ?? null}
                  previewNodeId={previewNodeId}
                  focusNodeId={focusNodeId}
                  onSelectNode={(nodeId) => updateQuery({ ...query, nodeId })}
                  onPreviewNode={setPreviewNodeId}
                />
                <StoryAtlasDossier node={selectedNode} onOpenEvidence={openEvidence} />
              </div>
              {filteredNodes.length === 0 ? (
                <AtlasEmptyState
                  title="조건에 맞는 Story node가 없습니다"
                  description="승인된 16-node subset은 유지되며 선택한 상태와 유형의 교집합만 비어 있습니다."
                  onReset={reset}
                  testId="story-atlas-filter-empty-state"
                />
              ) : (
                <div className="story-atlas-dom-mirror">
                  <AtlasDomMirror
                    nodes={filteredNodes}
                    selectedNodeId={selectedNode?.id ?? null}
                    onSelectNode={(nodeId) => updateQuery({ ...query, nodeId })}
                    onClearSelection={() => updateQuery({ ...query, nodeId: null })}
                    onPreviewNode={setPreviewNodeId}
                    onFocusNode={setFocusNodeId}
                  />
                </div>
              )}
              <div className="flex flex-wrap gap-3 border-t border-[var(--line-medium)] pt-5">
                <Link className="atlas-action-primary" to={explorerHref}>현재 필터로 전체 답변행태 지도 보기</Link>
                <Link className="atlas-action-secondary" to="/method">투영 방법 확인</Link>
              </div>
              <AtlasProjectionNote />
            </section>
          ) : null}
        </div>

        <p className="redline-annotation-rule mt-8 max-w-3xl text-sm leading-relaxed text-[var(--ink-secondary)]">
          이 장면은 승인된 16개 node만 설명합니다. 전체 node·selection inspector·evidence 추적은 Full Explorer에서 담당합니다.
        </p>
      </PageFrame>
    </ChapterFrame>
  );
}
