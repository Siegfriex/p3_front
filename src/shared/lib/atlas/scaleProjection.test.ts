import { describe, expect, it } from 'vitest';

import { createProjectionScale } from './scaleProjection';

describe('immutable projection scale', () => {
  it('uses one uniform scale, centers letterbox space, and inverts the y axis', () => {
    const scale = createProjectionScale(
      { xMin: 0, xMax: 10, yMin: -5, yMax: 5 },
      { x: 20, y: 30, width: 200, height: 100 },
      0,
    );
    expect(scale.scaleFactor).toBe(10);
    expect(scale.contentRect).toEqual({ x: 70, y: 30, width: 100, height: 100 });
    expect(scale.project({ x: 0, y: -5 })).toEqual({ x: 70, y: 130 });
    expect(scale.project({ x: 10, y: 5 })).toEqual({ x: 170, y: 30 });
    expect(Object.isFrozen(scale.bounds)).toBe(true);
    expect(Object.isFrozen(scale.plot)).toBe(true);
    expect(Object.isFrozen(scale.contentRect)).toBe(true);
  });

  it('does not mutate its immutable domain when callers filter nodes', () => {
    const bounds = { xMin: -2, xMax: 2, yMin: -1, yMax: 1 };
    const scale = createProjectionScale(bounds, { x: 0, y: 0, width: 400, height: 240 }, 20);
    const before = scale.project({ x: 1, y: 0.5 });
    const visibleSubset = [{ x: 1, y: 0.5 }];
    expect(visibleSubset).toHaveLength(1);
    expect(scale.project({ x: 1, y: 0.5 })).toEqual(before);
    expect(scale.bounds).toEqual(bounds);
  });
});
