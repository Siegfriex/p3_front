import { Link, useParams } from 'react-router';
import type { DetailKind } from '@/shared/types/routing';
import { EDITORIAL_CASES, MOCK_EVIDENCES } from '@/shared/mock/storyData';
import { Badge } from '@/shared/ui/Badge';
import { PageFrame } from '@/shared/ui/PageFrame';

interface DetailPageProps {
  kind: DetailKind;
}

export function DetailPage({ kind }: DetailPageProps) {
  const { evidenceId, caseId } = useParams();
  const itemId = kind === 'evidence' ? evidenceId : caseId;
  const evidence = kind === 'evidence' ? MOCK_EVIDENCES.find((item) => item.id === itemId) : undefined;
  const editorialCase = kind === 'case' ? EDITORIAL_CASES.find((item) => item.id === itemId) : undefined;

  if (!evidence && !editorialCase) {
    return (
      <main id="main-content" className="py-20" data-testid="detail-not-found" tabIndex={-1}>
        <PageFrame>
          <p className="type-mono text-[var(--color-behavior-red-deep)]">DETAIL NOT FOUND</p>
          <h1 className="type-heading-1 font-serif mt-4">해당 기록 ID를 찾을 수 없습니다</h1>
          <Link className="inline-block mt-8 underline" to="/">메인 스토리로 이동</Link>
        </PageFrame>
      </main>
    );
  }

  if (evidence) {
    return (
      <main id="main-content" className="py-12" data-testid="evidence-direct-page" tabIndex={-1}>
        <PageFrame>
          <Link className="type-mono underline" to="/#record">← Story의 증거 사슬로 돌아가기</Link>
          <article className="max-w-4xl mt-8 space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="type-mono font-bold text-[var(--color-behavior-red-deep)]">{evidence.id.toUpperCase()}</span>
              <Badge label={evidence.reportedStatusLabel} variant="status" status={evidence.reportedStatus} />
            </div>
            <h1 className="type-display-l font-serif">{evidence.issue}</h1>
            <p id="detail-summary" className="type-body-l text-[var(--color-neutral-700)]">
              {evidence.auditYear}년도 국정감사 · {evidence.targetOrg} · {evidence.committee}
            </p>
            <section className="p-6 border border-[var(--color-neutral-200)] bg-[var(--color-surface)]">
              <h2 className="type-heading-2 font-serif">속기록 질의</h2>
              <p className="mt-4 leading-relaxed">{evidence.questionExcerpt}</p>
            </section>
            <section className="p-6 border border-[var(--color-neutral-200)] bg-[var(--color-surface)]">
              <h2 className="type-heading-2 font-serif">피감기관 답변</h2>
              <p className="mt-4 leading-relaxed">{evidence.answerExcerpt}</p>
            </section>
            <section className="p-6 border border-[var(--color-behavior-red-soft)] bg-[var(--color-behavior-red-bg)]">
              <h2 className="type-heading-2 font-serif">저널리즘 검증</h2>
              <p className="mt-4 font-bold">{evidence.verificationLabel}</p>
              <p className="mt-2 leading-relaxed">{evidence.verificationDetail}</p>
            </section>
            <footer className="type-caption font-mono text-[var(--color-neutral-700)]">
              출처: {evidence.sourceLabel} · {evidence.sourcePage}
            </footer>
          </article>
        </PageFrame>
      </main>
    );
  }

  return (
    <main id="main-content" className="py-12" data-testid="case-direct-page" tabIndex={-1}>
      <PageFrame>
        <Link className="type-mono underline" to="/#cases">← Story의 대표 사례로 돌아가기</Link>
        <article className="max-w-4xl mt-8 space-y-8">
          <p className="type-mono text-[var(--color-behavior-red-deep)]">{editorialCase?.caseNumber}</p>
          <h1 className="type-display-l font-serif">{editorialCase?.title}</h1>
          <p className="type-body-l text-[var(--color-neutral-700)]">{editorialCase?.summary}</p>
          <dl className="grid gap-6 p-6 border border-[var(--color-neutral-200)] bg-[var(--color-surface)]">
            <div><dt className="type-mono text-[var(--color-neutral-500)]">요구</dt><dd>{editorialCase?.demandStatement}</dd></div>
            <div><dt className="type-mono text-[var(--color-neutral-500)]">답변</dt><dd>{editorialCase?.answerStatement}</dd></div>
            <div><dt className="type-mono text-[var(--color-neutral-500)]">공식 결과</dt><dd>{editorialCase?.officialOutcome}</dd></div>
            <div><dt className="type-mono text-[var(--color-neutral-500)]">저널리즘 검증</dt><dd>{editorialCase?.journalismCheck}</dd></div>
            <div><dt className="type-mono text-[var(--color-neutral-500)]">한계</dt><dd>{editorialCase?.limitationNote}</dd></div>
          </dl>
          <Link className="inline-block underline" to={`/evidence/${editorialCase?.evidenceId}`}>연결 증거 전체 보기</Link>
        </article>
      </PageFrame>
    </main>
  );
}
