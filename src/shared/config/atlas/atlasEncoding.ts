import type {
  AnswerType,
  AtlasEncodingViewModel,
  AtlasNodeStatus,
  AtlasPlotRect,
  AtlasShapeToken,
  BehaviorFamily,
} from '@/shared/types/atlas';

export const ATLAS_VIEWBOX = Object.freeze({ width: 720, height: 520 });
export const ATLAS_PLOT_RECT: AtlasPlotRect = Object.freeze({ x: 76, y: 48, width: 600, height: 408 });
export const ATLAS_MINIMUM_HIT_TARGET_PX = 44;
export const ATLAS_PROJECTION_PADDING_PX = 48;
export const ATLAS_SELECTION_RING_OFFSET_PX = 7;
export const ATLAS_FOCUS_HALO_OFFSET_PX = 13;

export type NodeInteractionState =
  | 'default'
  | 'hovered'
  | 'focused'
  | 'selected'
  | 'focused-selected'
  | 'dimmed'
  | 'filtered';

export type AnswerTypeMark = 'empty' | 'horizontal-bar' | 'vertical-bar' | 'center-dot' | 'diagonal-slash' | 'plus' | 'double-dot';

export interface NodeGlyphToken {
  family: BehaviorFamily;
  shape: AtlasShapeToken;
}

export interface NodeRadiusPresentationPolicy {
  minVisualRadiusPx: number;
  maxVisualRadiusPx: number;
  sourceRadiusPreserved: boolean;
}

export const NODE_RADIUS_PRESENTATION_POLICY: NodeRadiusPresentationPolicy = Object.freeze({
  minVisualRadiusPx: 0,
  maxVisualRadiusPx: Number.POSITIVE_INFINITY,
  sourceRadiusPreserved: true,
});

export const NODE_GLYPH_TOKENS: Readonly<Record<BehaviorFamily, NodeGlyphToken>> = Object.freeze({
  information_non_direct: Object.freeze({ family: 'information_non_direct', shape: 'circle' }),
  deferral_procedural: Object.freeze({ family: 'deferral_procedural', shape: 'diamond' }),
  action_evidence: Object.freeze({ family: 'action_evidence', shape: 'square' }),
});

export const BEHAVIOR_FAMILY_SHORT_LABEL: Readonly<Record<BehaviorFamily, string>> = Object.freeze({
  information_non_direct: '간접 정보',
  deferral_procedural: '절차 유보',
  action_evidence: '조치 근거',
});

export const ANSWER_TYPE_MARKS: Readonly<Record<AnswerType, AnswerTypeMark>> = Object.freeze({
  A1: 'empty',
  A2: 'horizontal-bar',
  A3: 'vertical-bar',
  A4: 'center-dot',
  A5: 'empty',
  A6: 'diagonal-slash',
  A7: 'plus',
  A8: 'double-dot',
});

export const STATUS_STROKE_DASH: Readonly<Record<AtlasNodeStatus, string | undefined>> = Object.freeze({
  complete: undefined,
  active: '12 6',
  unresolved: '2 5',
});

const FAMILY_ENCODING: Record<BehaviorFamily, Pick<AtlasEncodingViewModel, 'shapeToken' | 'fillToken'>> = {
  information_non_direct: {
    shapeToken: NODE_GLYPH_TOKENS.information_non_direct.shape,
    fillToken: 'var(--ink-primary)',
  },
  deferral_procedural: {
    shapeToken: NODE_GLYPH_TOKENS.deferral_procedural.shape,
    fillToken: 'var(--archive-ochre)',
  },
  action_evidence: {
    shapeToken: NODE_GLYPH_TOKENS.action_evidence.shape,
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

export function getPresentedNodeRadius(sourceRadiusPx: number): number {
  if (!Number.isFinite(sourceRadiusPx) || sourceRadiusPx <= 0) {
    throw new Error('Atlas node radiusPx must be a positive finite number');
  }
  return sourceRadiusPx;
}

export function getNodeHitRadius(sourceRadiusPx: number): number {
  return Math.max(ATLAS_MINIMUM_HIT_TARGET_PX / 2, getPresentedNodeRadius(sourceRadiusPx));
}

export function getRequiredProjectionPadding(maxSourceRadiusPx: number): number {
  return getPresentedNodeRadius(maxSourceRadiusPx) + ATLAS_FOCUS_HALO_OFFSET_PX + 8;
}

interface NodeOpacityInput {
  baseOpacity: number;
  interactionState: NodeInteractionState;
  isFiltered: boolean;
  isSelected: boolean;
  isFocused: boolean;
}

export function getNodeDisplayOpacity({
  baseOpacity,
  interactionState,
  isFiltered,
  isSelected,
  isFocused,
}: NodeOpacityInput): number {
  const semanticOpacity = Math.min(1, Math.max(0.45, baseOpacity));
  if (isSelected || isFocused) return Math.max(0.88, semanticOpacity);
  if (isFiltered || interactionState === 'filtered') return 0.14;
  if (interactionState === 'hovered') return Math.max(0.82, semanticOpacity);
  if (interactionState === 'dimmed') return Math.min(0.4, Math.max(0.24, semanticOpacity));
  return semanticOpacity;
}

interface ResolveNodeInteractionStateInput {
  isHovered: boolean;
  isFocused: boolean;
  isSelected: boolean;
  isDimmed: boolean;
  isFiltered: boolean;
}

export function resolveNodeInteractionState({
  isHovered,
  isFocused,
  isSelected,
  isDimmed,
  isFiltered,
}: ResolveNodeInteractionStateInput): NodeInteractionState {
  if (isFocused && isSelected) return 'focused-selected';
  if (isFocused) return 'focused';
  if (isSelected) return 'selected';
  if (isHovered) return 'hovered';
  if (isFiltered) return 'filtered';
  if (isDimmed) return 'dimmed';
  return 'default';
}
