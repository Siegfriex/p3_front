import type { AnswerType, AtlasNodeStatus, AtlasShapeToken } from '@/shared/types/atlas';

export type AtlasGlyphState = 'default' | 'hovered' | 'focused' | 'selected' | 'dimmed';

interface AtlasNodeGlyphProps {
  shape: AtlasShapeToken;
  answerType: AnswerType;
  status: AtlasNodeStatus;
  fill: string;
  opacity?: number;
  radius?: number;
  state?: AtlasGlyphState;
}

const statusDash: Record<AtlasNodeStatus, string | undefined> = {
  complete: undefined,
  active: '12 6',
  unresolved: '2 5',
};

function InnerMark({ answerType, radius }: Pick<AtlasNodeGlyphProps, 'answerType'> & { radius: number }) {
  const extent = Math.max(4, radius * 0.42);
  const common = { stroke: 'var(--paper-surface)', strokeWidth: 2, vectorEffect: 'non-scaling-stroke' as const };
  if (answerType === 'A2') return <line x1={-extent} x2={extent} y1={0} y2={0} {...common} />;
  if (answerType === 'A3') return <line x1={0} x2={0} y1={-extent} y2={extent} {...common} />;
  if (answerType === 'A4') return <circle r={Math.max(2, radius * 0.14)} fill="var(--paper-surface)" />;
  if (answerType === 'A6') return <line x1={-extent} x2={extent} y1={extent} y2={-extent} {...common} />;
  if (answerType === 'A7') return <><line x1={-extent} x2={extent} y1={0} y2={0} {...common} /><line x1={0} x2={0} y1={-extent} y2={extent} {...common} /></>;
  if (answerType === 'A8') return <><circle cx={-extent * 0.48} r={Math.max(1.8, radius * 0.11)} fill="var(--paper-surface)" /><circle cx={extent * 0.48} r={Math.max(1.8, radius * 0.11)} fill="var(--paper-surface)" /></>;
  return null;
}

export function AtlasNodeGlyph({
  shape,
  answerType,
  status,
  fill,
  opacity = 1,
  radius = 18,
  state = 'default',
}: AtlasNodeGlyphProps) {
  const visibleOpacity = state === 'dimmed' ? Math.max(0.2, opacity * 0.28) : opacity;
  const scale = state === 'hovered' ? 1.06 : 1;
  const stroke = state === 'selected' ? 'var(--signal-red-dark)' : 'var(--ink-primary)';
  const strokeWidth = state === 'selected' ? 3 : 2;
  const markProps = {
    fill,
    opacity: visibleOpacity,
    stroke,
    strokeWidth,
    strokeDasharray: statusDash[status],
    vectorEffect: 'non-scaling-stroke' as const,
  };

  return (
    <g className="atlas-node-glyph" style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
      {state === 'focused' ? <circle r={radius + 8} fill="var(--paper-surface)" stroke="var(--signal-red-dark)" strokeWidth="2" vectorEffect="non-scaling-stroke" /> : null}
      {state === 'selected' ? <circle r={radius + 7} fill="none" stroke="var(--signal-red)" strokeWidth="3" vectorEffect="non-scaling-stroke" /> : null}
      {shape === 'diamond' ? <path d={`M 0 ${-radius} L ${radius} 0 L 0 ${radius} L ${-radius} 0 Z`} {...markProps} /> : null}
      {shape === 'square' ? <rect x={-radius} y={-radius} width={radius * 2} height={radius * 2} {...markProps} /> : null}
      {shape === 'circle' ? <circle r={radius} {...markProps} /> : null}
      <InnerMark answerType={answerType} radius={radius} />
    </g>
  );
}
