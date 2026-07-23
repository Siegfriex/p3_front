import { Link, useParams } from 'react-router';
import type { DetailKind } from '@/shared/types/routing';
import { EDITORIAL_CASES, MOCK_EVIDENCES } from '@/shared/mock/storyData';
import { PageFrame } from '@/shared/ui/PageFrame';
import {
  EvidenceChain,
  EvidenceFixtureNotice,
  EvidenceHeader,
  EvidenceProvenanceRail,
  EvidenceStatusPair,
  EvidenceUnavailableState,
  EvidenceVerificationPanel,
} from '@/shared/ui/evidence';

interface DetailPageProps {
  kind: DetailKind;
}

export function DetailPage({ kind }: DetailPageProps) {
  const { evidenceId, caseId } = useParams();
  const itemId = kind === 'evidence' ? evidenceId : caseId;
  const developmentPreview = import.meta.env.DEV;
  const evidence = kind === 'evidence' && developmentPreview
    ? MOCK_EVIDENCES.find((item) => item.id === itemId)
    : undefined;
  const editorialCase = kind === 'case' ? EDITORIAL_CASES.find((item) => item.id === itemId) : undefined;

  if (kind === 'evidence' && itemId && !developmentPreview) {
    return (
      <main id="main-content" className="py-12 md:py-16" data-testid="evidence-direct-page" tabIndex={-1}>
        <PageFrame>
          <Link className="atlas-action-secondary" to="/#answers">← Story Answers로 돌아가기</Link>
          <div className="mt-8">
            <EvidenceUnavailableState
              evidenceId={itemId}
              headingLevel="h1"
              actions={(
                <>
                  <Link className="atlas-action-primary" to="/data">데이터 승인 상태 확인</Link>
                  <Link className="atlas-action-secondary" to="/atlas">답변행태 지도로 이동</Link>
                </>
              )}
            />
          </div>
        </PageFrame>
      </main>
    );
  }

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
      <main id="main-content" className="py-12 md:py-16" data-testid="evidence-direct-page" tabIndex={-1}>
        <PageFrame>
          <Link className="atlas-action-secondary" to="/#record">← Story의 증거 사슬로 돌아가기</Link>
          <article className="evidence-record-layout mt-8">
            <EvidenceFixtureNotice />
            <EvidenceHeader
              recordId={evidence.id.toUpperCase()}
              title={evidence.issue}
              context={`${evidence.auditYear}년도 국정감사 / ${evidence.targetOrg} / ${evidence.committee}`}
              headingLevel="h1"
            />
            <EvidenceStatusPair reported={evidence.reportedStatusLabel} verified="MOCK 검증값 · 승인 전" />
            <EvidenceChain
              items={[
                { step: '01', label: '시정요구', detail: evidence.issue },
                { step: '02', label: '당시 질문', detail: evidence.questionExcerpt },
                { step: '03', label: '당시 답변', detail: evidence.answerExcerpt },
                { step: '04', label: '공식 처리결과', detail: evidence.reportedStatusLabel },
              ]}
            />
            <EvidenceVerificationPanel
              conclusion={evidence.verificationLabel ?? '추가 검증값 없음'}
              detail={evidence.verificationDetail ?? '승인된 추가 검증 상세가 연결되지 않았습니다.'}
            />
            <EvidenceProvenanceRail
              meetingId={`${evidence.auditYear}-${evidence.committee}`}
              pages={evidence.sourcePage ?? '미제공'}
              pdfAsset="MOCK / PUBLIC ASSET 없음"
              pipelineRun="DEVELOPMENT PREVIEW"
              reviewStatus="NOT APPROVED"
              publicationStatus="DEVELOPMENT ONLY"
            />
            <footer className="border-t border-[var(--line-medium)] pt-4 font-mono text-xs text-[var(--ink-secondary)]">
              출처 표기: {evidence.sourceLabel} · {evidence.sourcePage ?? '페이지 미제공'}
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
