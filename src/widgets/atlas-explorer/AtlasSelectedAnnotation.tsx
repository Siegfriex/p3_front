import { ANSWER_TYPE_SEMANTICS } from '@/shared/config/atlas/atlasSemantics';
import type { AtlasNodeViewModel } from '@/shared/types/atlas';

interface AtlasSelectedAnnotationProps {
  node: AtlasNodeViewModel;
}

export function AtlasSelectedAnnotation({ node }: AtlasSelectedAnnotationProps) {
  const annotationX = Math.min(548, Math.max(172, node.screen.x));
  const annotationY = 10;
  const lineEndX = annotationX + (node.screen.x < annotationX ? -92 : 92);
  return (
    <g className="atlas-selected-annotation" aria-hidden="true" data-selected-annotation={node.id}>
      <path d={`M ${node.screen.x} ${node.screen.y} L ${lineEndX} 40 L ${lineEndX} 31`} />
      <rect x={annotationX - 102} y={annotationY} width="204" height="34" rx="3" />
      <text x={annotationX} y={annotationY + 14} textAnchor="middle">
        <tspan x={annotationX}>{node.answerType} · {ANSWER_TYPE_SEMANTICS[node.answerType].name}</tspan>
        <tspan x={annotationX} dy="13">{node.answerCount} answers · {node.linkCount} links</tspan>
      </text>
    </g>
  );
}
