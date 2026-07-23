import type { AtlasShapeToken, BehaviorFamily } from '@/shared/types/atlas';
import { AtlasNodeGlyph } from './AtlasNodeGlyph';

const families: readonly { shape: AtlasShapeToken; title: string; detail: BehaviorFamily; fill: string }[] = [
  { shape: 'circle', title: '정보 부재·비직접', detail: 'information_non_direct', fill: 'var(--ink-primary)' },
  { shape: 'diamond', title: '유보·절차', detail: 'deferral_procedural', fill: 'var(--archive-ochre)' },
  { shape: 'square', title: '조치·근거', detail: 'action_evidence', fill: 'var(--line-strong)' },
] as const;

export function AtlasLegend() {
  return (
    <details className="border-y border-[var(--line-medium)] bg-[var(--paper-surface)] py-3">
      <summary className="min-h-11 cursor-pointer px-1 py-3 font-mono text-xs font-bold tracking-[0.08em] text-[var(--color-ink)]">
        범례와 시각 인코딩
      </summary>
      <div className="mt-2 grid gap-6 border-t border-[var(--line-faint)] px-1 pt-5 lg:grid-cols-[1.4fr_1fr]">
        <ul className="grid gap-2 sm:grid-cols-3">
          {families.map((family) => (
            <li key={family.detail} className="flex items-start gap-3 text-sm">
              <svg className="h-7 w-7 shrink-0" viewBox="-18 -18 36 36" aria-hidden="true"><AtlasNodeGlyph shape={family.shape} answerType="A1" status="complete" fill={family.fill} radius={10} /></svg>
              <span><strong className="block">{family.title}</strong><span className="font-mono text-[10px] text-[var(--color-neutral-500)]">{family.detail}</span></span>
            </li>
          ))}
        </ul>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs text-[var(--color-neutral-700)]">
          <div><dt className="font-bold">위치</dt><dd>topic space</dd></div>
          <div><dt className="font-bold">크기</dt><dd>정규화 질량</dd></div>
          <div><dt className="font-bold">불투명도</dt><dd>신뢰도</dd></div>
          <div><dt className="font-bold">외곽선</dt><dd>완료 실선 · 진행 긴 점선 · 미완료 점선</dd></div>
        </dl>
      </div>
    </details>
  );
}
