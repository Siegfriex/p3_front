# Design Decisions — 디자인 결정 기록

## Gate Status
**PROLOGUE_QA_PASS** · **CHAPTER_01_LOCKED**

---

## 0. Chapter 1 Prologue Art Direction Lock
- **Visual Composition**: High-contrast editorial magazine grid with 12 columns (Desktop) and 4 columns (Mobile).
- **Core Headline**: Serif Display XL (`--type-display-hero-quote`) for “검토하겠습니다” and Serif Display L (`--type-display-hero-conclusion`) for “6년 뒤, 국정감사엔 무엇이 남았는가”.
- **Evidence Line**: 2.5px red thread (`var(--color-behavior-red-deep)`) originating from a 16px band entry at Column 2 and curving into a terminal handoff elbow at Column 6 `(X: 50%, Y: 100%)` to connect with Chapter 2 (Scale).
- **Hero Asset Slot**: `prologue-hero-identity` implemented via `EditorialImageField` with `ASSET_PENDING` fallback.
- **Scroll Behavior**: Native vertical scroll with non-blocking viewport animations (`motion/react`). Wheel hijacking, mandatory scroll snapping, and forced scroll locking are strictly forbidden.

---

## 1. 팔레트 & 색상 체계 (Paper & Ink & Light/Dark Rhythm)
- **기본 바탕 (Light Paper)**: `--color-paper` (`#f2f0ea`), 서피스: `--color-surface` (`#f8f8f5`)
- **텍스트/선**: `--color-ink` (`#0a0a0a`), 은은한 보조: `--color-neutral-700` (`#4e4e4a`), 분리선: `--color-neutral-200` (`#d8d5cd`)
- **반전 챕터 (Black Inverse Chapter - Gap)**: `data-theme="inverse"` 바탕 `#0a0a0a`, 텍스트 `#f2f0ea`, 증거선 `#ff3333`.
- **챕터 명암 리듬**:
  - Prologue: Paper / Light
  - Scale: Paper / Light
  - Record: Paper / Light (부분 dark insert 문서 조각)
  - Gap: Full Black Inverse Chapter (극적 대비)
  - Answers: Paper / Light Chapter 내부 국소 black SVG Atlas field 배치 (Gap과 Answers 연속 full-black 금지)
  - Cases: Paper / Light
  - Remains: Light에서 Dark Residue로 전환
- **답변유형 패밀리 (Response Pattern Family)**:
  - Red Family (`A1`, `A6`, `A8` - 비직접/유보/감사): `#8b342f` / `#d5968e`
  - Amber Family (`A2`, `A3`, `A4` - 법령/타기관/현황대치): `#9b6b25` / `#d8b273`
  - Blue Family (`A5`, `A7` - 이행완료/수치답변): `#2d6089` / `#86abc7`

---

## 2. 타이포그래피 & 데이터 SSOT 용어 (Editorial Journalism)
- **폰트 체계**:
  - 본문 및 UI: Pretendard Variable / sans-serif
  - 헤드라인 및 저널리즘 에세이 강조: Noto Serif KR / serif
  - 코드/ID/출처/페이지: Monospace (`ui-monospace`)
  - Fluid type system via `clamp()` (Display XL `clamp(4.5rem, 9vw, 8rem)`, Captions `0.625rem`).
- **SSOT 용어 표준**:
  - A1–A8 전체 분류: `answer behavior`, `response pattern`, `답변행태`, `응답유형` (전체를 '회피 유형'이라 부르지 않음).
  - A1–A4 (비직접·정보부재 계열), A5–A6 (유보·절차 계열), A7–A8 (조치·근거 계열).
  - Gap 의미: `보고된 처리상태`, `추가 검증상태`, `보고상태와 검증상태의 간극` (금지: '실제 결과', '허위 완료').
- **허용/금지 라벨**:
  - 금지: `CONFIDENTIAL`, `CLASSIFIED`, `SECRET`, `intelligence agency matrix`
  - 허용: `ARCHIVE`, `SOURCE`, `REPORTED`, `REVIEWED`, `VERIFIED`, `EVIDENCE`, `UNRESOLVED`, `DOCUMENT ID`, `PAGE`

---

## 3. 레이아웃 & 스크롤 메커니즘
- **기본 스크롤**: Native Vertical Scroll (wheel hijacking, mandatory scroll snap, decorative particles 전면 금지/폐기).
- **스크롤 추적 & 모션**: `IntersectionObserver`로 현재 활성 챕터 감지 및 `FooterRail` 연동, `motion/react`는 장면 진입/퇴장 및 증거선(Evidence Line) 애니메이션에만 한정 적용.
- **컬럼 그리드**:
  - Desktop: 12 Columns, max canvas width 100rem, editorial text width 45rem
  - Tablet: 8 Columns
  - Mobile: 4 Columns
- **비대칭 여백 & 레이아웃 유틸리티**: `.offset-left`, `.offset-right`, `FullBleedStage`, `EditorialColumn`.

---

## 4. 오버레이 & 드로어 (Single Architecture)
- 앱 전체에 하나의 `OverlayProvider` 및 `GlobalOverlayRoot`를 두고, Evidence ID나 Case ID 선택 시 `EvidenceDrawer` 오버레이로 슬라이드인.
- ESC 키, 백드롭 클릭, 포커스 트랩, reduced motion, ARIA live region 완벽 지원.

---

## 5. Atlas 원칙
- Atlas 좌표는 고정 deterministic fixture로 관리하며, A1–A8 답변행태 노드 위치는 정적 맵으로 렌더링.
- 노드 클릭 시 `EvidenceDrawer`로 직접 연동되어 원문 및 근거 확인 가능.

