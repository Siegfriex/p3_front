import { useDetailNavigation } from '@/shared/hooks/useDetailNavigation';
import type { AtlasNodeViewModel } from '@/shared/types/atlas';
import { AtlasInvalidNodeState } from '@/shared/ui/atlas';

interface AtlasInspectorProps {
  node: AtlasNodeViewModel | null;
  invalidNodeId?: string | null;
  onClearInvalidNode?: () => void;
}

export function AtlasInspector({ node, invalidNodeId, onClearInvalidNode }: AtlasInspectorProps) {
  const { openEvidence } = useDetailNavigation();
  const openRepresentativeEvidence = () => {
    if (node?.representativeEvidenceId) openEvidence(node.representativeEvidenceId);
  };

  return (
    <aside id="atlas-selection-inspector" aria-label="선택 node 상세" className="atlas-selection-inspector border-t-2 border-[var(--ink-primary)] bg-[var(--paper-muted)] p-5 md:p-6 xl:sticky xl:top-20 xl:self-start" tabIndex={-1}>
      {invalidNodeId && onClearInvalidNode ? (
        <AtlasInvalidNodeState nodeId={invalidNodeId} onClear={onClearInvalidNode} />
      ) : !node ? (
        <div className="min-h-64">
          <p className="redline-meta text-[var(--signal-red-dark)]">SELECTION INSPECTOR / 00</p>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight">선택된 기록이 없습니다</h2>
          <p className="mt-5 text-sm leading-relaxed text-[var(--color-neutral-700)]">node를 선택하면 계약 필드와 승인된 증거 추적 경로가 여기에 표시됩니다.</p>
        </div>
      ) : (
        <div>
          <p className="redline-meta text-[var(--signal-red-dark)]">SELECTED / {node.answerType} / {node.status}</p>
          <h2 className="mt-4 border-l-2 border-[var(--signal-red)] pl-4 font-serif text-3xl font-bold leading-tight">{node.topicLabel ?? '주제 미지정'}</h2>
          <dl className="mt-7 grid grid-cols-2 border-y border-[var(--line-medium)] text-sm">
            <div className="border-b border-r border-[var(--line-faint)] p-3"><dt className="text-[var(--color-neutral-700)]">답변 수</dt><dd className="mt-1 font-mono text-lg font-bold">{node.answerCount}</dd></div>
            <div className="border-b border-[var(--line-faint)] p-3"><dt className="text-[var(--color-neutral-700)]">연결 수</dt><dd className="mt-1 font-mono text-lg font-bold">{node.linkCount}</dd></div>
            <div className="border-r border-[var(--line-faint)] p-3"><dt className="text-[var(--color-neutral-700)]">질량</dt><dd className="mt-1 font-mono text-lg font-bold">{node.normalizedMass.toFixed(3)}</dd></div>
            <div className="p-3"><dt className="text-[var(--color-neutral-700)]">신뢰도</dt><dd className="mt-1 font-mono text-lg font-bold">{node.confidence === null ? '미제공' : node.confidence.toFixed(3)}</dd></div>
          </dl>
          {node.isPublicEvidenceAvailable && node.representativeEvidenceId ? (
            <button type="button" className="atlas-action-primary mt-6 w-full" onClick={openRepresentativeEvidence}>
              승인된 대표 증거 보기
            </button>
          ) : (
            <p className="mt-6 border-t border-[var(--color-neutral-200)] pt-4 text-sm text-[var(--color-neutral-700)]">공개 승인된 대표 증거가 연결되지 않았습니다.</p>
          )}
        </div>
      )}
    </aside>
  );
}
