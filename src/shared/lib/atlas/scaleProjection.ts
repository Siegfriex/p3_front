import type { AtlasPlotRect, Point2D, ProjectionBounds } from '@/shared/types/atlas';

export interface ProjectionScale {
  readonly bounds: ProjectionBounds;
  readonly plot: AtlasPlotRect;
  project(point: Point2D): Point2D;
}

function assertFinite(value: number, label: string): void {
  if (!Number.isFinite(value)) throw new Error(`${label} must be finite`);
}

export function createProjectionScale(
  bounds: ProjectionBounds,
  plot: AtlasPlotRect,
): ProjectionScale {
  Object.entries(bounds).forEach(([key, value]) => assertFinite(value, `bounds.${key}`));
  Object.entries(plot).forEach(([key, value]) => assertFinite(value, `plot.${key}`));

  if (bounds.xMax <= bounds.xMin || bounds.yMax <= bounds.yMin) {
    throw new Error('Projection bounds must have positive width and height');
  }
  if (plot.width <= 0 || plot.height <= 0) {
    throw new Error('Plot rectangle must have positive width and height');
  }

  const xSpan = bounds.xMax - bounds.xMin;
  const ySpan = bounds.yMax - bounds.yMin;
  const project = ({ x, y }: Point2D): Point2D => ({
    x: plot.x + ((x - bounds.xMin) / xSpan) * plot.width,
    y: plot.y + plot.height - ((y - bounds.yMin) / ySpan) * plot.height,
  });

  return Object.freeze({ bounds: Object.freeze({ ...bounds }), plot: Object.freeze({ ...plot }), project });
}
