import { ANSWER_TYPES, ATLAS_STATUSES, type AnswerType, type AtlasStatus } from '@/shared/types/atlas';

interface AtlasControlsProps {
  status: AtlasStatus;
  types: readonly AnswerType[];
  onStatusChange: (status: AtlasStatus) => void;
  onTypesChange: (types: AnswerType[]) => void;
  onReset: () => void;
}

const STATUS_LABELS: Record<AtlasStatus, string> = {
  all: '전체 상태',
  complete: '추진완료',
  active: '추진중',
  unresolved: '미완료·단절',
};

export function AtlasControls({ status, types, onStatusChange, onTypesChange, onReset }: AtlasControlsProps) {
  const toggleType = (answerType: AnswerType) => {
    const next = types.includes(answerType)
      ? types.filter((value) => value !== answerType)
      : ANSWER_TYPES.filter((value) => value === answerType || types.includes(value));
    onTypesChange(next.length > 0 ? next : [...ANSWER_TYPES]);
  };

  return (
    <section id="atlas-controls" aria-label="Atlas 필터" className="border-y border-[var(--line-medium)] py-4" tabIndex={-1}>
      <p className="redline-meta mb-4 text-[var(--ink-secondary)]">CONTROL RAIL / URL SYNCHRONIZED</p>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <label className="flex min-w-48 flex-col gap-2 font-mono text-xs text-[var(--color-neutral-700)]">
          처리 상태
          <select
            className="min-h-11 border border-[var(--line-strong)] bg-[var(--paper-surface)] px-3 text-sm text-[var(--color-ink)] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--signal-red-dark)]"
            value={status}
            onChange={(event) => onStatusChange(event.target.value as AtlasStatus)}
          >
            {ATLAS_STATUSES.map((value) => <option key={value} value={value}>{STATUS_LABELS[value]}</option>)}
          </select>
        </label>

        <fieldset className="min-w-0 flex-1">
          <legend className="mb-2 font-mono text-xs text-[var(--color-neutral-700)]">답변 유형</legend>
          <details className="border border-[var(--line-strong)] bg-[var(--color-paper)] sm:hidden">
            <summary className="flex min-h-11 cursor-pointer items-center px-3 font-mono text-xs font-bold">선택된 답변 유형 {types.length}개</summary>
            <div className="grid grid-cols-2 gap-2 border-t border-[var(--color-neutral-200)] p-3">
              {ANSWER_TYPES.map((answerType) => (
                <label key={answerType} className={`inline-flex min-h-11 cursor-pointer items-center justify-center border px-3 font-mono text-xs ${types.includes(answerType) ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-on-ink)]' : 'border-[var(--line-strong)] bg-[var(--color-paper)]'}`}>
                  <input className="sr-only" type="checkbox" checked={types.includes(answerType)} onChange={() => toggleType(answerType)} />
                  {answerType}
                </label>
              ))}
            </div>
          </details>
          <div className="hidden flex-wrap gap-2 sm:flex">
            {ANSWER_TYPES.map((answerType) => (
              <label
                key={answerType}
                  className={`relative inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center border px-3 font-mono text-xs focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--signal-red-dark)] ${types.includes(answerType) ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-on-ink)] after:absolute after:bottom-[-1px] after:left-0 after:h-0.5 after:w-full after:bg-[var(--signal-red)]' : 'border-[var(--line-strong)] bg-[var(--color-paper)]'}`}
              >
                <input className="sr-only" type="checkbox" checked={types.includes(answerType)} onChange={() => toggleType(answerType)} />
                {answerType}
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="button"
          className="atlas-action-secondary"
          onClick={onReset}
        >
          필터 초기화
        </button>
      </div>
    </section>
  );
}
