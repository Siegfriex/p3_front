import type { AtlasNodeViewModel } from '@/shared/types/atlas';

const FAMILY_LABELS: Record<AtlasNodeViewModel['behaviorFamily'], string> = {
  information_non_direct: '정보 부재·비직접 계열',
  deferral_procedural: '유보·절차 계열',
  action_evidence: '조치·근거 계열',
};

const STATUS_LABELS: Record<AtlasNodeViewModel['status'], string> = {
  complete: '추진완료',
  active: '추진중',
  unresolved: '미완료·단절',
};

interface StoryAtlasDossierProps {
  node: AtlasNodeViewModel | null;
  onOpenEvidence: (evidenceId: string) => void;
}

export function StoryAtlasDossier({ node, onOpenEvidence }: StoryAtlasDossierProps) {
  return (
    <aside className="story-atlas-dossier" aria-label="Story 선택 node 요약" aria-live="polite">
      <p className="redline-meta text-[var(--signal-red-dark)]">SELECTED DOSSIER / STORY DEPTH</p>
      {!node ? (
        <div className="story-atlas-dossier__empty">
          <span aria-hidden="true">↳</span>
          <h3>한 점을 선택해 답변행태를 읽어보세요</h3>
          <p>위치는 주제, 모양은 행동 계열, 내부 표식은 A1–A8, 크기는 정규화된 질량을 뜻합니다.</p>
          <dl>
            <div><dt>Story 범위</dt><dd>승인 node 16개</dd></div>
            <div><dt>다음 단계</dt><dd>Full Explorer</dd></div>
          </dl>
        </div>
      ) : (
        <div className="story-atlas-dossier__selected" data-testid="story-selected-dossier">
          <div className="story-atlas-dossier__identity">
            <span>{node.answerType}</span>
            <div>
              <p>{FAMILY_LABELS[node.behaviorFamily]}</p>
              <h3>{node.topicLabel ?? '검토된 topic label 없음'}</h3>
            </div>
          </div>
          <dl className="story-atlas-dossier__metrics">
            <div><dt>처리상태</dt><dd>{STATUS_LABELS[node.status]}</dd></div>
            <div><dt>답변 수</dt><dd>{node.answerCount}건</dd></div>
            <div><dt>질량</dt><dd>{node.normalizedMass.toFixed(3)}</dd></div>
            <div><dt>신뢰도</dt><dd>{node.confidence === null ? '미제공' : node.confidence.toFixed(3)}</dd></div>
          </dl>
          <p className="story-atlas-dossier__id">{node.id}</p>
          {node.isPublicEvidenceAvailable && node.representativeEvidenceId ? (
            <button className="atlas-action-primary w-full" type="button" onClick={() => onOpenEvidence(node.representativeEvidenceId!)}>
              대표 근거 보기
            </button>
          ) : (
            <p className="story-atlas-dossier__unavailable" role="status">공개 승인된 대표 근거가 연결되지 않은 node입니다.</p>
          )}
        </div>
      )}
    </aside>
  );
}
