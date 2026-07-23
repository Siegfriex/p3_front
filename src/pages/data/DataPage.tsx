import React, { useState } from 'react';
import { PageFrame } from '../../shared/ui/PageFrame';
import { Badge } from '../../shared/ui/Badge';
import { MOCK_EVIDENCES } from '../../shared/mock/storyData';
import { Copy, Check, Table } from 'lucide-react';

export const DataPage: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopySchema = () => {
    const schemaJson = JSON.stringify(MOCK_EVIDENCES, null, 2);
    navigator.clipboard.writeText(schemaJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main id="main-content" className="py-12" tabIndex={-1}>
      <PageFrame>
        <div className="mb-8">
          <Badge label="데이터 계약" variant="neutral" className="mb-3" />
          <h1 className="type-display-l font-serif text-[var(--color-ink)] mb-4">
            데이터 스키마 & UI View Model
          </h1>
          <p className="type-body-l text-[var(--color-neutral-700)] max-w-2xl">
            본 프로젝트의 프론트엔드 UI View Model 스키마 및 정적 mock 데이터를 확인하고 
            실제 데이터 연결을 위한 어댑터 계약을 검토할 수 있습니다.
          </p>
        </div>

        {/* Action Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[var(--color-surface)] border border-[var(--color-neutral-200)] mb-8">
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-neutral-700)]">
            <Table className="w-4 h-4 text-[var(--color-behavior-red-deep)]" />
            <span>Mock Fixtures: {MOCK_EVIDENCES.length} 대표 사안 수록</span>
          </div>

          <button
            type="button"
            onClick={handleCopySchema}
            className="flex min-h-11 items-center gap-2 bg-[var(--color-ink)] px-4 py-2 font-mono text-xs text-[var(--color-paper)] transition-colors hover:bg-[var(--color-neutral-700)]"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Mock JSON 복사됨' : 'Mock JSON 스키마 전체 복사'}</span>
          </button>
        </div>

        {/* Schema Table */}
        <div
          className="overflow-x-auto border border-[var(--color-neutral-200)] bg-[var(--color-surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-behavior-red-deep)]"
          role="region"
          aria-label="Mock 데이터 스키마 가로 표"
          tabIndex={0}
        >
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--color-neutral-200)]/60 text-[var(--color-ink)] border-b border-[var(--color-neutral-200)]">
                <th className="p-3">ID</th>
                <th className="p-3">연도</th>
                <th className="p-3">사안명 (Issue)</th>
                <th className="p-3">피감기관</th>
                <th className="p-3">공식상태</th>
                <th className="p-3">답변유형</th>
                <th className="p-3">선스타일</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_EVIDENCES.map((item) => (
                <tr key={item.id} className="border-b border-[var(--color-neutral-200)] hover:bg-[var(--color-paper)]">
                  <td className="p-3 font-bold text-[var(--color-behavior-red-deep)]">{item.id.toUpperCase()}</td>
                  <td className="p-3">{item.auditYear}</td>
                  <td className="min-w-72 p-3 font-sans font-bold leading-relaxed">{item.issue}</td>
                  <td className="p-3 font-sans text-[var(--color-neutral-700)]">{item.targetOrg}</td>
                  <td className="p-3">
                    <Badge label={item.reportedStatusLabel} variant="status" status={item.reportedStatus} />
                  </td>
                  <td className="p-3">
                    <Badge label={item.behaviorType} variant="behavior" />
                  </td>
                  <td className="p-3 text-[var(--color-neutral-500)]">{item.lineStyle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageFrame>
    </main>
  );
};
