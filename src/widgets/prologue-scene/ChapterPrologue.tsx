import React from 'react';
import { ChapterFrame } from '../../shared/ui/ChapterFrame';
import { PageFrame } from '../../shared/ui/PageFrame';
import { EditorialColumn } from '../../shared/ui/EditorialColumn';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useOverlay } from '../../app/providers/OverlayProvider';

export const ChapterPrologue: React.FC = () => {
  const { isReducedMotion, openEvidence } = useOverlay();

  return (
    <ChapterFrame id="prologue" orderNumber="CHAPTER 00">
      <PageFrame>
        <div className="min-h-[85vh] flex flex-col justify-between py-8">
          {/* Top Eyebrow & Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[var(--color-neutral-700)] border-b border-[var(--color-neutral-200)] pb-4">
            <div>
              <span className="font-bold text-[var(--color-ink)]">Editorial Scrollytelling</span> · 문화체육관광위원회 국정감사 6년
            </div>
            <div>
              [2018–2023] 시정요구 2,842건 전체 이행 궤적 추적
            </div>
          </div>

          {/* Core Visual Impact & Editorial Statement */}
          <EditorialColumn className="my-12 text-center relative">
            {/* Background SVG Evidence Line Animation */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none opacity-20">
              <svg width="100%" height="240" viewBox="0 0 800 240" className="w-full">
                <path
                  d="M 20 120 C 200 40, 400 200, 780 120"
                  fill="none"
                  stroke="var(--color-behavior-red-deep)"
                  strokeWidth="3"
                  className={isReducedMotion ? '' : 'animate-draw-line'}
                />
                <circle cx="20" cy="120" r="6" fill="var(--color-behavior-red-deep)" />
                <circle cx="400" cy="120" r="8" fill="var(--color-ink)" />
                <circle cx="780" cy="120" r="6" fill="var(--color-behavior-blue-deep)" />
              </svg>
            </div>

            <div className="inline-block px-3 py-1 mb-6 text-xs font-mono bg-[var(--color-behavior-red-bg)] text-[var(--color-behavior-red-deep)] border border-[var(--color-behavior-red-soft)]">
              저널리즘 에세이
            </div>

            <h1 className="type-display-xl font-serif text-[var(--color-ink)] mb-6 tracking-tight leading-[1.08]">
              “검토하겠습니다”
            </h1>

            <p className="type-display-l font-serif text-[var(--color-neutral-700)] mb-8 font-normal">
              6년 뒤, 국정감사엔 무엇이 남았는가
            </p>

            <p className="type-body-l text-[var(--color-neutral-700)] leading-relaxed mb-10 max-w-xl mx-auto">
              2018년부터 2023년까지 국회 문화체육관광위원회가 정부 피감기관에 전달한 시정요구는 총 2,842건. 
              피감기관이 제출한 공식 처리결과 보고서의 완료율은 82.4%에 달하지만, 
              우리가 마주한 현실의 질의와 답변 사이에는 여전히 끊어진 선이 존재합니다.
            </p>

            {/* Quick Teaser Action */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => openEvidence('ev-101')}
                className="px-5 py-2.5 bg-[var(--color-ink)] text-[var(--color-paper)] font-mono text-xs flex items-center gap-2 hover:bg-[var(--color-neutral-700)] transition-all shadow-sm"
              >
                <span>첫 증거 원문 확인하기 (ev-101)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </EditorialColumn>

          {/* Scroll Guidance */}
          <div className="flex flex-col items-center justify-center gap-2 text-xs font-mono text-[var(--color-neutral-500)] pt-8 border-t border-[var(--color-neutral-200)]">
            <span>스크롤하여 6년간의 증거 선을 추적하십시오</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[var(--color-behavior-red-deep)]" />
          </div>
        </div>
      </PageFrame>
    </ChapterFrame>
  );
};
