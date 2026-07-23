import { Link, useLocation } from 'react-router';

import { buildAtlasHrefFromPreview, parseAtlasQueryState } from '@/shared/lib/atlas/atlasQueryState';
import { ChapterFrame } from '@/shared/ui/ChapterFrame';
import { PageFrame } from '@/shared/ui/PageFrame';
import { AtlasDataUnavailable, AtlasProjectionNote } from '@/shared/ui/atlas';
import { AtlasMetadataRail } from '@/widgets/atlas-explorer/AtlasMetadataRail';
import { AtlasSectionHeader } from '@/widgets/atlas-explorer/AtlasSectionHeader';

export function ChapterAnswersAtlas() {
  const location = useLocation();
  const query = parseAtlasQueryState(location.search).state;
  const explorerHref = buildAtlasHrefFromPreview(query.status, query.types);
  const fixtureMode = import.meta.env.DEV
    && import.meta.env.VITE_ATLAS_FIXTURE_PROVENANCE === 'CONTRACT_FIXTURE';

  return (
    <ChapterFrame id="answers" orderNumber="CHAPTER 04">
      <PageFrame>
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
              { label: 'Data status', value: 'APPROVAL PENDING', tone: 'warning' },
              { label: 'Fallback', value: 'PROHIBITED', tone: 'signal' },
            ]}
          />
        </div>

        {fixtureMode ? (
          <p className="mt-8 border border-[var(--atlas-state-warning)] bg-[var(--color-behavior-amber-bg)] px-4 py-3 font-mono text-xs font-bold" data-testid="story-fixture-provenance">
            CONTRACT_FIXTURE / 개발·테스트 전용 / Story에는 임시 node를 표시하지 않음
          </p>
        ) : null}

        <div className="mt-8">
          <AtlasDataUnavailable
            title="Story Preview의 승인 데이터가 연결되지 않았습니다"
            description="승인 manifest와 동일한 ViewModel이 Story에 연결되기 전까지 8-node mock SVG와 임시 좌표를 표시하지 않습니다. 데이터 상태와 방법론을 확인하거나 Full Explorer의 fail-closed shell로 이동할 수 있습니다."
            reason="STORY_APPROVED_VIEWMODEL_NOT_CONNECTED"
            testId="story-atlas-data-unavailable"
            actions={(
              <>
                <Link className="atlas-action-primary" to={explorerHref}>전체 답변행태 지도 보기</Link>
                <Link className="atlas-action-secondary" to="/method">투영 방법 확인</Link>
                <Link className="atlas-action-secondary" to="/data">데이터 승인 상태 확인</Link>
              </>
            )}
          />
        </div>

        <p className="redline-annotation-rule mt-8 max-w-3xl text-sm leading-relaxed text-[var(--ink-secondary)]">
          승인 데이터가 연결되면 이 장면은 핵심 패턴만 설명합니다. 전체 node·selection inspector·evidence 추적은 Full Explorer에서 담당합니다.
        </p>
      </PageFrame>
    </ChapterFrame>
  );
}
