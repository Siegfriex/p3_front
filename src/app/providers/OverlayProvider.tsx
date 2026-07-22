import React, { createContext, useContext, useState, useEffect } from 'react';
import { ReportedStatus, BehaviorType } from '../../shared/types/story';

interface OverlayContextType {
  activeEvidenceId: string | null;
  activeCaseId: string | null;
  isDrawerOpen: boolean;
  isPresentationMode: boolean;
  isReducedMotion: boolean;
  currentChapterId: string;
  quickFilterStatus: ReportedStatus | 'all';
  quickFilterType: BehaviorType | 'all';
  openEvidence: (id: string) => void;
  openCase: (id: string) => void;
  closeDrawer: () => void;
  togglePresentationMode: () => void;
  toggleReducedMotion: () => void;
  setCurrentChapterId: (id: string) => void;
  setQuickFilterStatus: (status: ReportedStatus | 'all') => void;
  setQuickFilterType: (type: BehaviorType | 'all') => void;
  resetFilters: () => void;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export const OverlayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeEvidenceId, setActiveEvidenceId] = useState<string | null>(null);
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [currentChapterId, setCurrentChapterId] = useState<string>('prologue');
  const [quickFilterStatus, setQuickFilterStatus] = useState<ReportedStatus | 'all'>('all');
  const [quickFilterType, setQuickFilterType] = useState<BehaviorType | 'all'>('all');

  const openEvidence = (id: string) => {
    setActiveCaseId(null);
    setActiveEvidenceId(id);
    setIsDrawerOpen(true);
  };

  const openCase = (id: string) => {
    setActiveEvidenceId(null);
    setActiveCaseId(id);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const togglePresentationMode = () => {
    setIsPresentationMode((prev) => !prev);
  };

  const toggleReducedMotion = () => {
    setIsReducedMotion((prev) => !prev);
  };

  const resetFilters = () => {
    setQuickFilterStatus('all');
    setQuickFilterType('all');
  };

  // Keyboard shortcut handler for ESC (close drawer) and J/K chapter navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen]);

  return (
    <OverlayContext.Provider
      value={{
        activeEvidenceId,
        activeCaseId,
        isDrawerOpen,
        isPresentationMode,
        isReducedMotion,
        currentChapterId,
        quickFilterStatus,
        quickFilterType,
        openEvidence,
        openCase,
        closeDrawer,
        togglePresentationMode,
        toggleReducedMotion,
        setCurrentChapterId,
        setQuickFilterStatus,
        setQuickFilterType,
        resetFilters,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlay = () => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error('useOverlay must be used within an OverlayProvider');
  }
  return context;
};
