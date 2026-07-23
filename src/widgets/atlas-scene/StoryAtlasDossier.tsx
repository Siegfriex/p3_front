import { ANSWER_TYPE_SEMANTICS, BEHAVIOR_FAMILY_PRESENTATION } from '@/shared/config/atlas/atlasSemantics';
import type { AtlasNodeViewModel } from '@/shared/types/atlas';

const STATUS_LABELS: Record<AtlasNodeViewModel['status'], string> = {
  complete: '추진완료',
  active: '추진중',
  unresolved: '미완료·단절',
};

interface StoryAtlasDossierProps {
  node: AtlasNodeViewModel | null;
  onOpenEvidence: (evidenceId: string) => void;
  isEditorialAnchor: boolean;
  atlasNodeCount: number;
  anchorCount: number;
}

export function StoryAtlasDossier({ node, onOpenEvidence, isEditorialAnchor, atlasNodeCount, anchorCount }: StoryAtlasDossierProps) {
  const semantics = node ? ANSWER_TYPE_SEMANTICS[node.answerType] : null;
  const family = node ? BEHAVIOR_FAMILY_PRESENTATION[node.behaviorFamily] : null;
  return (
    <aside className="story-atlas-dossier" aria-label="Story 선택 node 요약" aria-live="polite">
      <p className="redline-meta text-[var(--signal-red-dark)]">SELECTED CONTEXT / STORY DEPTH</p>
      {!node ? (
        <div className="story-atlas-dossier__empty">
          <span aria-hidden="true">↳</span>
          <h3>한 점을 선택해 답변행태를 읽어보세요</h3>
          <p>위치는 주제, 모양은 행동 계열, 내부 표식은 A1–A8, 크기는 정규화된 질량을 뜻합니다.</p>
          <dl>
            <div><dt>전체 지형</dt><dd>{atlasNodeCount} nodes</dd></div>
            <div><dt>편집 anchor</dt><dd>{anchorCount} nodes</dd></div>
          </dl>
        </div>
      ) : (
        <div className="story-atlas-dossier__selected" data-testid="story-selected-dossier">
          <div className="story-atlas-dossier__narrative">
            <div className="story-atlas-dossier__identity">
              <span>{node.answerType}</span>
              <div>
                <p>{isEditorialAnchor ? 'EDITORIAL ANCHOR · ' : ''}{family?.label}</p>
                <h3>{semantics?.name}</h3>
              </div>
            </div>
            <p className="story-atlas-dossier__definition">{semantics?.definition}</p>
            <blockquote>
              <span>TOPIC CONTEXT</span>
              {node.topicLabel ?? '검토된 topic label 없음'}
            </blockquote>
            <p className="story-atlas-dossier__reading">
              이 점의 위치는 승인된 topic projection 좌표입니다. 크기는 질량, 색과 형태는 답변 계열을 뜻하며 화면 거리 자체를 유사도 점수로 해석하지 않습니다.
            </p>
          </div>
          <div className="story-atlas-dossier__facts">
            <dl className="story-atlas-dossier__metrics">
              <div><dt>처리상태</dt><dd>{STATUS_LABELS[node.status]}</dd></div>
              <div><dt>답변 수</dt><dd>{node.answerCount}건</dd></div>
              <div><dt>정규화 질량</dt><dd>{node.normalizedMass.toFixed(3)}</dd></div>
              <div><dt>신뢰도</dt><dd>{node.confidence === null ? '미제공' : node.confidence.toFixed(3)}</dd></div>
              <div><dt>node 내부 평균 유사도</dt><dd>{node.meanSimilarity === null ? '미제공' : node.meanSimilarity.toFixed(3)}</dd></div>
              <div><dt>표시 좌표</dt><dd>{node.display.x.toFixed(3)}, {node.display.y.toFixed(3)}</dd></div>
            </dl>
            <p className="story-atlas-dossier__similarity-note">평균 유사도는 node 내부 응집도 맥락이며, 두 점 사이 화면 거리와 다른 값입니다.</p>
            <p className="story-atlas-dossier__id">{node.id}</p>
            {node.isPublicEvidenceAvailable && node.representativeEvidenceId ? (
              <button className="atlas-action-primary w-full" type="button" onClick={() => onOpenEvidence(node.representativeEvidenceId!)}>
                대표 근거와 원문 보기
              </button>
            ) : (
              <p className="story-atlas-dossier__unavailable" role="status">공개 승인된 대표 근거가 연결되지 않은 node입니다.</p>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
