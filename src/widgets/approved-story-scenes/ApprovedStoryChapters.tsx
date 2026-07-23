import { ArrowRight, FileText, ShieldCheck } from 'lucide-react';

import dopingReportExcerpt from '../../../reports/editorial_content_integration_20260724_022118_KST/pdf_renders/page2_embedded_934.png';
import lawmakerPhoto from '../../../reports/editorial_content_integration_20260724_022118_KST/pdf_renders/page2_embedded_946.png';
import memorialPhoto from '../../../reports/editorial_content_integration_20260724_022118_KST/pdf_renders/crop_photo1.png';
import spcLogo from '../../../reports/editorial_content_integration_20260724_022118_KST/pdf_renders/crop_photo2.png';
import auditPhoto from '../../../reports/editorial_content_integration_20260724_022118_KST/pdf_renders/page4_embedded_photo_crop.png';
import ministerPhoto from '../../../reports/editorial_content_integration_20260724_022118_KST/pdf_renders/page6_embedded_2.jpeg';

import { useDetailNavigation } from '@/shared/hooks/useDetailNavigation';
import type { AtlasViewModelBundle, EvidenceSummaryViewModel } from '@/shared/types/atlas';
import { ChapterFrame } from '@/shared/ui/ChapterFrame';
import { PageFrame } from '@/shared/ui/PageFrame';

interface ApprovedStoryChapterProps {
  bundle: AtlasViewModelBundle;
}

interface EditorialFigureProps {
  src: string;
  alt: string;
  caption: string;
  source: string;
  className?: string;
  contain?: boolean;
}

const STATUS_COPY = [
  { key: 'complete', label: '추진완료', description: '공개 원문에 완료로 보고된 decision group' },
  { key: 'active', label: '추진중', description: '공개 원문에 진행 중으로 보고된 decision group' },
  { key: 'unresolved', label: '미완료·단절', description: '완료·진행으로 닫히지 않은 decision group' },
] as const;

const RECORD_TRACE = [
  { year: '2022', label: '사고', detail: 'SPL 평택공장 노동자 사망사고' },
  { year: '사고 이후', label: '감독', detail: '고용노동부 SPC 계열사 기획감독' },
  { year: '감독 결과', label: '시정', detail: '산업안전보건법 위반 및 시정조치' },
  { year: '행정상 처리', label: '완료', detail: '공식 문서에 시정조치 완료 보고' },
  { year: '그 이후', label: '반복', detail: '유사 안전사고와 중대재해 재발' },
];

const EVASIVE_BY_YEAR = [
  { year: 2020, value: 201 },
  { year: 2021, value: 176 },
  { year: 2022, value: 250 },
  { year: 2023, value: 104 },
  { year: 2024, value: 428 },
  { year: 2025, value: 249 },
];

const IMPLEMENTATION_BY_YEAR = [
  { year: 2020, complete: 159, active: 317, completeRate: 33.4, activeRate: 66.6 },
  { year: 2022, complete: 354, active: 147, completeRate: 70.7, activeRate: 29.3 },
  { year: 2024, complete: 317, active: 272, completeRate: 53.8, activeRate: 46.2 },
];

const DOPING_POLICY_STEPS = [
  { eyebrow: '국정감사 지적', title: '입시 반영 필요', detail: '도핑 제재 이력을 체육특기자 전형에 반영할 기준 요구' },
  { eyebrow: '정부 답변', title: '관계기관 협의', detail: '교육부·대교협·대학스포츠협의회와 제도 개선 검토' },
  { eyebrow: '행정상 상태', title: '조치 중', detail: '국회 제출 결과보고서에는 장기 진행 상태로 분류' },
  { eyebrow: '협의 장기화', title: '공개 부족', detail: '추진 일정과 기관별 논의 내용은 충분히 공개되지 않음' },
  { eyebrow: '2026 확인', title: '결과 미확인', detail: '입시 반영 기준과 공식 제도화 결과를 찾기 어려움' },
];

const DOPING_CASE_STEPS = [
  { eyebrow: '선수 A', title: '고교 럭비선수', detail: '전국종별선수권대회 출전' },
  { eyebrow: '검사', title: '도핑 양성', detail: '메틸프레드니솔론 검출' },
  { eyebrow: '징계', title: '실적 박탈', detail: '자격 정지 1년 6개월' },
  { eyebrow: '입시 제도', title: '반영 규정 없음', detail: '제재 이력이 전형 기준에서 작동하지 않음' },
  { eyebrow: '2022', title: '대학 합격', detail: '자격 정지 상태에서 체육특기자 전형 입학' },
];

