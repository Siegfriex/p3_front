import React from 'react';
import { useOverlay } from '../../app/providers/OverlayProvider';
import { STORY_CHAPTERS } from '../../shared/mock/storyData';

export const FooterRail: React.FC = () => {
  const { currentChapterId } = useOverlay();

  const activeChapterIndex = STORY_CHAPTERS.findIndex(
    (ch) => ch.id === currentChapterId
  );
  const totalChapters = STORY_CHAPTERS.length;
  const progressPercent = activeChapterIndex >= 0
    ? Math.min(100, Math.max(0, ((activeChapterIndex + 1) / totalChapters) * 100))
    : 0;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-[var(--z-sticky)] h-11 bg-[var(--color-ink)] text-[var(--color-paper)] flex items-center justify-between px-4 sm:px-8 border-t border-[var(--color-neutral-900)] text-[10px] font-mono tracking-widest uppercase shadow-xl select-none">
      {/* Sticky horizontal progress bar tracking current scroll position across total chapters */}
      <div className="sticky-bottom-progress">
        <div
          className="sticky-bottom-progress-bar"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex items-center gap-4 sm:gap-8 truncate">
        <span className="opacity-60 hidden sm:inline">PROJECT: P3_CULTURE</span>
        
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-behavior-red-deep)] animate-pulse" />
          <span className="opacity-90">원론적/유보적 답변 (42%)</span>
        </div>

        <div className="flex items-center gap-2 hidden md:flex">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-behavior-blue-deep)]" />
          <span className="opacity-70">공식 완결 (18%)</span>
        </div>

        <div className="flex items-center gap-2 hidden lg:flex">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-behavior-amber-deep)]" />
          <span className="opacity-70">진행/이관 (40%)</span>
        </div>
      </div>

      <div className="flex items-center gap-4 font-mono text-[10px] shrink-0">
        <span className="text-[var(--color-behavior-red-soft)] font-bold">
          CHAPTER: {currentChapterId.toUpperCase()}
        </span>
        <span className="opacity-40 hidden sm:inline">|</span>
        <span className="opacity-50 hidden sm:inline">V1.0 EDITORIAL SCROLLYTELLING</span>
      </div>
    </footer>
  );
};

