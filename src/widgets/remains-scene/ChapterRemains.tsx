import React from 'react';
import { Link } from 'react-router';
import { ChapterFrame } from '../../shared/ui/ChapterFrame';
import { PageFrame } from '../../shared/ui/PageFrame';
import { EditorialColumn } from '../../shared/ui/EditorialColumn';
import { LineSymbol } from '../../shared/ui/LineSymbol';
import { Badge } from '../../shared/ui/Badge';
import { FileText, Database, Share2, Check } from 'lucide-react';

export const ChapterRemains: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyCitation = () => {
    const citationText = '문체위 국정감사 6년: 요구–답변–처리결과 사이의 간극을 추적하는 Editorial Scrollytelling (2018–2023)';
    navigator.clipboard.writeText(citationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ChapterFrame id="remains" orderNumber="CHAPTER 06">
      <PageFrame>
        <EditorialColumn className="py-12 text-center">
          <Badge label="결언 및 후속 과제" variant="neutral" className="mb-4" />

          <h2 className="type-display-l font-serif text-[var(--color-ink)] mb-6">
            끝나지 않은 문장
          </h2>

          {/* Visual Lines Animation Symbol */}
          <div className="flex items-center justify-center gap-6 my-8 py-6 border-y border-[var(--color-neutral-200)]">
            <div className="text-center">
              <LineSymbol style="solid" length={90} color="var(--color-behavior-blue-deep)" />
              <span className="block type-mono text-[10px] text-[var(--color-neutral-500)] mt-2">
                닫힌 선 (완결)
              </span>
            </div>
            <div className="text-center">
              <LineSymbol style="dashed" length={90} color="var(--color-behavior-amber-deep)" />
              <span className="block type-mono text-[10px] text-[var(--color-neutral-500)] mt-2">
                이어지는 선 (진행)
              </span>
            </div>
            <div className="text-center">
              <LineSymbol style="break" length={90} color="var(--color-behavior-red-deep)" />
              <span className="block type-mono text-[10px] text-[var(--color-neutral-500)] mt-2">
                끊어진 선 (단절)
              </span>
            </div>
          </div>

          <p className="type-body-l text-[var(--color-neutral-700)] leading-relaxed mb-8">
            국정감사는 시정요구서 전달과 피감기관의 답변 제출로 끝나지 않습니다. 
            공식 보고서의 단정한 수치 뒤에 가려진 행태를 지속적으로 추적하고 기록하는 일, 
            그것이 시민 저널리즘이 의회 민주주의와 행정부 사이에 그어야 할 끊어지지 않는 선입니다.
          </p>

          {/* Supplemental View Triggers */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <Link
              to="/method"
              className="flex min-h-11 items-center gap-2 bg-[var(--color-ink)] px-5 py-2.5 font-mono text-xs text-[var(--color-paper)] shadow-sm transition-colors hover:bg-[var(--color-neutral-700)]"
            >
              <FileText className="w-4 h-4" />
              <span>분석 방법론 & 출처 계약 (Method)</span>
            </Link>

            <Link
              to="/data"
              className="flex min-h-11 items-center gap-2 border border-[var(--line-strong)] bg-[var(--color-paper)] px-5 py-2.5 font-mono text-xs text-[var(--color-ink)] transition-colors hover:bg-[var(--color-neutral-100)]"
            >
              <Database className="w-4 h-4" />
              <span>데이터 스키마 & 약관 (Data)</span>
            </Link>

            <button
              type="button"
              onClick={handleCopyCitation}
              className="flex min-h-11 items-center gap-2 border border-[var(--line-strong)] bg-[var(--color-paper)] px-4 py-2.5 font-mono text-xs text-[var(--color-neutral-700)] transition-colors hover:bg-[var(--color-neutral-100)]"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? '인용구 복사됨!' : '작품 인용구 복사'}</span>
            </button>
          </div>

          <div className="type-caption text-[var(--color-neutral-500)] font-mono">
            국회 문화체육관광위원회 2018–2023 국정감사 기록 데이터 에세이
          </div>
        </EditorialColumn>
      </PageFrame>
    </ChapterFrame>
  );
};
