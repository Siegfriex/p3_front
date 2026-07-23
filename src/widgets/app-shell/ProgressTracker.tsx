import { CHAPTER_IDS } from '@/shared/config/chapterNavigation';
import { STORY_CHAPTERS } from '@/shared/mock/storyData';

const visibleStoryChapters = STORY_CHAPTERS.filter((chapter) =>
  CHAPTER_IDS.some((chapterId) => chapterId === chapter.id)
);

interface ProgressTrackerProps {
  currentChapterId: string;
  onChapterNavigate: (chapterId: string) => void;
}

export function ProgressTracker({ currentChapterId, onChapterNavigate }: ProgressTrackerProps) {
  return (
    <aside
      className="fixed right-4 top-1/2 z-[var(--z-navigation)] hidden -translate-y-1/2 border border-[var(--color-neutral-200)] bg-[var(--color-paper)]/90 p-2 shadow-sm backdrop-blur-md transition-all 2xl:block"
      aria-label="에세이 챕터 내비게이션"
    >
      <div className="mb-2 border-b border-[var(--color-neutral-200)] px-1 pb-1 text-center font-mono text-[9px] uppercase tracking-wider text-[var(--color-neutral-500)]">
        CH.
      </div>
      <div className="flex flex-col gap-1">
        {visibleStoryChapters.map((chapter) => {
          const isActive = currentChapterId === chapter.id;
          return (
            <button
              type="button"
              key={chapter.id}
              onClick={() => onChapterNavigate(chapter.id)}
              aria-current={isActive ? 'location' : undefined}
              aria-label={`${chapter.order}장 ${chapter.title}로 이동`}
              className={`group flex min-h-11 min-w-14 items-center justify-center gap-2 px-2 py-1.5 text-left font-mono text-xs transition-all ${
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
              <span className="text-[11px] text-[var(--color-neutral-700)]">0{chapter.order}</span>
              <span className="sr-only">{chapter.title}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
