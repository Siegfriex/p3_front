# Visual Design QA Report — Pre-change Baseline

## 1. Overall Visual Verdict

- Verdict: `FAIL / DESIGN VERTICAL SLICE REQUIRED`
- 가장 큰 시각 리스크: production Story가 승인 데이터 부재 상태에서도 8-node MOCK 좌표를 분석 결과처럼 표시한다.
- Evidence baseline: `outputs/frontend_ux_ui_current_state_audit/20260723_142302`의 80개 production-preview screenshot, DOM geometry, Axe 결과.

## 2. Screenshot Inventory

| 화면 | viewport | screenshot path | 판정 |
|---|---:|---|---|
| Story Answers | 375×812 | `../../frontend_ux_ui_current_state_audit/20260723_142302/screenshots/375/hash-answers_375x812_default_20260723_142302.png` | FAIL — mock nodes, dense controls, inaccessible marks |
| Story Answers | 1440×900 | `../../frontend_ux_ui_current_state_audit/20260723_142302/screenshots/1440/hash-answers_1440x900_default_20260723_142302.png` | FAIL — invalid axes/copy and no Explorer CTA |
| Full Explorer | 375×812 | `../../frontend_ux_ui_current_state_audit/20260723_142302/screenshots/375/atlas_375x812_access-result_20260723_142302.png` | FAIL — correct fail-closed state but CTA label hidden |
| Full Explorer | 1440×900 | `../../frontend_ux_ui_current_state_audit/20260723_142302/screenshots/1440/atlas_1440x900_access-result_20260723_142302.png` | PARTIAL — route shell exists, experience shell incomplete |

## 3. Visual Hierarchy Audit

| 화면 | 문제 | 사용자 영향 | 수정 제안 | 우선순위 |
|---|---|---|---|---|
| Story Answers | approved data가 없는데 mock plot이 dominant | 실제 분석 결과로 오인 | editorial DataUnavailable scene으로 전환 | P0 |
| Story Answers | invalid axes와 physical-distance copy | 의미공간 오해 | canonical projection warning으로 교체 | P0 |
| Story Answers | Full Explorer 진입 부재 | IA dead end | filter-carry CTA 추가 | P1 |
| Atlas | unavailable card만 있고 stage/inspector 구조 예고 부족 | 제품 구조를 이해하기 어려움 | intro/status/control/stage/inspector/legend shell | P1 |

## 4. Layout / Spacing Audit

| 위치 | 현재 문제 | 권장 spacing/grid | 우선순위 |
|---|---|---|---|
| Story controls | 375에서 control/label density 과다 | 4-group max, mobile vertical composition | P1 |
| ProgressTracker | 1440에서 Answers control hit interception | content-safe fixed rail offset | P1 |
| Global FooterRail | Story 외 route에도 고정 노출 | Story route scope로 제한 | P1 |
| Atlas mobile | stage/inspector responsive hierarchy 부재 | stage-first, inspector lower rail | P1 |

## 5. Typography Audit

| 위치 | 현재 문제 | 권장 type token | 우선순위 |
|---|---|---|---|
| State eyebrow | raw contract wording 중심 | data-state eyebrow/caption token | P2 |
| CTA | reset cascade로 dark CTA text invisible | explicit component foreground token | P0 |
| Projection note | Story/Explorer 표현 불일치 | shared projection-note typography | P1 |

## 6. Color / Contrast / WCAG Audit

| 위치 | 문제 | 결과 | 수정 제안 | 우선순위 |
|---|---|---|---|---|
| Dark CTA | global `a/button { color: inherit }`가 utility를 덮음 | black-on-black | reset을 cascade layer로 이동 | P0 |
| Story node | keyboard focus 없음 | focus contrast 측정 불가 | mock plot 제거; shared accessible primitive 사용 | P0 |
| Mobile scroll region | Axe serious | `scrollable-region-focusable` | focusable region + label | P1 |

## 7. Interaction Audit

| 컴포넌트 | 문제 | 테스트 방법 | 수정 제안 | 우선순위 |
|---|---|---|---|---|
| Story node | keyboard 0, focus return BODY | keyboard-only | production mock scene 제거 | P0 |
| Story CTA | 존재하지 않음 | `/#answers` DOM | `/atlas` query handoff | P1 |
| DataUnavailable | recovery CTA text 소실 | computed style/screenshot | shared visible CTA | P0 |
| SVG/DOM mirror | interactive control 중복 | role query strict ambiguity | SVG는 pointer presentation, DOM mirror가 keyboard owner | P1 |

## 8. Design Token Recommendations

- color: `--atlas-state-*`, explicit `--color-on-ink`, focus token.
- typography: state eyebrow, state title, projection-note roles.
- spacing: state panels 24/32px, control rail 16/24px.
- radius: existing sharp editorial radius 유지.
- shadow: stage/inspector 구분에만 제한.
- z-index: fixed chapter tracker가 content hit area를 침범하지 않도록 safe rail token.
- motion: opacity/selection only; reduced motion에서 duration 제거.

## 9. P0 Patch Plan

| 파일 | 수정 내용 | 이유 |
|---|---|---|
| `src/app/styles/reset.css` / `src/index.css` | cascade layer 분리 | CTA/navigation foreground 복원 |
| `src/shared/ui/atlas/*` | props-only shared states | loading/unavailable/error/empty/mismatch/invalid UX 일관화 |
| `src/widgets/atlas-scene/ChapterAnswersAtlas.tsx` | production mock plot 제거, no-data editorial scene, Explorer CTA | data trust와 IA 복원 |
| `src/pages/atlas/AtlasPage.tsx` | shared states와 explorer shell composition | approved-data 부재도 제품 경험으로 제공 |
| `src/widgets/atlas-explorer/*` | visual hierarchy 및 keyboard ownership 정리 | 접근성 중복 제거와 responsive shell |
| Story/Data scroll regions | focusable/label 추가 | mobile Axe serious 제거 |

이 baseline은 소스 수정 전에 작성됐다.
