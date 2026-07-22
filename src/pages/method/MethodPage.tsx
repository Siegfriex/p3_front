import React from 'react';
import { PageFrame } from '../../shared/ui/PageFrame';
import { EditorialColumn } from '../../shared/ui/EditorialColumn';
import { Badge } from '../../shared/ui/Badge';
import { FileText, ShieldAlert, CheckCircle2, Info } from 'lucide-react';

export const MethodPage: React.FC = () => {
  return (
    <main className="py-12">
      <PageFrame>
        <EditorialColumn>
          <Badge label="방법론 명세" variant="neutral" className="mb-4" />

          <h1 className="type-display-l font-serif text-[var(--color-ink)] mb-6">
            분석 방법론 및 저널리즘 원칙 (Methodology)
          </h1>

          <p className="type-body-l text-[var(--color-neutral-700)] mb-10 leading-relaxed">
            본 작품은 2018년부터 2023년까지 국회 문화체육관광위원회 국정감사에서 제출된 시정요구서, 
            회의 속기록, 피감기관 처리결과 보고서를 저널리틱 관점에서 분류·분석한 가이드라인을 규정합니다.
          </p>

          <div className="space-y-8 text-[var(--color-neutral-900)]">
            {/* Section 1 */}
            <section className="p-6 bg-[var(--color-surface)] border border-[var(--color-neutral-200)] space-y-3">
              <h2 className="type-heading-2 font-serif text-[var(--color-ink)] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[var(--color-behavior-blue-deep)]" />
                1. 분석 대상 및 범위 (Dataset Boundaries)
              </h2>
              <p className="type-body-m text-[var(--color-neutral-700)] leading-relaxed">
                - 수집 대상: 2018년~2023년도 국회 문화체육관광위원회 국정감사 시정 및 처리결과 보고서 종합 (총 2,842건)<br />
                - 데이터 속성: 연도, 요구기관, 피감기관, 시정요구 내용, 피감기관 답변, 처리결과(추진완료/추진중/처리불가)
              </p>
            </section>

            {/* Section 2 */}
            <section className="p-6 bg-[var(--color-surface)] border border-[var(--color-neutral-200)] space-y-3">
              <h2 className="type-heading-2 font-serif text-[var(--color-ink)] flex items-center gap-2">
                <Info className="w-5 h-5 text-[var(--color-behavior-amber-deep)]" />
                2. 8가지 답변 행태 분류 체계 (A1~A8 Taxonomy)
              </h2>
              <div className="space-y-2 type-caption font-mono text-[var(--color-neutral-700)]">
                <div>- A1 (Red): 원론적 검토 표명 ("상호 협의하여 장기 검토하겠음")</div>
                <div>- A2 (Amber): 법령 및 예산 한계 제시 ("관계 법령 개정 및 예산 확보 후 추진")</div>
                <div>- A3 (Amber): 타 기관 책임 이관 ("지자체 및 관계부처 간 협의 진행 중")</div>
                <div>- A4 (Amber): 단순 현황 설명 대치 ("현재 OO 사업을 추진하고 있음")</div>
                <div>- A5 (Blue): 실질 이행 완료 보고 ("시정 조치 및 규정 개정 완료함")</div>
                <div>- A6 (Red): 수용 불가 / 타당성 부재 ("사업 특성상 반영 불허")</div>
                <div>- A7 (Blue): 정량 수치 중심 답변 ("OO건 실적 달성 및 사업 추진 완료")</div>
                <div>- A8 (Red): 자체 조사 / 감사 진행 ("자체 감사 진행 중이며 조치 예정")</div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="p-6 bg-[var(--color-behavior-red-bg)] border border-[var(--color-behavior-red-soft)] space-y-3">
              <h2 className="type-heading-2 font-serif text-[var(--color-behavior-red-deep)] flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" />
                3. 한계 및 유의사항 (Methodological Limitations)
              </h2>
              <p className="type-body-m text-[var(--color-neutral-700)] leading-relaxed">
                - 본 프로젝트는 시정 및 처리결과 보고서에 작성된 공식 문장을 1차 텍스트로 사용합니다.<br />
                - 모든 데이터는 프론트엔드 시연용 결정론적 mock fixture(`src/shared/mock/storyData.ts`)로 구성되며 실제 정치적 판단이나 법적 책임을 확정하지 않습니다.<br />
                - 'MOCK' 표기 데이터는 추후 실데이터 어댑터 연동을 통해 전면 대체 가능합니다.
              </p>
            </section>
          </div>
        </EditorialColumn>
      </PageFrame>
    </main>
  );
};
