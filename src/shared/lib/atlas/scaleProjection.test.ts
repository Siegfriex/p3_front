import { describe, expect, it } from 'vitest';

import { createProjectionScale } from './scaleProjection';

describe('immutable projection scale', () => {
  it('maps display coordinates into one shared plot rectangle and inverts the y axis', () => {
    const scale = createProjectionScale(
      { xMin: 0, xMax: 10, yMin: -5, yMax: 5 },
      { x: 20, y: 30, width: 200, height: 100 },
    );
    expect(scale.project({ x: 0, y: -5 })).toEqual({ x: 20, y: 130 });
    expect(scale.project({ x: 10, y: 5 })).toEqual({ x: 220, y: 30 });
    expect(Object.isFrozen(scale.bounds)).toBe(true);
    expect(Object.isFrozen(scale.plot)).toBe(true);
  });
});
