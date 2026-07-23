import React from 'react';
import { PageFrame } from '../../shared/ui/PageFrame';
import { EditorialColumn } from '../../shared/ui/EditorialColumn';
import { Badge } from '../../shared/ui/Badge';
import { Feather, Shield } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <main id="main-content" className="py-12" tabIndex={-1}>
      <PageFrame>
        <EditorialColumn>
          <Badge label="프로젝트 소개" variant="neutral" className="mb-4" />

          <h1 className="type-display-l font-serif text-[var(--color-ink)] mb-6">
            프로젝트 정체성 & 팀 저널리즘
          </h1>

          <p className="type-body-l text-[var(--color-neutral-700)] mb-10 leading-relaxed">
            "문체위 국정감사 6년"은 데이터의 시각적 장식이 아닌, 의회 민주주의와 피감기관의 답변 행태 사이의 간극을 
            엄밀하게 기록하고 탐색하기 위해 설계된 디지털 저널리즘 에세이 작품입니다.
          </p>

          <div className="space-y-6 text-[var(--color-neutral-900)]">
            <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-neutral-200)] space-y-3">
              <h2 className="type-heading-2 font-serif text-[var(--color-ink)] flex items-center gap-2">
                <Feather className="w-5 h-5 text-[var(--color-behavior-red-deep)]" />
                디자인 원칙 (Design Principles)
              </h2>
              <ul className="space-y-2 type-body-m text-[var(--color-neutral-700)] list-disc pl-5">
                <li>Editorial Long-form Scrollytelling: 스크롤에 따라 서사가 응축되는 구조</li>
                <li>Grid-first Typography: 타이포그래피와 여백 중심의 높은 가독성</li>
                <li>Evidence Line Language: 공식 문서를 관통하는 고유의 선 언어 (Solid, Dashed, Dotted, Break, Loop)</li>
                <li>No Dashboard Cliché: 과도한 KPI 카드나 상용 SaaS 대시보드 틀 배제</li>
              </ul>
            </div>

            <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-neutral-200)] space-y-3">
              <h2 className="type-heading-2 font-serif text-[var(--color-ink)] flex items-center gap-2">
                <Shield className="w-5 h-5 text-[var(--color-behavior-blue-deep)]" />
                저널리틱 윤리 (Editorial Ethics)
              </h2>
              <p className="type-body-m text-[var(--color-neutral-700)] leading-relaxed">
                본 프로젝트는 특정 정당이나 개인을 비난하기 위한 목적이 아니며, 
                공식 회의록과 시정 및 처리결과 보고서의 문장 비교를 통해 행정부의 수용 및 이행 매커니즘을 증명합니다.
              </p>
            </div>
          </div>
        </EditorialColumn>
      </PageFrame>
    </main>
  );
};
