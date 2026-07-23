import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

import { AppProviders } from '@/app/providers/AppProviders';
import type { AtlasNodeViewModel, AtlasViewModelBundle } from '@/shared/types/atlas';
import { ChapterAnswersAtlas } from './ChapterAnswersAtlas';

const mocks = vi.hoisted(() => ({ releaseState: null as unknown }));

const nodes: AtlasNodeViewModel[] = Array.from({ length: 16 }, (_, index) => ({
  id: `story-node-${String(index + 1).padStart(2, '0')}`,
  projectionId: 'projection-story-001',
  topicBinId: `topic-${index + 1}`,
  topicLabel: `주제 ${index + 1}`,
  status: (['complete', 'active', 'unresolved'] as const)[index % 3],
  answerType: (['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'] as const)[index % 8],
  behaviorFamily: (['information_non_direct', 'deferral_procedural', 'action_evidence'] as const)[index % 3],
  anchor: { x: index / 20, y: index / 20 },
  display: { x: index / 20, y: index / 20 },
  screen: { x: 100 + (index % 4) * 150, y: 100 + Math.floor(index / 4) * 120 },
  radiusPx: 10 + index / 10,
  normalizedMass: (index + 1) / 16,
  answerCount: index + 1,
  linkCount: 1,
  confidence: 0.8,
  representativeEvidenceId: index === 0 ? 'EVID_APPROVED_001' : null,
  isPublicEvidenceAvailable: index === 0,
  encoding: {
    shapeToken: (['circle', 'diamond', 'square'] as const)[index % 3],
    fillToken: 'var(--ink-primary)',
    strokeToken: 'var(--line-strong)',
    opacity: 0.8,
  },
}));

const bundle: AtlasViewModelBundle = {
  releaseId: 'ATLAS_DG761_STORY_TEST',
  projectionId: 'projection-story-001',
  projectionHash: 'a'.repeat(64),
  bounds: { xMin: 0, xMax: 1, yMin: 0, yMax: 1 },
  nodes,
  topicBins: [],
  centroids: [],
  evidence: [],
  storySummary: {
    analysisEntityCount: 16,
    atlasNodeCount: 16,
    behaviorChildCount: 16,
    primaryBehaviorDistribution: { A1: 2, A2: 2, A3: 2, A4: 2, A5: 2, A6: 2, A7: 2, A8: 2 },
    projectionPointCount: 16,
    publicEvidenceCount: 0,
    statusDistribution: { complete: 6, active: 5, unresolved: 5 },
    topicBinCount: 0,
    warnings: [],
  },
  storyPreviewNodeIds: nodes.map((node) => node.id),
  evidenceRepository: {
    getSummary: () => null,
    getDetail: async () => { throw new Error('not used'); },
  },
};

vi.mock('@/shared/api/atlas/useAtlasRelease', () => ({
  useAtlasRelease: () => mocks.releaseState,
}));

describe('ChapterAnswersAtlas approved Story Preview', () => {
  it('renders the approved 16-node subset, DOM mirror, and filter-carrying CTA', async () => {
    mocks.releaseState = { status: 'ready', source: 'pointer', bundle, retry: vi.fn() };
    const user = userEvent.setup();
    const { container } = render(
      <MemoryRouter initialEntries={['/#answers']}>
        <AppProviders><ChapterAnswersAtlas /></AppProviders>
      </MemoryRouter>,
    );
    expect(screen.getByTestId('story-atlas-ready')).toHaveAttribute('data-release-id', bundle.releaseId);
    expect(container.querySelectorAll('[data-testid="atlas-chart"] [data-node-id]')).toHaveLength(16);
    expect(container.querySelectorAll('.atlas-node-navigator')).toHaveLength(16);
    expect(screen.queryByTestId('story-atlas-data-unavailable')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: '현재 필터로 전체 답변행태 지도 보기' })).toHaveAttribute('href', '/atlas');

    await user.selectOptions(screen.getByLabelText('처리 상태'), 'active');
    expect(screen.getByRole('link', { name: '현재 필터로 전체 답변행태 지도 보기' })).toHaveAttribute('href', '/atlas?status=active&view=nodes');
  });
});
