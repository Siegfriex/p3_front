import { describe, expect, it } from 'vitest';

import {
  ANSWER_TYPE_MARKS,
  ATLAS_MINIMUM_HIT_TARGET_PX,
  NODE_GLYPH_TOKENS,
  STATUS_STROKE_DASH,
  getNodeDisplayOpacity,
  getNodeHitRadius,
  getPresentedNodeRadius,
  getRequiredProjectionPadding,
  resolveNodeInteractionState,
} from './atlasEncoding';

describe('Atlas node semantic encoding', () => {
  it('locks behavior shapes, A1-A8 marks, and status strokes as shared semantic tokens', () => {
    expect(NODE_GLYPH_TOKENS.information_non_direct.shape).toBe('circle');
    expect(NODE_GLYPH_TOKENS.deferral_procedural.shape).toBe('diamond');
    expect(NODE_GLYPH_TOKENS.action_evidence.shape).toBe('square');
    expect(Object.keys(ANSWER_TYPE_MARKS)).toEqual(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8']);
    expect(STATUS_STROKE_DASH).toEqual({ complete: undefined, active: '12 6', unresolved: '2 5' });
  });

  it('preserves source radius and expands only the interaction target', () => {
    expect(getPresentedNodeRadius(7.25)).toBe(7.25);
    expect(getNodeHitRadius(7.25) * 2).toBe(ATLAS_MINIMUM_HIT_TARGET_PX);
    expect(getNodeHitRadius(30)).toBe(30);
    expect(getRequiredProjectionPadding(22)).toBe(43);
    expect(() => getPresentedNodeRadius(0)).toThrow(/positive finite/);
  });

  it('composes semantic opacity and interaction state without multiplying them away', () => {
    expect(getNodeDisplayOpacity({ baseOpacity: 0.5, interactionState: 'dimmed', isFiltered: false, isSelected: false, isFocused: false })).toBe(0.4);
    expect(getNodeDisplayOpacity({ baseOpacity: 0.5, interactionState: 'filtered', isFiltered: true, isSelected: false, isFocused: false })).toBe(0.14);
    expect(getNodeDisplayOpacity({ baseOpacity: 0.5, interactionState: 'selected', isFiltered: false, isSelected: true, isFocused: false })).toBe(0.88);
    expect(resolveNodeInteractionState({ isHovered: false, isFocused: true, isSelected: true, isDimmed: false, isFiltered: false })).toBe('focused-selected');
  });
});
