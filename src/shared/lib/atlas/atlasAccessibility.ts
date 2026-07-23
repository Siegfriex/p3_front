import type { AtlasNodeViewModel } from '@/shared/types/atlas';

const FAMILY_LABELS = {
  information_non_direct: '정보 부재·비직접 계열',
  deferral_procedural: '유보·절차 계열',
  action_evidence: '조치·근거 계열',
} as const;

const STATUS_LABELS = {
  complete: '추진완료',
  active: '추진중',
  unresolved: '미완료·단절',
} as const;

export function atlasNodeAccessibleName(node: AtlasNodeViewModel): string {
  return `${FAMILY_LABELS[node.behaviorFamily]}, ${STATUS_LABELS[node.status]}, ${node.answerType}`;
}

export function atlasNodeMetricDescription(node: AtlasNodeViewModel): string {
  const parts = [
    `답변 ${node.answerCount}건`,
    `정규화 질량 ${node.normalizedMass.toFixed(2)}`,
  ];
  if (node.confidence !== null) parts.push(`평균 신뢰도 ${Math.round(node.confidence * 100)}퍼센트`);
  return parts.join(', ');
}