function EditorialFigure({ src, alt, caption, source, className = '', contain = false }: EditorialFigureProps) {
  return (
    <figure className={`story-figure ${className}`.trim()}>
      <div className="story-figure__image-wrap">
        <img
          src={src}
          alt={alt}
          className={contain ? 'story-figure__image story-figure__image--contain' : 'story-figure__image'}
          loading="lazy"
        />
        <span className="story-figure__stamp" aria-hidden="true">PDF SOURCE / RIGHTS REVIEW</span>
      </div>
      <figcaption className="story-figure__caption">
        <span>{caption}</span>
        <span className="story-figure__source">출처 · {source}</span>
      </figcaption>
    </figure>
  );
}

function ReleaseStamp({ bundle }: ApprovedStoryChapterProps) {
  return (
    <div className="story-release-stamp">
      <p className="story-hierarchy-1">APPROVED RELEASE / SHARED VIEWMODEL</p>
      <p className="story-release-stamp__id">{bundle.releaseId}</p>
    </div>
  );
}

function NativeFlow({ title, steps, caption }: { title: string; steps: typeof DOPING_POLICY_STEPS; caption: string }) {
  return (
    <figure className="story-native-figure">
      <header>
        <p className="story-hierarchy-1">NATIVE EDITORIAL GRAPHIC / HTML + CSS</p>
        <h3 className="story-hierarchy-3">{title}</h3>
      </header>
      <ol className="story-native-flow">
        {steps.map((step, index) => (
          <li key={`${step.eyebrow}-${step.title}`}>
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <p className="story-hierarchy-1">{step.eyebrow}</p>
            <h4>{step.title}</h4>
            <p>{step.detail}</p>
          </li>
        ))}
      </ol>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function ExecutionOverview() {
  return (
    <figure className="story-execution-figure">
      <header>
        <p className="story-hierarchy-1">2020 · 2022 · 2024 RESULT REPORTS</p>
        <h3 className="story-hierarchy-3">연도별 조치 완료와 조치 중 비중</h3>
      </header>
      <div className="story-execution-bars">
        {IMPLEMENTATION_BY_YEAR.map((item) => (
          <div key={item.year}>
            <div className="story-execution-bars__label"><strong>{item.year}</strong><span>{item.complete + item.active}건</span></div>
            <div className="story-execution-bars__track" aria-label={`${item.year}년 완료 ${item.complete}건 ${item.completeRate}퍼센트, 조치 중 ${item.active}건 ${item.activeRate}퍼센트`}>
              <span className="is-complete" style={{ width: `${item.completeRate}%` }}><b>{item.complete}</b><small>{item.completeRate}%</small></span>
              <span className="is-active" style={{ width: `${item.activeRate}%` }}><b>{item.active}</b><small>{item.activeRate}%</small></span>
            </div>
          </div>
        ))}
      </div>
      <figcaption><span>■ 조치 완료 830건</span><span>■ 조치 중·향후 계획 736건</span><strong>합계 1,566건</strong></figcaption>
    </figure>
  );
}

function EvidenceCard({ record, index }: { record: EvidenceSummaryViewModel; index: number }) {
  const { openEvidence } = useDetailNavigation();
  return (
    <article className="story-evidence-card">
      <div>
        <p className="story-hierarchy-1 story-accent-red">PUBLIC EVIDENCE / {String(index + 1).padStart(2, '0')}</p>
        <h3 className="story-evidence-card__title">{record.title}</h3>
        <dl className="story-evidence-card__meta">
          <div>
            <dt>REPORTED</dt>
            <dd>{record.reportedStatus ?? '미기재'}</dd>
          </div>
          <div>
            <dt>MEETING</dt>
            <dd>{record.meetingId}</dd>
          </div>
        </dl>
      </div>
      <button
        type="button"
        onClick={() => openEvidence(record.id)}
        className="story-evidence-card__action"
        aria-label={`${record.title} 승인 증거 열기`}
      >
        승인 원문 추적
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </article>
  );
}

export function ChapterApprovedScale({ bundle }: ApprovedStoryChapterProps) {
  const { storySummary } = bundle;

  return (
    <ChapterFrame id="scale" orderNumber="CHAPTER 01" className="story-chapter story-chapter--scale">
      <PageFrame>
        <header className="story-editorial-header story-editorial-header--wide">
          <div>
            <p className="story-hierarchy-1 story-accent-red">체대 입시 도핑 사례 / POLICY STILL PENDING</p>
            <h2 className="story-hierarchy-5">“3년째 조치 중…<br />관계 기관 협의는 어디까지 왔나”</h2>
          </div>
          <p className="story-hierarchy-4">
            도핑 제재 이력이 대학 입시에 반영되지 않는 문제. 관계기관 협의가 예고됐지만
            2026년 현재 구체적인 제도화 결과는 공식 자료에서 확인하기 어렵습니다.
          </p>
        </header>

        <div className="story-scale-lede">
          <EditorialFigure
            src={dopingPolicyFigure}
            alt="국정감사 지적부터 관계기관 협의와 현재 확인 결과까지 이어지는 체대 입시 도핑 정책 타임라인"
            caption="‘조치 중’이라는 분류만으로는 실제 정책 진행 여부를 알기 어렵다. 추진 일정·협의 결과·제도화 여부를 함께 공개해야 한다."
            source="국정감사 지적 및 결과보고서 기반 재구성"
            contain
          />
          <div className="story-reading-column">
            <p className="story-hierarchy-2 story-dropcap">
              국정감사에서는 교육부와 한국대학교육협의회, 한국대학스포츠협의회가 공동으로 개선안을 마련해야 한다고 요구했습니다.
              문체부는 관계기관 협의를 거쳐 제도 개선을 검토하겠다고 답했고, 결과보고서는 이 사안을 ‘조치 중’으로 분류했습니다.
            </p>
            <blockquote className="story-callout story-hierarchy-3">
              행정 상태가 ‘진행’이라고 쓰였다는 사실과, 제도가 실제로 바뀌었다는 사실은 같지 않습니다.
            </blockquote>
          </div>
        </div>

        <div className="story-media-pair">
          <EditorialFigure
            src={dopingCaseFigure}
            alt="도핑 적발 뒤에도 체육특기자 전형으로 대학에 합격한 사례의 재구성 인포그래픽"
            caption="경기 실적 박탈과 자격 정지 처분은 있었지만, 대학 입시에서는 제재 이력 반영 규정이 작동하지 않았다."
            source="TWIG 기사 사실관계 기반 재구성"
            contain
          />
          <EditorialFigure
            src={lawmakerPhoto}
            alt="국회 문화체육관광위원회 국정감사에서 발언하는 이병훈 의원"
            caption="이병훈 의원은 체대 입시가 도핑 사각지대에 놓였다고 지적했다."
            source="뉴시스"
          />
        </div>

        <figure className="story-document-excerpt">
          <img src={dopingReportExcerpt} alt="체대 입시에 도핑 제재 이력이 반영되도록 관계기관 대책 논의가 필요하며 조치 중이라고 적힌 결과보고서 발췌" />
          <figcaption>국정감사결과 시정조치 및 결과보고서 · 요구사항 139번</figcaption>
        </figure>

        <section className="story-approved-band" aria-label="승인 release 규모 지표">
          <div>
            <p className="story-hierarchy-1">APPROVED DATA LAYER</p>
            <h3 className="story-hierarchy-3">기사의 문제의식과 승인 데이터 탐색층을 분리해 읽습니다</h3>
          </div>
          <dl className="story-approved-metrics">
            <div><dt>DECISION GROUP</dt><dd>{storySummary.analysisEntityCount.toLocaleString('ko-KR')}</dd></div>
            <div><dt>ATLAS NODE</dt><dd>{storySummary.atlasNodeCount.toLocaleString('ko-KR')}</dd></div>
            <div><dt>PUBLIC EVIDENCE</dt><dd>{storySummary.publicEvidenceCount.toLocaleString('ko-KR')}</dd></div>
          </dl>
          <ReleaseStamp bundle={bundle} />
        </section>
      </PageFrame>
    </ChapterFrame>
  );
}

export function ChapterApprovedRecord({ bundle }: ApprovedStoryChapterProps) {
  const firstEvidence = bundle.evidence[0];

  return (
    <ChapterFrame id="record" orderNumber="CHAPTER 02" className="story-chapter story-chapter--record">
      <PageFrame>
        <header className="story-editorial-header">
          <div>
            <p className="story-hierarchy-1 story-accent-red">증거 사슬 / PAPER COMPLETION, FIELD RISK</p>
            <h2 className="story-hierarchy-5">“조치 완료” 보고 뒤에도<br />반복된 사망사고</h2>
          </div>
          <p className="story-hierarchy-4">서류와 현장의 간극을 한 사건의 시간축으로 다시 읽습니다.</p>
        </header>

        <ol className="story-redline-timeline" aria-label="SPC 안전 문제 5단계 증거 사슬">
          {RECORD_TRACE.map((step, index) => (
            <li key={step.year}>
              <span className="story-redline-timeline__node" aria-hidden="true">{index + 1}</span>
              <p className="story-hierarchy-1">{step.year}</p>
              <h3 className="story-hierarchy-3">{step.label}</h3>
              <p className="story-hierarchy-2">{step.detail}</p>
            </li>
          ))}
        </ol>

        <blockquote className="story-fullwidth-quote story-hierarchy-4">
          서류상 완료 여부보다 실제 현장에서 위험이 제거됐는지를 확인해야 합니다.
        </blockquote>

        <div className="story-record-evidence">
          <EditorialFigure
            src={memorialPhoto}
            alt="SPC 계열 제빵공장 노동자 사망사고 희생자를 추모하는 빈소"
            caption="‘조치 완료’라는 행정적 결과 이후에도 현장의 위험이 제거됐는지 다시 물어야 했다."
            source="사용자 제공 PDF 수록 보도사진"
          />
          <EditorialFigure
            src={spcLogo}
            alt="SPC그룹 로고"
            caption="SPC 사례는 행정적 완료와 현장 개선 사이의 간극을 보여주는 대표 사례다."
            source="Liberty Korea Post News 워터마크 수록본"
            contain
          />
        </div>

        {firstEvidence ? (
          <section className="story-approved-evidence-bridge">
            <div>
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              <p className="story-hierarchy-1">APPROVED EVIDENCE BRIDGE</p>
              <p className="story-hierarchy-2">PDF의 기사 사례와 별도로, 승인 release의 공개 Evidence는 원문 위치와 해시를 유지합니다.</p>
            </div>
            <EvidenceCard record={firstEvidence} index={0} />
          </section>
        ) : null}
      </PageFrame>
    </ChapterFrame>
  );
}

export function ChapterApprovedGap({ bundle }: ApprovedStoryChapterProps) {
  return (
    <ChapterFrame id="gap" orderNumber="CHAPTER 03" className="story-chapter story-chapter--gap">
      <PageFrame>
        <header className="story-editorial-header story-editorial-header--wide">
          <div>
            <p className="story-hierarchy-1 story-accent-red">간극과 명암 / REPORTED STATUS</p>
            <h2 className="story-hierarchy-5">“2년이 넘었는데<br />아직도 조치 중?”</h2>
          </div>
          <p className="story-hierarchy-4">도대체 언제까지 조치 중인가.</p>
        </header>

        <div className="story-finding-metrics" role="group" aria-label="기사 원고 시정 처리 요구 집계">
          <article className="story-finding-metrics__total">
            <p className="story-hierarchy-1">TOTAL REQUESTS</p>
            <strong>1,566</strong><span>건</span>
            <p>시정·처리요구 사항</p>
          </article>
          <article>
            <p className="story-hierarchy-1">COMPLETE</p>
            <strong>830</strong><span>건</span>
            <p>53.0% · 조치 완료</p>
          </article>
          <article className="story-finding-metrics__risk">
            <p className="story-hierarchy-1">STILL ACTIVE</p>
            <strong>736</strong><span>건</span>
            <p>47.0% · 조치 중·향후 계획</p>
          </article>
        </div>

        <div className="story-gap-layout">
          <EditorialFigure
            src={auditPhoto}
            alt="국회 문화체육관광위원회 국정감사장에서 의원이 마이크 앞에서 질의하는 모습"
            caption="완료와 진행이라는 행정 상태 뒤에는 질의가 현장 변화로 이어졌는지 확인하는 일이 남는다."
            source="포토뉴스"
          />
          <div className="story-reading-column">
            <p className="story-hierarchy-2 story-dropcap">
              기사 원고의 집계에서는 총 1,566건 가운데 830건이 완료, 736건이 조치 중으로 분류됐습니다.
              그러나 상태 라벨은 정책 효과를 자동으로 증명하지 않습니다. ‘완료’의 근거와 ‘진행’의 다음 일정이 함께 공개되어야 합니다.
            </p>
            <p className="story-contract-note">
              <strong>분모 주의.</strong> 위 1,566건은 동료 기사 원고의 시정·처리요구 집계입니다. 아래 승인 release의
              {` ${bundle.storySummary.analysisEntityCount.toLocaleString('ko-KR')}개 decision group`}과는 분석 단위가 달라 합산하거나 비율을 교차 해석하지 않습니다.
            </p>
          </div>
        </div>

        <section className="story-release-distribution" aria-label="승인 release reported status 분포" data-testid="approved-status-distribution">
          <header>
            <p className="story-hierarchy-1">APPROVED RELEASE / REPORTED STATUS</p>
            <h3 className="story-hierarchy-3">브라우저 재집계 없이 승인 summary를 그대로 표시</h3>
          </header>
          <div>
            {STATUS_COPY.map(({ key, label, description }, index) => (
              <article key={key}>
                <span aria-hidden="true">0{index + 1}</span>
                <p className="story-hierarchy-1">{label}</p>
                <strong>{bundle.storySummary.statusDistribution[key].toLocaleString('ko-KR')}</strong>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <ReleaseStamp bundle={bundle} />
        </section>
      </PageFrame>
    </ChapterFrame>
  );
}

export function ChapterApprovedCases({ bundle }: ApprovedStoryChapterProps) {
  const records = bundle.evidence.slice(0, 3);
  const maxEvasive = Math.max(...EVASIVE_BY_YEAR.map((item) => item.value));

  return (
    <ChapterFrame id="cases" orderNumber="CHAPTER 05" className="story-chapter story-chapter--cases">
      <PageFrame>
        <header className="story-editorial-header story-editorial-header--wide">
          <div>
            <p className="story-hierarchy-1 story-accent-red">회피성 답변 / ANSWER BEHAVIOR</p>
            <h2 className="story-hierarchy-5">“모르겠습니다.”<br />“기억이 안 납니다.”</h2>
          </div>
          <p className="story-hierarchy-4">감사장에서 계속된 회피성 발언은 6년간 1,408건이었습니다.</p>
        </header>

        <div className="story-cases-hero">
          <div className="story-cases-hero__metric">
            <p className="story-hierarchy-1">2020—2025 / EVASIVE ANSWERS</p>
            <strong>1,408</strong><span>건</span>
            <p className="story-hierarchy-2">회의록에서 확인된 기억부재·정보 없음·질문 비직접 대응</p>
          </div>
          <EditorialFigure
            src={ministerPhoto}
            alt="2024년 국정감사에서 답변하는 유인촌 문화체육관광부 장관"
            caption="2024년 실제 질의에서 ‘제가 있을 때 일어난 일이 아니기 때문에 잘 모르겠습니다’라는 답변이 나왔다."
            source="포토뉴스"
          />
        </div>

        <section className="story-quote-record">
          <header>
            <p className="story-hierarchy-1">2024 국정감사 실제 질의 / 잼버리 K-POP 콘서트</p>
            <h3 className="story-hierarchy-3">답변자 · 유인촌 문화체육관광부 장관</h3>
          </header>
          <blockquote>
            <p><span>질문</span> “문체부가 서울월드컵경기장 대관료를 얼마나 냈는지 알고 계십니까?”</p>
            <p><span>답변</span> “제가 있을 때 일어난 일이 아니기 때문에 저는 잘 모르겠습니다.”</p>
            <p><span>질문</span> “훼손된 상암구장 잔디에 대한 적절한 사후조치를 했다고 생각하십니까?”</p>
            <p><span>답변</span> “글쎄요, 그때는 제가 없어서 잘 모르겠는데요.”</p>
          </blockquote>
        </section>

        <section className="story-year-bars" aria-labelledby="evasive-year-heading">
          <header>
            <p className="story-hierarchy-1">YEARLY TRANSCRIPT COUNT</p>
            <h3 id="evasive-year-heading" className="story-hierarchy-3">2024년 428건으로 급증</h3>
          </header>
          <div className="story-year-bars__plot">
            {EVASIVE_BY_YEAR.map((item) => (
              <div key={item.year} className={item.year === 2024 ? 'is-peak' : ''}>
                <span className="story-year-bars__value">{item.value}</span>
                <span className="story-year-bars__bar" style={{ height: `${Math.max(18, (item.value / maxEvasive) * 100)}%` }} aria-hidden="true" />
                <span className="story-year-bars__year">{item.year}</span>
              </div>
            ))}
          </div>
          <p className="story-contract-note">기사 원고가 정의한 회피성 답변 기준에 따른 회의록 분류값입니다. 승인 Atlas의 behavior label 분포와 같은 집계로 간주하지 않습니다.</p>
        </section>

        <section className="story-evidence-index">
          <header>
            <FileText className="h-5 w-5" aria-hidden="true" />
            <div>
              <p className="story-hierarchy-1">APPROVED EVIDENCE INDEX</p>
              <h3 className="story-hierarchy-3">상태보다 먼저, 승인 원문을 읽습니다</h3>
            </div>
          </header>
          <div className="story-evidence-index__grid">
            {records.map((record, index) => <EvidenceCard key={record.id} record={record} index={index} />)}
          </div>
          <ReleaseStamp bundle={bundle} />
        </section>
      </PageFrame>
    </ChapterFrame>
  );
}
