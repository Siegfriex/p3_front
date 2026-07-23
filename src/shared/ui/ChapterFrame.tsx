import React from 'react';

interface ChapterFrameProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  orderNumber?: string;
}

export const ChapterFrame: React.FC<ChapterFrameProps> = ({ id, children, className = '', orderNumber }) => {
  return (
    <section id={id} className={`chapter-frame relative ${className}`} data-chapter-id={id}>
      {orderNumber && (
        <div className="flex items-baseline justify-between mb-8 pb-3 border-b border-[var(--color-neutral-200)]">
          <div className="flex items-center gap-3">
            <span className="type-mono text-[11px] uppercase tracking-widest px-2 py-0.5 border border-[var(--color-neutral-700)] text-[var(--color-ink)] bg-[var(--color-surface)]">
              {orderNumber}
            </span>
            <span className="font-mono text-[11px] text-[var(--color-neutral-500)] tracking-widest uppercase hidden sm:inline">
              PUBLIC RECORD ARCHIVE
            </span>
          </div>
          <div aria-hidden="true" className="font-serif italic font-black text-3xl sm:text-4xl text-[var(--color-neutral-400)] select-none">
            {orderNumber.replace(/CHAPTER\s*/i, '')}
          </div>
        </div>
      )}
      {children}
    </section>
  );
};
