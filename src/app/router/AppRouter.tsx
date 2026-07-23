import { lazy, Suspense } from 'react';
import { useLocation, Routes, Route } from 'react-router';
import { AboutPage } from '@/pages/about/AboutPage';
import { DataPage } from '@/pages/data/DataPage';
import { MethodPage } from '@/pages/method/MethodPage';
import { StoryPage } from '@/pages/story/StoryPage';
import type { BackgroundLocationState } from '@/shared/types/routing';
import { AppShell } from './AppShell';
import { DetailPage } from './DetailPage';
import { EvidenceRouteOverlay } from './EvidenceRouteOverlay';
import { FoundationsPage } from './FoundationsPage';
import { NotFoundPage } from './NotFoundPage';
import { RouteErrorBoundary } from './RouteErrorBoundary';

const LazyAtlasPage = lazy(async () => {
  const module = await import('@/pages/atlas/AtlasPage');
  return { default: module.AtlasPage };
});

const atlasRouteLoading = (
  <main id="main-content" className="page-frame py-20" aria-busy="true" data-testid="atlas-lazy-loading" tabIndex={-1}>
    <p className="font-mono text-xs text-[var(--color-neutral-700)]">ATLAS ROUTE LOADING</p>
    <h1 className="mt-3 font-serif text-3xl font-bold">답변행태 지도를 불러오고 있습니다</h1>
  </main>
);

export function AppRouter() {
  const location = useLocation();
  const state = location.state as BackgroundLocationState | null;
  const backgroundLocation = state?.backgroundLocation;

  return (
    <RouteErrorBoundary>
      <Routes location={backgroundLocation ?? location}>
        <Route element={<AppShell />}>
          <Route index element={<StoryPage />} />
          <Route path="method" element={<MethodPage />} />
          <Route path="data" element={<DataPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route
            path="atlas"
            element={(
              <Suspense fallback={atlasRouteLoading}>
                <LazyAtlasPage />
              </Suspense>
            )}
          />
          <Route path="evidence/:evidenceId" element={<DetailPage kind="evidence" />} />
          <Route path="case/:caseId" element={<DetailPage kind="case" />} />
          <Route path="dev/foundations" element={import.meta.env.DEV ? <FoundationsPage /> : <NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/evidence/:evidenceId" element={<EvidenceRouteOverlay kind="evidence" />} />
          <Route path="/case/:caseId" element={<EvidenceRouteOverlay kind="case" />} />
        </Routes>
      )}
    </RouteErrorBoundary>
  );
}
