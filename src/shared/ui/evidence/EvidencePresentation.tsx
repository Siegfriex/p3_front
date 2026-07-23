import type { ReactNode } from 'react';

export function EvidenceHeader({ recordId, title, context }: { recordId: string; title: string; context: string }) {
  return (
    <header className="border-b-2 border-[var(--ink-primary)] pb-6">
      <p className="redline-meta text-[var(--signal-red-dark)]">EVIDENCE TRACE / {recordId}</p>
      <h2 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-[1.02] tracking-[-0.03em]">{title}</h2>
      <p className="mt-4 font-mono text-xs text-[var(--ink-tertiary)]">{context}</p>
    </header>
  );
}

export function EvidenceStatusPair({ reported, verified }: { reported: string; verified: string }) {
  return (
    <dl className="grid grid-cols-2 border-y border-[var(--line-medium)] text-sm">
      <div className="border-r border-[var(--line-faint)] p-4"><dt className="redline-meta text-[var(--ink-tertiary)]">REPORTED STATUS</dt><dd className="mt-2 font-bold">{reported}</dd></div>
      <div className="p-4"><dt className="redline-meta text-[var(--signal-red-dark)]">VERIFICATION STATUS</dt><dd className="mt-2 font-bold">{verified}</dd></div>
    </dl>
  );
}

interface EvidenceChainItem { step: string; label: string; detail: string }

export function EvidenceChain({ items }: { items: readonly EvidenceChainItem[] }) {
  return (
    <ol className="grid gap-0 border-t border-[var(--line-medium)]">
      {items.map((item) => (
        <li key={item.step} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-b border-[var(--line-faint)] py-4">
          <span className="font-mono text-xs font-bold text-[var(--signal-red-dark)]">{item.step}</span>
          <div><p className="font-bold">{item.label}</p><p className="mt-1 text-sm leading-relaxed text-[var(--ink-secondary)]">{item.detail}</p></div>
        </li>
      ))}
    </ol>
  );
}

export function EvidenceQuote({ label, children }: { label: string; children: ReactNode }) {
  return (
    <figure className="border-l-2 border-[var(--signal-red)] py-2 pl-5">
      <figcaption className="redline-meta text-[var(--ink-tertiary)]">{label}</figcaption>
      <blockquote className="mt-3 font-serif text-xl font-medium leading-relaxed">{children}</blockquote>
    </figure>
  );
}

export function EvidenceVerificationPanel({ conclusion, detail }: { conclusion: string; detail: string }) {
  return (
    <section className="redline-inverse p-5 md:p-6">
      <p className="redline-meta text-[var(--signal-red)]">ADDITIONAL VERIFICATION</p>
      <h3 className="mt-3 font-serif text-2xl font-bold">{conclusion}</h3>
      <p className="mt-4 text-sm leading-relaxed text-[var(--inverse-muted)]">{detail}</p>
    </section>
  );
}

interface EvidenceProvenanceRailProps {
  meetingId: string;
  pages: string;
  pdfAsset: string;
  pipelineRun: string;
  reviewStatus: string;
  publicationStatus: string;
}

export function EvidenceProvenanceRail(props: EvidenceProvenanceRailProps) {
  const items = [
    ['MEETING', props.meetingId],
    ['PAGES', props.pages],
    ['PDF ASSET', props.pdfAsset],
    ['PIPELINE', props.pipelineRun],
    ['REVIEW', props.reviewStatus],
    ['PUBLICATION', props.publicationStatus],
  ];
  return (
    <dl className="grid grid-cols-2 border border-[var(--line-medium)] font-mono text-[11px] md:grid-cols-3">
      {items.map(([label, value]) => (
        <div key={label} className="min-w-0 border-b border-r border-[var(--line-faint)] p-3">
          <dt className="text-[var(--ink-tertiary)]">{label}</dt>
          <dd className="mt-1 [overflow-wrap:anywhere] font-bold">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
