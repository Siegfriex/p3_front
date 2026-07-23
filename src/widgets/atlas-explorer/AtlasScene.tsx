import { ATLAS_EFFECTIVE_HIT_RADIUS, ATLAS_PLOT_RECT, ATLAS_VIEWBOX } from '@/shared/config/atlas/atlasEncoding';
import type { AtlasNodeViewModel } from '@/shared/types/atlas';
import { AtlasNodeGlyph } from './AtlasNodeGlyph';
import { AtlasStageFrame } from './AtlasStageFrame';

interface AtlasSceneProps {
  nodes: readonly AtlasNodeViewModel[];
  selectedNodeId: string | null;
  previewNodeId: string | null;
  focusNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  onPreviewNode: (nodeId: string | null) => void;
}

export function AtlasScene({ nodes, selectedNodeId, previewNodeId, focusNodeId, onSelectNode, onPreviewNode }: AtlasSceneProps) {
  const summary = `${nodes.length}개 aggregate node. 위치는 주제 투영 좌표, 모양은 답변행태, 크기는 정규화 질량을 나타냅니다.`;
  const gridXs = [0.25, 0.5, 0.75].map((ratio) => ATLAS_PLOT_RECT.x + ATLAS_PLOT_RECT.width * ratio);
  const gridYs = [0.25, 0.5, 0.75].map((ratio) => ATLAS_PLOT_RECT.y + ATLAS_PLOT_RECT.height * ratio);

  return (
    <AtlasStageFrame
      label="QUESTION / ANSWER FIELD"
      title="답변행태 aggregate node"
      testId="atlas-chart"
      footer={<p id="atlas-chart-summary">{summary}</p>}
    >
      <div
        className="atlas-visual-scroll"
        role="region"
        aria-label="답변행태 시각 지도 스크롤 영역"
        tabIndex={0}
      >
        <svg
          className="redline-registration-grid block h-auto"
          viewBox={`0 0 ${ATLAS_VIEWBOX.width} ${ATLAS_VIEWBOX.height}`}
          role="img"
          aria-labelledby="atlas-svg-title atlas-svg-description"
          focusable="false"
        >
        <title id="atlas-svg-title">답변행태 지도</title>
        <desc id="atlas-svg-description">{summary} 아래 동기화 목록으로도 모든 node를 탐색할 수 있습니다.</desc>
        <rect x={ATLAS_PLOT_RECT.x} y={ATLAS_PLOT_RECT.y} width={ATLAS_PLOT_RECT.width} height={ATLAS_PLOT_RECT.height} fill="var(--color-paper)" stroke="var(--line-strong)" />
        <g aria-hidden="true" stroke="var(--color-neutral-300)" strokeDasharray="5 7" vectorEffect="non-scaling-stroke">
          {gridXs.map((x) => <line key={`x-${x}`} x1={x} x2={x} y1={ATLAS_PLOT_RECT.y} y2={ATLAS_PLOT_RECT.y + ATLAS_PLOT_RECT.height} />)}
          {gridYs.map((y) => <line key={`y-${y}`} x1={ATLAS_PLOT_RECT.x} x2={ATLAS_PLOT_RECT.x + ATLAS_PLOT_RECT.width} y1={y} y2={y} />)}
        </g>
        {nodes.map((node) => {
          const selected = node.id === selectedNodeId;
          const previewed = node.id === previewNodeId;
          const focused = node.id === focusNodeId;
          return (
            <g
              key={node.id}
              transform={`translate(${node.screen.x} ${node.screen.y})`}
              aria-hidden="true"
              data-node-id={node.id}
              data-anchor-x={node.anchor.x}
              data-anchor-y={node.anchor.y}
              className="cursor-pointer"
              onClick={() => onSelectNode(node.id)}
              onPointerEnter={() => onPreviewNode(node.id)}
              onPointerLeave={() => onPreviewNode(null)}
            >
              <circle r={ATLAS_EFFECTIVE_HIT_RADIUS} fill="transparent" stroke="transparent" />
              <AtlasNodeGlyph
                shape={node.encoding.shapeToken}
                answerType={node.answerType}
                status={node.status}
                fill={node.encoding.fillToken}
                opacity={node.encoding.opacity}
                radius={Math.max(8, Math.min(28, node.radiusPx))}
                state={selected ? 'selected' : focused ? 'focused' : previewed ? 'hovered' : 'default'}
              />
            </g>
          );
        })}
        </svg>
      </div>
    </AtlasStageFrame>
  );
}
