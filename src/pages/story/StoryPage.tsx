import React, { useEffect } from 'react';
import { ChapterPrologue } from '../../widgets/prologue-scene/ChapterPrologue';
import { ChapterScale } from '../../widgets/scale-scene/ChapterScale';
import { ChapterRecord } from '../../widgets/evidence-chain-scene/ChapterRecord';
import { ChapterGap } from '../../widgets/gap-scene/ChapterGap';
import { ChapterAnswersAtlas } from '../../widgets/atlas-scene/ChapterAnswersAtlas';
import { ChapterCases } from '../../widgets/case-sequence/ChapterCases';
import { ChapterRemains } from '../../widgets/remains-scene/ChapterRemains';
import { ProgressTracker } from '../../widgets/app-shell/ProgressTracker';
import { useOverlay } from '../../app/providers/OverlayProvider';

interface StoryPageProps {
  onViewChange: (view: 'story' | 'method' | 'data' | 'about') => void;
}

export const StoryPage: React.FC<StoryPageProps> = ({ onViewChange }) => {
  const { setCurrentChapterId } = useOverlay();

  // IntersectionObserver to sync current chapter id as user scrolls
  useEffect(() => {
    const chapters = document.querySelectorAll('section[data-chapter-id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-chapter-id');
            if (id) {
              setCurrentChapterId(id);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    chapters.forEach((ch) => observer.observe(ch));
    return () => observer.disconnect();
  }, [setCurrentChapterId]);

  return (
    <main className="relative">
      <ProgressTracker />
      <ChapterPrologue />
      <ChapterScale />
      <ChapterRecord />
      <ChapterGap />
      <ChapterAnswersAtlas />
      <ChapterCases />
      <ChapterRemains onViewChange={onViewChange} />
    </main>
  );
};
