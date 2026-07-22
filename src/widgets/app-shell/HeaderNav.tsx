import React from 'react';
import { useOverlay } from '../../app/providers/OverlayProvider';
import { STORY_CHAPTERS } from '../../shared/mock/storyData';
import { Eye, ShieldAlert, FileText, Database, Info, Sparkles } from 'lucide-react';

interface HeaderNavProps {
  currentView: 'story' | 'method' | 'data' | 'about';
  onViewChange: (view: 'story' | 'method' | 'data' | 'about') => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ currentView, onViewChange }) => {
  const {
    isPresentationMode,
    isReducedMotion,
    togglePresentationMode,
    toggleReducedMotion,
    currentChapterId,
  } = useOverlay();

  return (
    <header className="sticky top-0 z-[var(--z-navigation)] w-full bg-[var(--color-paper)]/90 backdrop-blur-md border-b border-[var(--color-neutral-200)] transition-all">
      <div className="page-frame h-14 flex items-center justify-between gap-4">
        {/* Left: Brand / Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onViewChange('story')}
            className="flex items-baseline gap-3 group text-left"
            aria-label="메인 스토리로 이동"
          >
            <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-neutral-500)] hidden sm:inline">
              PROJECT: P3_CULTURE
            </span>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-[var(--color-behavior-red-deep)] group-hover:scale-125 transition-transform" />
              <span className="font-serif italic text-lg sm:text-xl font-bold tracking-tight text-[var(--color-ink)]">
                문체위 국정감사 6년
              </span>
            </div>
          </button>
          <span className="hidden lg:inline-block text-[11px] font-mono px-2 py-0.5 bg-[var(--color-surface)] text-[var(--color-neutral-700)] border border-[var(--color-neutral-200)]">
            2018–2023
          </span>
        </div>

        {/* Center: Main Views */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-mono">
          <button
            onClick={() => onViewChange('story')}
            className={`px-3 py-1.5 transition-colors ${
              currentView === 'story'
                ? 'bg-[var(--color-ink)] text-[var(--color-paper)] font-bold'
                : 'text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-100)]'
            }`}
          >
            에세이 (Story)
          </button>
          <button
            onClick={() => onViewChange('method')}
            className={`px-3 py-1.5 flex items-center gap-1 transition-colors ${
              currentView === 'method'
                ? 'bg-[var(--color-ink)] text-[var(--color-paper)] font-bold'
                : 'text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-100)]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            방법론 (Method)
          </button>
          <button
            onClick={() => onViewChange('data')}
            className={`px-3 py-1.5 flex items-center gap-1 transition-colors ${
              currentView === 'data'
                ? 'bg-[var(--color-ink)] text-[var(--color-paper)] font-bold'
                : 'text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-100)]'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            데이터 (Data)
          </button>
          <button
            onClick={() => onViewChange('about')}
            className={`px-3 py-1.5 flex items-center gap-1 transition-colors ${
              currentView === 'about'
                ? 'bg-[var(--color-ink)] text-[var(--color-paper)] font-bold'
                : 'text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-100)]'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            소개 (About)
          </button>
        </nav>

        {/* Right: Controls & Toggles */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={togglePresentationMode}
            className={`px-2.5 py-1 flex items-center gap-1.5 border transition-all ${
              isPresentationMode
                ? 'bg-[var(--color-behavior-red-deep)] text-white border-[var(--color-behavior-red-deep)]'
                : 'border-[var(--color-neutral-200)] text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-100)]'
            }`}
            title="발표 및 전광판 집중 모드 토글"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">{isPresentationMode ? '발표모드 ON' : '발표모드'}</span>
          </button>

          <button
            onClick={toggleReducedMotion}
            className={`px-2.5 py-1 border transition-all ${
              isReducedMotion
                ? 'bg-[var(--color-ink)] text-white border-[var(--color-ink)]'
                : 'border-[var(--color-neutral-200)] text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-100)]'
            }`}
            title="애니메이션 절약 모드"
          >
            <span className="hidden lg:inline">{isReducedMotion ? '모션절약 ON' : '모션절약'}</span>
            <span className="lg:hidden">{isReducedMotion ? 'M-OFF' : 'M-ON'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
