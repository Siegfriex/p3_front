# Visual Design QA Report

## 1. Overall Visual Verdict

- **FAIL**
- 가장 큰 시각 리스크: 현재 화면은 세 개의 기술 카드만 제공해 독자가 원본 자료, 가공 단계, Gold 판정, 64개 분석 입력의 관계를 검증할 수 없다.

## 2. Screenshot Inventory

| 화면 | viewport | screenshot path | 판정 |
|---|---:|---|---|
| Methodology 전체 | 1440×1000 | `before/method-desktop.png` | FAIL |
| Methodology 모바일 | 390×844 | `before/method-mobile-390.png` | FAIL |

## 3. Visual Hierarchy Audit

| 화면 | 문제 | 사용자 영향 | 수정 제안 | 우선순위 |
|---|---|---|---|---|
| Hero | 2018–2023 범위와 fixture 2,842건이 노출됨 | 프로젝트의 실제 데이터 범위를 오인 | 2020–2025 범위와 release badge로 교체 | P0 |
| 전체 | 769 labels와 64 links가 구분되지 않음 | Gold 모집단과 분석 입력을 같은 수로 해석 | 별도 상태 카드와 분모 설명 추가 | P0 |
| 본문 | 세 개의 동일한 박스만 연속됨 | 수집→검증 흐름과 중요도 파악 불가 | fact grid, pipeline spine, lifecycle board 도입 | P0 |
| 코드북 | P3_FINAL A1–A8 정의와 불일치 | 분류 의미를 잘못 이해 | canonical codebook으로 교체 | P0 |

## 4. Layout / Spacing Audit

| 위치 | 현재 문제 | 권장 spacing/grid | 우선순위 |
|---|---|---|---|
| 데스크톱 본문 | 약 720px 단일 칼럼으로 긴 문서 탐색 수단 없음 | 760px 본문 + 280px sticky rail | P0 |
| 섹션 | 3개 카드 사이 간격만 있고 장별 리듬이 없음 | 96–120px 섹션 리듬 | P1 |
| 모바일 | 오버플로는 없으나 긴 표 대응 구조 없음 | 표를 label-value 카드로 전환 | P0 |

## 5. Typography Audit

| 위치 | 현재 문제 | 권장 type token | 우선순위 |
|---|---|---|---|
| H1 | 제목은 강하지만 내용의 검증 목적을 전달하지 않음 | editorial display + two-line title | P0 |
| 본문 | 코드북이 작은 monospace 문장으로 밀집 | 17–18px body, 1.75 line-height | P0 |
| 수치 | 주요 숫자의 시각 위계가 없음 | tabular metric value + unit denominator | P0 |

## 6. Color / Contrast / WCAG Audit

| 위치 | 문제 | contrast 추정/측정 | 수정 제안 | 우선순위 |
|---|---|---:|---|---|
| 한계 카드 | 큰 red 면적이 유일한 강조로 사용됨 | 텍스트 대비는 양호 | warning은 아이콘·라벨·문장으로 함께 표시 | P1 |
| 상태 | lifecycle 단계별 semantic color가 없음 | 해당 없음 | Gold=blue, approved=green, candidate=amber | P0 |

## 7. Interaction Audit

| 컴포넌트 | 문제 | 테스트 방법 | 수정 제안 | 우선순위 |
|---|---|---|---|---|
| 전체 | 상호작용 가능한 정보 탐색 요소가 없음 | keyboard snapshot | native details accordion 추가 | P0 |
| 내비게이션 | 장문 페이지 내 이동 불가 | anchor focus/scroll | sticky section rail 추가 | P0 |

## 8. Design Token Recommendations

- color: 기존 paper/ink 토큰을 유지하고 methodology 전용 blue/green/amber 상태 토큰만 추가
- typography: serif display, sans body, mono metadata의 역할 분리
- spacing: 8px 기반, 문서 섹션은 96–120px
- radius: 0–8px의 낮은 반경
- shadow: 장식용 shadow 대신 1px rule 중심
- z-index: sticky rail은 기존 `--z-sticky`
- motion: details marker와 링크 hover에 150–220ms, reduced-motion 준수

## 9. P0 Patch Plan

| 파일 | 수정 내용 | 이유 |
|---|---|---|
| `src/pages/method/MethodPage.tsx` | 데이터 취재 보고서형 전체 구조와 canonical content 구현 | 계보·정의·검증 가능성 제공 |
| `src/pages/method/method-page.css` | 760+280 레이아웃, pipeline, lifecycle, mobile table 구현 | portfolio 수준의 문서 UX |
| `public/methodology/behavior-codebook.csv` | canonical A1–A8 다운로드 파일 | 공개 코드북 재사용성 |
| `src/widgets/app-shell/HeaderNav.tsx` | 노출 기간을 2020–2025로 교정 | 페이지 상단의 즉시 보이는 오류 제거 |

