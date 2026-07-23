import {
  ANSWER_TYPE_MARKS,
  ATLAS_FOCUS_HALO_OFFSET_PX,
  ATLAS_SELECTION_RING_OFFSET_PX,
  STATUS_STROKE_DASH,
  type NodeInteractionState,
} from '@/shared/config/atlas/atlasEncoding';
import type { AnswerType, AtlasNodeStatus, AtlasShapeToken } from '@/shared/types/atlas';

export type AtlasGlyphState = NodeInteractionState;

interface AtlasNodeGlyphProps {
  shape: AtlasShapeToken;
  answerType: AnswerType;
  status: AtlasNodeStatus;
  fill: string;
  stroke?: string;
  opacity?: number;
  radius?: number;
  state?: AtlasGlyphState;
}

function InnerMark({ answerType, radius }: Pick<AtlasNodeGlyphProps, 'answerType'> & { radius: number }) {
  const extent = Math.max(4, radius * 0.42);
  const common = { stroke: 'var(--paper-surface)', strokeWidth: 2, vectorEffect: 'non-scaling-stroke' as const };
  const mark = ANSWER_TYPE_MARKS[answerType];
  if (mark === 'horizontal-bar') return <line x1={-extent} x2={extent} y1={0} y2={0} {...common} />;
  if (mark === 'vertical-bar') return <line x1={0} x2={0} y1={-extent} y2={extent} {...common} />;
  if (mark === 'center-dot') return <circle r={Math.max(2, radius * 0.14)} fill="var(--paper-surface)" />;
  if (mark === 'diagonal-slash') return <line x1={-extent} x2={extent} y1={extent} y2={-extent} {...common} />;
  if (mark === 'plus') return <><line x1={-extent} x2={extent} y1={0} y2={0} {...common} /><line x1={0} x2={0} y1={-extent} y2={extent} {...common} /></>;
  if (mark === 'double-dot') return <><circle cx={-extent * 0.48} r={Math.max(1.8, radius * 0.11)} fill="var(--paper-surface)" /><circle cx={extent * 0.48} r={Math.max(1.8, radius * 0.11)} fill="var(--paper-surface)" /></>;
  return <g data-empty-mark="true" />;
}

export function AtlasNodeGlyph({
  shape,
  answerType,
  status,
  fill,
  stroke = 'var(--ink-primary)',
  opacity = 1,
  radius = 18,
  state = 'default',
}: AtlasNodeGlyphProps) {
  const scale = state === 'hovered' ? 1.06 : 1;
  const selected = state === 'selected' || state === 'focused-selected';
  const focused = state === 'focused' || state === 'focused-selected';
  const markProps = {
    fill,
    opacity,
    stroke,
    strokeWidth: 2,
    strokeDasharray: STATUS_STROKE_DASH[status],
    vectorEffect: 'non-scaling-stroke' as const,
  };

  return (
    <g
      className="atlas-node-glyph"
      data-answer-mark={ANSWER_TYPE_MARKS[answerType]}
      data-interaction-state={state}
      data-status-stroke={status}
      pointerEvents="none"
      style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}
    >
      {focused ? <circle data-focus-halo="true" r={radius + ATLAS_FOCUS_HALO_OFFSET_PX} fill="none" stroke="var(--ink-primary)" strokeWidth="2" vectorEffect="non-scaling-stroke" /> : null}
      {selected ? <circle data-selection-ring="true" r={radius + ATLAS_SELECTION_RING_OFFSET_PX} fill="none" stroke="var(--signal-red)" strokeWidth="3" vectorEffect="non-scaling-stroke" /> : null}
      {shape === 'diamond' ? <path d={`M 0 ${-radius} L ${radius} 0 L 0 ${radius} L ${-radius} 0 Z`} {...markProps} /> : null}
      {shape === 'square' ? <rect x={-radius} y={-radius} width={radius * 2} height={radius * 2} {...markProps} /> : null}
      {shape === 'circle' ? <circle r={radius} {...markProps} /> : null}
      <InnerMark answerType={answerType} radius={radius} />
    </g>
  );
}
