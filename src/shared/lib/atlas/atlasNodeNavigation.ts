import type { AtlasNodeViewModel } from '@/shared/types/atlas';

export type AtlasNavigationKey = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown' | 'Home' | 'End';

function isDirectionalCandidate(
  key: Exclude<AtlasNavigationKey, 'Home' | 'End'>,
  deltaX: number,
  deltaY: number,
): boolean {
  if (key === 'ArrowLeft') return deltaX < 0 && Math.abs(deltaX) >= Math.abs(deltaY);
  if (key === 'ArrowRight') return deltaX > 0 && Math.abs(deltaX) >= Math.abs(deltaY);
  if (key === 'ArrowUp') return deltaY < 0 && Math.abs(deltaY) >= Math.abs(deltaX);
  return deltaY > 0 && Math.abs(deltaY) >= Math.abs(deltaX);
}

export function findNextAtlasNodeId(
  nodes: readonly AtlasNodeViewModel[],
  currentNodeId: string,
  key: AtlasNavigationKey,
): string {
  if (nodes.length === 0) return currentNodeId;
  if (key === 'Home') return nodes[0].id;
  if (key === 'End') return nodes[nodes.length - 1].id;

  const current = nodes.find((node) => node.id === currentNodeId);
  if (!current) return nodes[0].id;

  const candidates = nodes
    .filter((node) => node.id !== current.id)
    .map((node) => {
      const deltaX = node.screen.x - current.screen.x;
      const deltaY = node.screen.y - current.screen.y;
      return { node, deltaX, deltaY, distance: Math.hypot(deltaX, deltaY) };
    })
    .filter(({ deltaX, deltaY }) => isDirectionalCandidate(key, deltaX, deltaY))
    .sort((left, right) => left.distance - right.distance || left.node.id.localeCompare(right.node.id));

  return candidates[0]?.node.id ?? current.id;
}
