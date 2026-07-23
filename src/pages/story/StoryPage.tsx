import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router';

import type { AppOutletContext } from '@/shared/types/routing';
import { ChapterHashController } from '@/shared/ui/navigation/ChapterHashController';
import { ChapterAnswersAtlas } from '@/widgets/atlas-scene/ChapterAnswersAtlas';
import { ProgressTracker } from '@/widgets/app-shell/ProgressTracker';
import { ChapterCases } from '@/widgets/case-sequence/ChapterCases';
import { ChapterRecord } from '@/widgets/evidence-chain-scene/ChapterRecord';
import { ChapterGap } from '@/widgets/gap-scene/ChapterGap';
import { ChapterPrologue } from '@/widgets/prologue-scene/ChapterPrologue';
import { ChapterRemains } from '@/widgets/remains-scene/ChapterRemains';
import { ChapterScale } from '@/widgets/scale-scene/ChapterScale';

export function StoryPage() {
  const navigate = useNavigate();
  const { activeChapterId, setActiveChapterId } = useOutletContext<AppOutletContext>();

  useEffect(() => {
    const chapters = document.querySelectorAll('section[data-chapter-id]');
    const observer = new IntersectionObserver(
      () => {
        const headerHeight = document.querySelector('body > #root header')?.getBoundingClientRect().height ?? 56;
        const visibleChapters = Array.from(chapters)
          .map((chapter) => ({ chapter, rect: chapter.getBoundingClientRect() }))
          .filter(({ rect }) => rect.bottom > headerHeight && rect.top < window.innerHeight)
          .sort((left, right) =>
            Math.abs(left.rect.top - headerHeight) - Math.abs(right.rect.top - headerHeight)
          );
        const id = visibleChapters[0]?.chapter.getAttribute('data-chapter-id');
        if (id) setActiveChapterId(id);
      },
      { threshold: 0.3 }
    );

    chapters.forEach((chapter) => observer.observe(chapter));
    return () => observer.disconnect();
  }, [setActiveChapterId]);

  const handleChapterNavigate = (chapterId: string) => {
    navigate({ pathname: '/', hash: `#${chapterId}` });
  };

  return (
    <main id="main-content" className="relative" tabIndex={-1}>
      <ChapterHashController />
      <ProgressTracker
        currentChapterId={activeChapterId}
        onChapterNavigate={handleChapterNavigate}
      />
      <ChapterPrologue />
      <ChapterScale />
      <ChapterRecord />
      <ChapterGap />
      <ChapterAnswersAtlas />
      <ChapterCases />
      <ChapterRemains />
    </main>
  );
}
