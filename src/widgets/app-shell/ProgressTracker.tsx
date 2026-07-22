import React from 'react';
import { useOverlay } from '../../app/providers/OverlayProvider';
import { STORY_CHAPTERS } from '../../shared/mock/storyData';

export const ProgressTracker: React.FC = () => {
  const { currentChapterId, setCurrentChapterId } = useOverlay();

  const handleChapterClick = (id: string) => {
    setCurrentChapterId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside
      className="hidden xl:block fixed right-6 top-1/2 -translate-y-1/2 z-[var(--z-navigation)] bg-[var(--color-paper)]/80 backdrop-blur-md border border-[var(--color-neutral-200)] p-3 rounded-sm shadow-sm transition-all"
      aria-label="에세이 챕터 내비게이션"
    >
      <div className="text-[10px] font-mono text-[var(--color-neutral-500)] mb-3 px-1 uppercase tracking-wider border-b border-[var(--color-neutral-200)] pb-1">
        Chapters
      </div>
      <div className="flex flex-col gap-1">
        {STORY_CHAPTERS.map((ch) => {
          const isActive = currentChapterId === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => handleChapterClick(ch.id)}
              className={`group flex items-center gap-3 px-2 py-1.5 text-left text-xs font-mono transition-all rounded-none ${
                isActive
                  ? 'text-[var(--color-ink)] font-bold bg-[var(--color-neutral-200)]/60'
                  : 'text-[var(--color-neutral-700)] hover:text-[var(--color-ink)] hover:bg-[var(--color-neutral-100)]'
              }`}
            >
              <span
                className={`w-2 h-2 transition-transform ${
                  isActive
                    ? 'bg-[var(--color-behavior-red-deep)] scale-125'
                    : 'bg-[var(--color-neutral-400)] group-hover:scale-110'
                }`}
              />
              <span className="w-5 text-[11px] text-[var(--color-neutral-500)]">0{ch.order}</span>
              <span className="truncate max-w-[100px]">{ch.title}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
