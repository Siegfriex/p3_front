import React, { useState } from 'react';
import { HeaderNav } from '../../widgets/app-shell/HeaderNav';
import { FooterRail } from '../../widgets/app-shell/FooterRail';
import { StoryPage } from '../../pages/story/StoryPage';
import { MethodPage } from '../../pages/method/MethodPage';
import { DataPage } from '../../pages/data/DataPage';
import { AboutPage } from '../../pages/about/AboutPage';
import { GlobalOverlayRoot } from '../../widgets/overlay-root/GlobalOverlayRoot';

export const AppRouter: React.FC = () => {
  const [currentView, setCurrentView] = useState<'story' | 'method' | 'data' | 'about'>('story');

  return (
    <div className="min-h-screen pb-14 bg-[var(--color-paper)] text-[var(--color-ink)] selection:bg-[var(--color-behavior-red-bg)] selection:text-[var(--color-behavior-red-deep)]">
      <HeaderNav currentView={currentView} onViewChange={setCurrentView} />

      {currentView === 'story' && <StoryPage onViewChange={setCurrentView} />}
      {currentView === 'method' && <MethodPage />}
      {currentView === 'data' && <DataPage />}
      {currentView === 'about' && <AboutPage />}

      <GlobalOverlayRoot />
      <FooterRail />
    </div>
  );
};
