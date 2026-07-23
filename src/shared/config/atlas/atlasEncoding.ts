import type {
  AtlasEncodingViewModel,
  AtlasNodeStatus,
  AtlasPlotRect,
  BehaviorFamily,
} from '@/shared/types/atlas';

export const ATLAS_VIEWBOX = Object.freeze({ width: 720, height: 520 });
export const ATLAS_PLOT_RECT: AtlasPlotRect = Object.freeze({ x: 76, y: 48, width: 600, height: 408 });
export const ATLAS_EFFECTIVE_HIT_RADIUS = 22;

const FAMILY_ENCODING: Record<BehaviorFamily, Pick<AtlasEncodingViewModel, 'shapeToken' | 'fillToken'>> = {
  information_non_direct: {
    shapeToken: 'circle',
    fillToken: 'var(--ink-primary)',
  },
  deferral_procedural: {
    shapeToken: 'diamond',
    fillToken: 'var(--archive-ochre)',
  },
  action_evidence: {
    shapeToken: 'square',
    fillToken: 'var(--line-strong)',
  },
};

const STATUS_STROKE: Record<AtlasNodeStatus, string> = {
  complete: 'var(--status-complete)',
  active: 'var(--status-active)',
  unresolved: 'var(--status-unresolved)',
};

export function createAtlasEncoding(
  family: BehaviorFamily,
  status: AtlasNodeStatus,
  confidence: number | null,
): AtlasEncodingViewModel {
  const opacity = confidence === null ? 0.72 : Math.min(1, Math.max(0.45, confidence));
  return {
    ...FAMILY_ENCODING[family],
    strokeToken: STATUS_STROKE[status],
    opacity,
  };
}
