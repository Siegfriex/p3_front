import { useRef, useState, type KeyboardEvent } from 'react';
import { MOCK_EVIDENCES, EDITORIAL_CASES } from '@/shared/mock/storyData';
import type { DetailKind } from '@/shared/types/routing';
import { Badge } from '@/shared/ui/Badge';
import { LineSymbol } from '@/shared/ui/LineSymbol';
import { Drawer } from '@/shared/ui/overlay/Drawer';
import { X, AlertTriangle, Copy, Check } from 'lucide-react';

interface EvidenceDrawerProps {
  kind: DetailKind;
  itemId: string;
  onClose: () => void;
}

const EVIDENCE_TABS = [
  { id: 'evidence', label: '원문 증거' },
  { id: 'transcript', label: '속기록 질의답변' },
  { id: 'verification', label: '저널리즘 검증' },
  { id: 'source', label: '출처 및 PDF' },
] as const;

type EvidenceTabId = (typeof EVIDENCE_TABS)[number]['id'];

export function EvidenceDrawer({ kind, itemId, onClose }: EvidenceDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [activeTab, setActiveTab] = useState<EvidenceTabId>('evidence');
  const tabRefs = useRef(new Map<EvidenceTabId, HTMLButtonElement>());
  const [copied, setCopied] = useState(false);
  const activeEvidenceId = kind === 'evidence' ? itemId : null;
  const activeCaseId = kind === 'case' ? itemId : null;

  // Resolve active item
  let activeEvidence = MOCK_EVIDENCES.find((ev) => ev.id === activeEvidenceId);
  const activeCase = EDITORIAL_CASES.find((c) => c.id === activeCaseId);

  if (!activeEvidence && activeCase) {
    activeEvidence = MOCK_EVIDENCES.find((ev) => ev.id === activeCase.evidenceId) || MOCK_EVIDENCES[0];
  }

  if (!activeEvidence) {
    activeEvidence = MOCK_EVIDENCES[0];
  }

  const handleCopySource = () => {
    const citation = `[증거 ${activeEvidence?.id.toUpperCase()}] ${activeEvidence?.issue} (${activeEvidence?.sourceLabel}, ${activeEvidence?.sourcePage})`;
    navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, tabId: EvidenceTabId) => {
    const currentIndex = EVIDENCE_TABS.findIndex((tab) => tab.id === tabId);
    let nextIndex: number;
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % EVIDENCE_TABS.length;
    else if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + EVIDENCE_TABS.length) % EVIDENCE_TABS.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = EVIDENCE_TABS.length - 1;
    else return;
    event.preventDefault();
    const nextTab = EVIDENCE_TABS[nextIndex].id;
    setActiveTab(nextTab);
    tabRefs.current.get(nextTab)?.focus();
  };

  return (
    <Drawer
      open
      onClose={onClose}
      titleId="drawer-title"
      descriptionId="drawer-description"
      initialFocusRef={closeButtonRef}
    >
      <div className="h-full bg-[var(--color-paper)] flex flex-col justify-between overflow-hidden">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[var(--color-neutral-200)] bg-[var(--color-surface)]">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="type-mono font-bold text-xs text-[var(--color-behavior-red-deep)] px-2 py-0.5 bg-[var(--color-behavior-red-bg)]">
                {activeEvidence.id.toUpperCase()}
              </span>
              <Badge label={activeEvidence.reportedStatusLabel} variant="status" status={activeEvidence.reportedStatus} />
              <LineSymbol style={activeEvidence.lineStyle} length={40} />
            </div>

            <button
              type="button"
              ref={closeButtonRef}
              onClick={onClose}
              className="inline-flex min-h-11 min-w-11 items-center justify-center text-[var(--color-neutral-500)] hover:text-[var(--color-ink)] hover:bg-[var(--color-neutral-200)] transition-colors"
              aria-label="드로어 닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3 id="drawer-title" className="type-heading-2 font-serif text-[var(--color-ink)] mb-2">
            {activeEvidence.issue}
          </h3>

          <div id="drawer-description" className="type-caption font-mono text-[var(--color-neutral-500)]">
            {activeEvidence.auditYear}년도 국정감사 · 피감기관: {activeEvidence.targetOrg}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="drawer-tabs flex items-center border-b border-[var(--color-neutral-200)] bg-[var(--color-surface)] px-6 font-mono text-xs" role="tablist" aria-label="증거 상세 섹션">
          {EVIDENCE_TABS.map((tab) => (
            <button
              key={tab.id}
              ref={(element) => {
                if (element) tabRefs.current.set(tab.id, element);
                else tabRefs.current.delete(tab.id);
              }}
              id={`drawer-tab-${tab.id}`}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls="drawer-tabpanel"
              tabIndex={activeTab === tab.id ? 0 : -1}
              className={`px-3 py-3 border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-[var(--color-behavior-red-deep)] text-[var(--color-ink)] font-bold'
                  : 'border-transparent text-[var(--color-neutral-500)] hover:text-[var(--color-ink)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Drawer Body */}
        <div
          id="drawer-tabpanel"
          className="flex-1 overflow-y-auto p-6 space-y-6"
          role="tabpanel"
          aria-labelledby={`drawer-tab-${activeTab}`}
          tabIndex={0}
        >
          {activeCase && (
            <div className="p-4 bg-[var(--color-behavior-amber-bg)] border border-[var(--color-behavior-amber-soft)] mb-4">
              <span className="type-mono text-[10px] uppercase font-bold text-[var(--color-behavior-amber-deep)] block mb-1">
                대표 사례 연결 ({activeCase.caseNumber})
              </span>
              <p className="type-body-m font-serif font-bold text-[var(--color-ink)]">
                {activeCase.title}
              </p>
              <p className="type-caption text-[var(--color-neutral-700)] mt-1">
                {activeCase.summary}
              </p>
            </div>
          )}

          {activeTab === 'evidence' && (
            <div className="space-y-6">
              <div className="p-5 bg-[var(--color-surface)] border border-[var(--color-neutral-200)]">
                <span className="type-mono text-xs font-bold text-[var(--color-neutral-500)] block mb-2">
                  국정감사 시정요구 전문
                </span>
                <p className="type-body-l font-serif text-[var(--color-ink)] leading-relaxed">
                  "{activeEvidence.issue}"
                </p>
              </div>

              <div className="p-5 bg-[var(--color-surface)] border border-[var(--color-neutral-200)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="type-mono text-xs font-bold text-[var(--color-neutral-500)]">
                    피감기관 공식 처리 답변
                  </span>
                  <Badge label={activeEvidence.behaviorLabel} variant="behavior" />
                </div>
                <p className="type-body-m text-[var(--color-neutral-900)] leading-relaxed">
                  {activeEvidence.answerExcerpt}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'transcript' && (
            <div className="space-y-6">
              <div className="p-5 bg-[var(--color-surface)] border border-[var(--color-neutral-200)]">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[var(--color-neutral-500)]">
                  <span>질의 의원: {activeEvidence.questioner}</span>
                  <span>·</span>
                  <span>위원회: {activeEvidence.committee}</span>
                </div>
                <p className="type-body-m font-serif italic text-[var(--color-neutral-900)] leading-relaxed">
                  {activeEvidence.questionExcerpt}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'verification' && (
            <div className="space-y-6">
              <div className="p-5 bg-[var(--color-behavior-red-bg)] border border-[var(--color-behavior-red-soft)]">
                <div className="flex items-center gap-2 text-[var(--color-behavior-red-deep)] mb-2 font-bold font-mono text-xs">
                  <AlertTriangle className="w-4 h-4" />
                  <span>실질 검증 한줄 결론</span>
                </div>
                <p className="type-body-l font-serif font-bold text-[var(--color-behavior-red-deep)] mb-3">
                  {activeEvidence.verificationLabel}
                </p>
                <p className="type-body-m text-[var(--color-neutral-700)] leading-relaxed">
                  {activeEvidence.verificationDetail}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'source' && (
            <div className="space-y-6">
              <div className="p-5 bg-[var(--color-surface)] border border-[var(--color-neutral-200)] space-y-3">
                <div className="flex justify-between items-center">
                  <span className="type-mono text-xs text-[var(--color-neutral-500)]">출처 문헌:</span>
                  <Badge label="MOCK CITATION" variant="mock" />
                </div>
                <p className="type-body-m font-mono font-bold text-[var(--color-ink)]">
                  {activeEvidence.sourceLabel}
                </p>
                <p className="type-caption font-mono text-[var(--color-neutral-500)]">
                  수록 페이지: {activeEvidence.sourcePage}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopySource}
                className="flex min-h-11 w-full items-center justify-center gap-2 bg-[var(--color-ink)] px-4 py-2.5 font-mono text-xs text-[var(--color-paper)] transition-colors hover:bg-[var(--color-neutral-700)]"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '출처 인용문 복사됨' : '출처 인용문 복사하기'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[var(--color-neutral-200)] bg-[var(--color-surface)] flex items-center justify-between text-xs font-mono">
          <span className="text-[var(--color-neutral-500)]">
            Single Overlay Infrastructure
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 px-4 py-1.5 border border-[var(--color-neutral-200)] bg-[var(--color-paper)] hover:bg-[var(--color-neutral-100)] transition-colors"
          >
            닫기 (ESC)
          </button>
        </div>
      </div>
    </Drawer>
  );
}
