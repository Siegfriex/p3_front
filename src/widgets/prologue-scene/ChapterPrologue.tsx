import React from 'react';
import { motion, type Variants } from 'motion/react';
import { useNavigate } from 'react-router';
import { ChapterFrame } from '../../shared/ui/ChapterFrame';
import { PageFrame } from '../../shared/ui/PageFrame';
import { EditorialImageField } from '../../shared/ui/EditorialImageField';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useDetailNavigation } from '@/shared/hooks/useDetailNavigation';
import { usePreferences } from '@/shared/hooks/usePreferences';

export const ChapterPrologue: React.FC = () => {
  const navigate = useNavigate();
  const { openEvidence } = useDetailNavigation();
  const { isReducedMotion, isPresentationMode } = usePreferences();

  const handleScrollToScale = () => {
    navigate({ pathname: '/', hash: '#scale' });
  };

  // Motion variants for staggered viewport reveal
  const containerVariants: Variants = {
    hidden: { opacity: isReducedMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: isReducedMotion ? 1 : 0, y: isReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isReducedMotion ? 0 : 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <ChapterFrame id="prologue" orderNumber="CHAPTER 00">
      <PageFrame>
        <div className="relative min-h-[var(--layout-hero-min-height)] flex flex-col justify-between py-[var(--chapter-prologue-padding-block)] overflow-hidden">
          
          {/* Background SVG Evidence Line Geometry with Scale Handoff Elbow */}
          <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Evidence Line Entry to Handoff Curve */}
              <motion.path
                d="M 12 0 L 12 80 C 12 92, 50 92, 50 100"
                fill="none"
                stroke="var(--color-behavior-red-deep)"
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
                initial={isReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Entry Band Visual Impact Anchor */}
              <circle
                cx="12"
                cy="0"
                r="4"
                fill="var(--color-behavior-red-deep)"
                vectorEffect="non-scaling-stroke"
              />

              {/* Terminal Anchor for Chapter 2 (Scale) Handoff */}
              <circle
                cx="50"
                cy="100"
                r="5"
                fill="var(--color-ink)"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {/* Top Metadata & Eyebrow Bar */}
          <header className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-neutral-200)] pb-4">
            <div className="flex items-center gap-3">
              <span className="type-meta-micro text-[var(--color-ink)] font-bold">
                PROLOGUE
              </span>
              <span className="text-[var(--color-neutral-300)]">|</span>
              <span className="type-meta-micro">
                문화체육관광위원회 국정감사 6년 데이터저널리즘
              </span>
            </div>
            <div className="type-meta-micro text-[var(--color-neutral-500)]">
              [2018–2023] 시정요구 2,842건 전체 이행 궤적 추적
            </div>
          </header>

          {/* Main 12-Column Magazine Hero Layout */}
          <motion.div
            className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-6 items-start my-8 md:my-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Headline Block (Cols 2–10) */}
            <motion.div
              className="md:col-start-2 md:col-end-10 space-y-4"
              variants={itemVariants}
            >
              <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono bg-[var(--color-behavior-red-bg)] text-[var(--color-behavior-red-deep)] border border-[var(--color-behavior-red-soft)]">
                <span>저널리즘 에세이</span>
                <span className="text-[var(--color-neutral-300)]">•</span>
                <span>CHAPTER 00</span>
              </div>

              <h1 className={`type-display-hero-quote text-[var(--color-ink)] tracking-tight ${isPresentationMode ? 'text-6xl md:text-8xl' : ''}`}>
                “검토하겠습니다”
              </h1>

              <h2 className="type-display-hero-conclusion text-[var(--color-neutral-700)]">
                6년 뒤, 국정감사엔 무엇이 남았는가
              </h2>
            </motion.div>

            {/* Hero Image Slot (Cols 9–12 on Desktop, Inline on Mobile) */}
            <motion.div
              className="md:col-start-9 md:col-end-13 md:row-start-1 md:row-span-3 z-20 md:-mt-2"
              variants={itemVariants}
            >
              <EditorialImageField
                slotId="prologue-hero-identity"
                aspectRatio="3/4"
                stampBadge="ARCHIVE / DOC-01"
                placeholderCaption="[Midjourney Hero Asset Slot: National Assembly Audit Document 2018]"
                className="shadow-sm hover:opacity-100 transition-opacity"
                mobileCrop="banner"
              />
            </motion.div>

            {/* Supporting Paragraph & Primary Action (Cols 2–8) */}
            <motion.div
              className="md:col-start-2 md:col-end-8 space-y-6 md:mt-2"
              variants={itemVariants}
            >
              <p className="type-body-l text-[var(--color-neutral-700)] leading-relaxed max-w-2xl font-normal">
                2018년부터 2023년까지 국회 문화체육관광위원회가 정부 피감기관에 전달한 시정요구는 총 <strong className="text-[var(--color-ink)] font-bold">2,842건</strong>. 
                피감기관이 제출한 공식 처리결과 보고서의 완료율은 <strong className="text-[var(--color-behavior-blue-deep)] font-bold">82.4%</strong>에 달하지만, 
                우리가 마주한 현실의 질의와 답변 사이에는 여전히 끊어진 선이 존재합니다.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => openEvidence('ev-101')}
                  className="flex min-h-11 items-center gap-2 bg-[var(--color-ink)] px-5 py-2.5 font-mono text-xs text-[var(--color-paper)] shadow-sm transition-all hover:bg-[var(--color-neutral-700)] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--color-focus)] cursor-pointer"
                  aria-label="첫 증거 원문 ev-101 확인하기"
                >
                  <span>첫 증거 원문 확인하기 (ev-101)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <span className="type-caption font-mono text-[var(--color-neutral-500)]">
                  출처: 국회 문화체육관광위원회 시정요구 처리결과보고서
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Scroll Guidance / Handoff to Scale */}
          <footer className="relative z-10 flex flex-col items-center justify-center gap-2 pt-6 border-t border-[var(--color-neutral-200)]">
            <button
              type="button"
              onClick={handleScrollToScale}
              className="group flex min-h-11 flex-col items-center gap-1.5 p-2 font-mono text-xs text-[var(--color-neutral-500)] transition-colors hover:text-[var(--color-ink)] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--color-focus)] cursor-pointer"
              aria-label="다음 챕터 스케일로 스크롤하여 이동"
            >
              <span>스크롤하여 6년간의 증거 선을 추적하십시오</span>
              <ChevronDown
                className={`w-4 h-4 text-[var(--color-behavior-red-deep)] ${
                  isReducedMotion ? '' : 'animate-bounce'
                }`}
              />
            </button>
          </footer>
        </div>
      </PageFrame>
    </ChapterFrame>
  );
};
