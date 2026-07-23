# P3_CULTURE Frontend Atlas UX/UI Current-State Audit

- Audit ID: `frontend-ux-ui-current-state-20260723-142302`
- 기준 시각: 2026-07-23 14:40 KST
- 감사 방식: expert walkthrough, source/runtime/browser evidence audit
- Canonical contract: `P3_CULTURE/P3_FINAL/contracts/P3_CULTURE_UMAP_ATLAS_INTEGRATION_SSOT_v1.0.md`
- 사실 상태: `CONFIRMED`, `PARTIALLY_CONFIRMED`, `INFERRED`, `NOT_VERIFIABLE`, `CONTRADICTED`, `BLOCKED`

## 1. Executive Intelligence Brief

1. `CONFIRMED` — 실제 저장소는 예상 경로와 일치하고 branch는 `refactor/routing-technical-foundation`, HEAD는 `6f4835292abe9bc0cbbed81469b21c25c4e95777`다.
2. `CONFIRMED` — 감사 중 외부 작업으로 `/atlas`가 404에서 lazy-loaded contract shell로 변경됐으며, 이 보고서는 14:33 이후 재검증한 현재 트리를 기준으로 한다.
3. `CONFIRMED` — Approved frontend bundle은 없고 현재 production `/atlas`는 fixture fallback 없이 `DataUnavailable`을 표시한다.
4. `CONTRADICTED` — Story Answers는 여전히 8-node `MOCK` SVG이며, hard-coded 좌표를 물리적 거리와 의미축처럼 설명해 canonical topic-space 계약과 충돌한다.
5. `BLOCKED` — Story Answers node는 키보드 접근, accessible SVG name, DOM mirror가 없어 접근성 Gate를 통과할 수 없다.
6. `BLOCKED` — 새 Atlas inspector에서 evidence URL을 열 수 있으나 실제 detail route/Drawer는 기존 mock repository에 결합돼 approved provenance chain이 완성되지 않았다.
7. `PARTIALLY_CONFIRMED` — manifest/schema/adapter/query/scaler/SVG renderer가 생겼지만 body hash·row count·size 검증과 topic region/centroid 표현은 미완료다.
8. `CONFIRMED` — current tree에서 typecheck, lint, unit 23건, build, default E2E 9건이 통과했다. fixture E2E는 2 pass/3 fail로 Gate 증거가 불완전하다.
9. `BLOCKED` — 모바일 Axe serious 위반, 44px 미만 target, reset cascade에 따른 CTA 텍스트 소실이 제품 수준 UX를 막는다.
10. `CONFIRMED` — v1 renderer는 SVG 유지가 타당하며 Canvas/Pixi/Three.js/WebGL은 승인 데이터·성능 실패·정의된 z축이 없으므로 보류한다.

## 2. Confirmed Current State

### Repository baseline

| 항목 | 현재 증거 | 상태 |
|---|---|---|
| Repository | `/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front` | `CONFIRMED` |
| Expected repository | `P3_CULTURE/P3_0722/frontend/p3_front` | `CONFIRMED` |
| Branch | `refactor/routing-technical-foundation` | `CONFIRMED` |
| HEAD | `6f4835292abe9bc0cbbed81469b21c25c4e95777` | `CONFIRMED` |
| Worktree | staged 0, tracked modified 29, tracked deleted 1, untracked entries 33 | `CONFIRMED_DIRTY` |
| Lockfile | `package-lock.json` 존재, git에서는 untracked | `CONFIRMED` |
| Node/npm | Node 20.20.1, npm 10.8.2 | `CONFIRMED` |
| Core frontend | React 19.2.8, React Router 7.18.1, TypeScript 5.8.3, Vite 6.4.3 | `CONFIRMED` |
| Test stack | Vitest 4.1.10, Playwright 1.61.1, Axe 4.12.1 | `CONFIRMED` |
| 3D/data-viz packages | Three.js, PixiJS, D3, TensorFlow.js 미설치 | `CONFIRMED` |
| Installed but unused | `motion`, `@google/genai`, `express`, `dotenv`은 현재 `src` import 없음 | `CONFIRMED_DEAD_DEPENDENCY` |

감사 시작 시각에는 `/atlas`가 404였으나 14:25–14:32 사이 source tree에 Atlas 모듈이 추가됐다. 이 변경은 auditor가 수행하지 않았다. 14:33 이후 typecheck, lint, unit, build, browser capture를 다시 실행해 현재 상태를 기준으로 판정했다. 최초 404는 상태 변화 증거로만 보존하며 현행 route 판정에는 사용하지 않는다.

### Commands and outcomes

| 명령 | Exit | 결과 |
|---|---:|---|
| `npm run typecheck` | 0 | current tree PASS |
| `npm run lint` | 0 | current tree PASS |
| `npm run test` | 0 | 9 files, 23 tests PASS |
| `npm run build` | 0 | PASS; main 477.42 kB/147.27 kB gzip, AtlasPage 30.67 kB/9.55 kB gzip |
| `npm run test:e2e` | 0 | 9 PASS, 3 `CONTRACT_FIXTURE` SKIP |
| `node AUDIT_CAPTURE.mjs` | 0 | 4 viewport, 80 screenshots, DOM/Axe/route evidence |
| isolated fixture Playwright, port 3001 | 1 | 2 PASS, 3 FAIL; duplicated accessible role locator와 fixture/fail-closed 환경 충돌 |

`qa:foundation` aggregate script는 중복 실행하지 않았고 그 구성 요소인 typecheck, lint, test, build, E2E를 각각 실행했다. dependency 설치·업데이트, Lighthouse, 실제 screen reader, 200% zoom, recordings는 실행하지 않았다. 자세한 실행 기록은 [COMMAND_LOG.txt](COMMAND_LOG.txt)에 있다.

## 3. Product and Route Structure

| Surface | 계약 | 현재 구현 | 판정 |
|---|---|---|---|
| Story Preview | `/#answers`, 제한된 editorial scene | 8-node hard-coded mock SVG, 로컬 필터, mock Evidence Drawer | `STORY_PREVIEW_UX_PARTIAL` |
| Full Explorer | `/atlas`, approved bundle 기반 analytical explorer | lazy route, manifest/schema/adapter/query/scaler/SVG/DOM mirror shell, production `DataUnavailable` | `PARTIALLY_CONFIRMED`, approved-data render `BLOCKED` |
| Evidence Detail | `/evidence/:evidenceId`, direct page + background Drawer | direct/Drawer/Back 동작은 구현됐으나 mock repository만 조회 | approved Atlas provenance `BLOCKED` |

### Route inventory summary

| Route | 존재/lazy | Direct + refresh | Back/Forward | 주요 상태 | 현재 판정 |
|---|---|---|---|---|---|
| `/` | 존재, eager Story | 확인 | 확인 | Story chapters | `CONFIRMED` |
| `/#answers` | hash chapter | 확인 | hash direct/back 확인 | Story mock Atlas | `CONFIRMED` |
| `/method` | 존재 | 확인 | 확인 | static content | `CONFIRMED` |
| `/data` | 존재 | 확인 | 확인 | static/mock disclosure content | `CONFIRMED` |
| `/about` | 존재 | 확인 | 확인 | static content | `CONFIRMED` |
| `/atlas` | 존재, lazy | 확인 | 확인 | no approved release → `DataUnavailable` | `CONFIRMED` |
| `/evidence/:id` | 존재 | full page 확인 | background Drawer back 확인 | mock lookup | `PARTIALLY_CONFIRMED` |
| `/case/:id` | 존재 | full page 확인 | background Drawer back 확인 | mock lookup | `CONFIRMED_MOCK` |
| `/dev/foundations` | dev-only route | development에서 확인 | 확인 | production isolation은 E2E 확인 | `CONFIRMED` |
| `*` | 404 route | 확인 | 확인 | NotFound | `CONFIRMED` |

모든 캡처 route가 동일한 document title을 사용한다. route별 title/description metadata는 `CONTRADICTED`다. Story의 Answers에서 Full Explorer로 가는 CTA는 0개여서 `/atlas`는 URL을 아는 사용자만 도달한다. 세부 행렬은 [ROUTE_SCREEN_INVENTORY.csv](ROUTE_SCREEN_INVENTORY.csv)에 있다.

증거: [Story 1440](screenshots/1440/story_1440x900_top_20260723_142302.png), [Answers 1440](screenshots/1440/hash-answers_1440x900_default_20260723_142302.png), [Atlas DataUnavailable 1440](screenshots/1440/atlas_1440x900_access-result_20260723_142302.png), [Evidence direct](screenshots/1440/evidence-ev-101_1440x900_direct-page_20260723_142302.png), [Evidence Drawer](screenshots/1440/evidence-ev-101_1440x900_drawer-open_20260723_142302.png), [Case direct](screenshots/1440/case-case-01_1440x900_direct-page_20260723_142302.png), [404](screenshots/1440/does-not-exist_1440x900_404_20260723_142302.png).

## 4. UX/UI Maturity Assessment

| 축 | 점수 | 핵심 증거 | 상태 |
|---|---:|---|---|
| Information Architecture | 3/5 | Story–supporting pages–detail route 구조는 존재하나 Atlas 진입 CTA 없음 | `PARTIALLY_CONFIRMED` |
| Storytelling Clarity | 3/5 | 7장 narrative와 CTA가 있으나 mock/factual 경계 및 수치 모순 존재 | `PARTIALLY_CONFIRMED` |
| Navigation and Route Coherence | 3/5 | direct entry/back/overlay는 동작, Story 필터 URL 복원 불가 | `PARTIALLY_CONFIRMED` |
| Visual Hierarchy | 2/5 | 큰 editorial hierarchy는 있으나 wide whitespace, dense mobile controls, CTA label 소실 | `PARTIALLY_CONFIRMED` |
| Interaction Feedback | 2/5 | Drawer 상태는 양호하나 Story node keyboard/focus/return 실패 | `BLOCKED` |
| Responsive Robustness | 2/5 | 4 viewport에 큰 overflow는 없으나 target/label/rail obstruction 존재 | `PARTIALLY_CONFIRMED` |
| Accessibility | 1/5 | Story SVG 비접근, mobile Axe serious, 44px 미달 | `BLOCKED` |
| Data-State Integrity | 1/5 | Atlas fail-closed는 맞지만 public mock, 좌표 의미 오표현, 수치 불일치 | `BLOCKED` |
| Story–Explorer Contract Readiness | 2/5 | 새 modules는 있으나 Story가 shared VM/query/evidence contract를 사용하지 않음 | `BLOCKED` |
| Visual System Consistency | 2/5 | token 파일은 있으나 reset cascade와 component variation이 실제 UI를 손상 | `PARTIALLY_CONFIRMED` |

평균은 2.1/5이나 평균으로 Gate를 판정하지 않는다. `Data-State Integrity`와 `Accessibility`가 각각 1점이므로 전체 UX READY는 보류한다.

## 5. Story Experience Assessment

이 평가는 실제 사용자 테스트가 아닌 expert walkthrough다.

| Chapter | 의도된 역할 | 관찰 증거 | 판정 |
|---|---|---|---|
| Prologue | 문제 제기 | 제목과 첫 문장이 명확하나 1920에서 visual placeholder와 큰 공백이 장면 밀도를 낮춤 | `PARTIALLY_CONFIRMED` |
| Scale | 규모 인식 | 큰 수치 hierarchy는 분명하나 이 수치와 후속 Gap denominator의 연결 설명 부족 | `PARTIALLY_CONFIRMED` |
| Record | Evidence chain 이해 | 단계적 chain과 Evidence entry가 존재 | `CONFIRMED_MOCK` |
| Gap | 보고/검증 상태 차이 | Sankey형 흐름은 읽히지만 total 5,000이 Story total 2,842와 충돌 | `CONTRADICTED` |
| Answers | 답변행태 패턴 | 필터와 8-node preview가 있으나 좌표 의미, mock provenance, 접근성 위반 | `BLOCKED` |
| Cases | 구체 사례 확인 | 카드→Drawer/direct route는 작동하나 data는 mock | `PARTIALLY_CONFIRMED_MOCK` |
| Remains | 남은 질문/다음 행동 | 후속 질문과 Method/Data CTA가 있으나 Full Explorer CTA는 없음 | `PARTIALLY_CONFIRMED` |

Story가 일곱 장의 순서를 제공하고 mobile에서도 DOM reading order를 유지하는 것은 확인했다. 다만 Evidence Line이 canonical provenance로 이어지는 것은 확인할 수 없고, mock surface를 실데이터처럼 읽을 가능성이 있다. 장별 세부 증거는 [STORY_CHAPTER_AUDIT.csv](STORY_CHAPTER_AUDIT.csv)에 있다.

증거: [Story 1920](screenshots/1920/story_1920x1080_top_20260723_142302.png)은 wide-screen 공백을, [Story 375](screenshots/375/story_375x812_top_20260723_142302.png)은 narrow reading order와 밀도를 증명한다.

## 6. Answers Preview Assessment

### Data and rendering

- Component: `src/widgets/atlas-scene/ChapterAnswersAtlas.tsx`
- Data import: `src/shared/mock/storyData.ts`
- Classification: `MOCK`
- Grain/node count: 8 aggregate-looking nodes; approved Atlas node grain과의 일치 여부는 `NOT_VERIFIABLE`
- Coordinates: mock data에 x/y hard coding
- Radius/status/answer type/evidence IDs: mock object fields를 component가 직접 소비
- Projection: filter 전후 좌표는 변하지 않고 opacity만 바뀜 — 좌표 불변성은 이 제한된 mock에서 `CONFIRMED`
- ViewBox: `0 0 100 100`
- Actual overlaps: 8-node sample에서 coordinate overlap 0
- Story URL state: local component state; reload 후 filter가 `all`로 초기화 — `CONTRADICTED`

### Interaction and accessibility

- Hover/select/filters/reset는 pointer로 동작한다.
- SVG node focusable count는 0이며 node focus 시 active element는 `BODY`다.
- SVG에 accessible `role`, name, `<title>`, `<desc>`, chart summary가 없다.
- DOM mirror와 live region이 없다.
- 375 viewport에서 최소 mark diameter는 약 24.55px, 다른 캡처에서는 약 32.4px로 44×44 target 기준 미달이다.
- pointer로 node를 열면 Drawer close/back 후 focus가 원 node가 아니라 `BODY`로 간다. 일반 button opener의 Drawer focus return은 통과한다.
- 1440 capture 중 fixed chapter rail이 reset 클릭을 가로챘다. 이는 audit script가 강제 우회해 캡처를 계속했으며 제품 수정은 하지 않았다.

### Semantic contract

현재 UI는 hard-coded 2D 좌표를 `physical distance`, `Detail Level`, `Receptiveness`와 연결한다. canonical `position = topic space` 및 2D 거리를 실제 유사도로 단정하지 말라는 계약과 `CONTRADICTED`다. 색·형태·radius·opacity·stroke의 canonical encoding도 Story mock과 완전히 공유되지 않는다.

증거: [Answers default 375](screenshots/375/hash-answers_375x812_default_20260723_142302.png), [Answers hover 1440](screenshots/1440/hash-answers_1440x900_node-hover_20260723_142302.png), [Answers focus unavailable](screenshots/375/hash-answers_375x812_node-focus-unavailable_20260723_142302.png), [Evidence Drawer 375](screenshots/375/evidence-ev-101_375x812_drawer-open_20260723_142302.png). 세부 항목은 [ANSWERS_PREVIEW_AUDIT.csv](ANSWERS_PREVIEW_AUDIT.csv)에 있다.

## 7. Data–Frontend Readiness

| Contract element | 현재 상태 | 판정 |
|---|---|---|
| Approved release | `public`에 release files 없음 | `ABSENT_CONFIRMED` |
| Production fallback | no release → `DataUnavailable` | `CONFIRMED` |
| Manifest loader | 구현됨 | `PARTIALLY_CONFIRMED` |
| Runtime transport schema | 구현 및 unit test 존재 | `CONFIRMED_UNCOMMITTED` |
| Transport → ViewModel adapter | 구현 및 unit test 존재 | `CONFIRMED_UNCOMMITTED` |
| URL query parser | status/types/node/view 구현 | `CONFIRMED_UNCOMMITTED` |
| Immutable projection scaler | module/test 존재 | `CONFIRMED_UNCOMMITTED` |
| Aggregate SVG renderer | module 존재; no approved bundle로 production 미실행 | `PARTIALLY_CONFIRMED` |
| DOM mirror | Full Explorer에 구현 | `CONFIRMED_SOURCE`, fixture interaction `PARTIALLY_CONFIRMED` |
| Topic regions/centroids | transport/adapter에는 있으나 renderer에 미표시 | `PARTIALLY_CONFIRMED` |
| Story–Explorer shared VM | Story가 별도 mock raw object 사용 | `CONTRADICTED` |
| Approved EvidenceRepository | Atlas route와 연결되지 않음 | `BLOCKED` |
| Full integrity verification | fetched body sha256, manifest file size/row_count 강제 없음 | `BLOCKED` |

`loadAtlasBundle`은 manifest/projection/schema/version 식별자 사이의 일관성을 검사하지만 실제 fetched response body를 SHA-256으로 계산하지 않고 `files[].sha256`, size, row count를 강제하지 않는다. 따라서 “hash·schema·version 검증 후 렌더링” 계약을 완전히 충족했다고 승인할 수 없다.

DataUnavailable 정책 자체는 정확하다. 그러나 [Atlas 1440](screenshots/1440/atlas_1440x900_access-result_20260723_142302.png)과 [Atlas 375](screenshots/375/atlas_375x812_access-result_20260723_142302.png)에서 global CSS cascade 때문에 복귀 CTA의 텍스트가 배경과 같은 색으로 보이지 않는다. 즉 데이터 상태 의미는 옳지만 recovery UX는 P1이다.

## 8. Responsive and Accessibility Findings

### Responsive

- 375×812, 768×1024, 1440×900, 1920×1080 네 viewport에서 핵심 route를 동일 상태로 캡처했다.
- 캡처 route에서 page-level horizontal overflow는 발견하지 않았다.
- Story Answers의 label/control density는 375에서 충돌하며 최소 mark target은 44px 미만이다.
- 1440에서 fixed chapter rail이 Answers reset hit target을 가로막는 사례가 있었다.
- Drawer는 375에서 bottom-sheet 형태로 전환되고 body scroll lock, background inert, initial close focus는 확인됐다.
- safe-area, orientation change, actual low-end GPU behavior는 `NOT_VERIFIABLE`다.

### Automated accessibility

- 1440/1920 key route captures: Axe blocking issue 0.
- 375/768 `/` 및 `/#answers`: `.hide-scrollbar`에 serious `scrollable-region-focusable`.
- 375 `/data`: `.overflow-x-auto`에 serious `scrollable-region-focusable`.
- Axe 0은 수동 접근성 PASS로 사용하지 않았다.

### Manual accessibility

- 일반 button opener의 Drawer focus trap, Escape, focus return, background inert, scroll lock, browser Back close는 `CONFIRMED`다.
- Story Answers node의 Enter/Space/Escape, focus-visible, focus return은 node가 focusable하지 않아 `BLOCKED`다.
- Full Explorer source에는 SVG keyboard node와 DOM mirror가 있으나 isolated fixture E2E의 duplicated accessible role locator 때문에 URL/back/target assertions은 `PARTIALLY_CONFIRMED`다.
- screen reader software, 200% zoom, high-contrast OS mode는 `NOT_VERIFIABLE`다.

세부 viewport 수치와 accessibility matrix는 [RESPONSIVE_AUDIT.csv](RESPONSIVE_AUDIT.csv), [ACCESSIBILITY_UX_AUDIT.csv](ACCESSIBILITY_UX_AUDIT.csv), [INTERACTION_STATE_MATRIX.csv](INTERACTION_STATE_MATRIX.csv)에 있다.

## 9. Visual System Findings

1. `CONFIRMED` — token 파일과 common UI primitives가 존재하지만 token adoption은 일관되지 않다.
2. `CONTRADICTED` — `src/index.css`에서 Tailwind 이후 import되는 unlayered reset의 `a { color: inherit }`, `button { color: inherit }` 규칙이 utility text color를 덮는다.
3. `CONFIRMED` — 이 cascade는 active nav, dark CTA, Atlas DataUnavailable return action에서 black-on-black 또는 label 소실로 나타난다.
4. `PARTIALLY_CONFIRMED` — Header, FooterRail, chapter navigation은 공통 구조를 제공하지만 fixed rail이 content target과 충돌할 수 있다.
5. `PARTIALLY_CONFIRMED` — Drawer/card/badge/button 패턴은 존재하나 detail, filters, warning, empty/unavailable의 시각 언어가 완전히 통일되지 않았다.
6. `PARTIALLY_CONFIRMED` — 1920 Story hero는 큰 공백과 visual placeholder가 editorial balance를 약화한다.

Evidence: [DataUnavailable CTA](screenshots/1440/atlas_1440x900_access-result_20260723_142302.png), [Method](screenshots/1440/method_1440x900_default_20260723_142302.png), [Data](screenshots/1440/data_1440x900_default_20260723_142302.png), [About](screenshots/1440/about_1440x900_default_20260723_142302.png). Token 상세는 [DESIGN_TOKEN_AUDIT.csv](DESIGN_TOKEN_AUDIT.csv)에 있다.

## 10. Contradictions and Missing Evidence

| ID | 문서/가설 | 실제 증거 | 판정 |
|---|---|---|---|
| C-001 | `/atlas = NOT_IMPLEMENTED` | 감사 시작에는 404, 현행 tree에는 lazy contract shell | 가설은 현행 기준 `CONTRADICTED`; drift 기록 |
| C-002 | Approved bundle absent → DataUnavailable | 현재 `/atlas`가 DataUnavailable 표시 | `CONFIRMED` |
| C-003 | Story Answers 8-node mock | code/data/browser에서 8 nodes | `CONFIRMED_MOCK` |
| C-004 | position = topic space | Story는 physical distance와 임의 named axes로 설명 | `CONTRADICTED` |
| C-005 | Story–Explorer shared contract | Story는 legacy mock VM, Explorer는 새 Atlas VM | `CONTRADICTED` |
| C-006 | Evidence traceability | Explorer inspector URL은 만들지만 detail route는 mock-only | `BLOCKED` |
| C-007 | hash/schema/version 검증 | schema/version crosscheck는 있으나 fetched body hash 없음 | `PARTIALLY_CONFIRMED` |
| C-008 | Story total | Scale 2,842와 Gap 5,000이 충돌 | `CONTRADICTED` |

Missing evidence:

- Approved bundle이 없어 actual node count, full SVG element count, interaction/resize latency, FPS는 `BLOCKED_BY_GOLD`다.
- fixture E2E는 2 PASS/3 FAIL이다. 두 failure는 SVG node와 DOM mirror가 동일 accessible role/name을 가져 test locator가 strict-mode ambiguity를 일으킨 것이고, 나머지는 fixture release env에서 fail-closed를 동시에 검증한 환경 충돌이다. 이 결과만으로 product failure를 단정하지 않지만 Gate proof로도 승인하지 않는다.
- real screen reader, 200% zoom, orientation/safe-area, Lighthouse, recordings는 `NOT_VERIFIABLE`다.
- concurrent worktree drift로 current Atlas modules는 HEAD에 포함되지 않은 uncommitted files다. commit provenance는 `NOT_VERIFIABLE`다.

## 11. Priority Risks

### P0

| Issue | Category | 사용자/계약 영향 | 증거 |
|---|---|---|---|
| P0-DATA-001 | DATA_CONTRACT | Story Answers/Cases/Evidence `MOCK`가 scene-level persistent provenance 없이 공개되어 사실로 오인될 수 있음 | code, screenshots, [MOCK_REAL_DATA_EXPOSURE.csv](MOCK_REAL_DATA_EXPOSURE.csv) |
| P0-DATA-002 | DATA_CONTRACT | hard-coded mock coordinates를 physical distance/named semantic axes로 표현 | Answers copy + source |
| P0-A11Y-001 | ACCESSIBILITY | Story Answers 8개 node 전부 keyboard 접근 불가, SVG name/summary/DOM mirror 없음 | DOM/focus audit |
| P0-CONTENT-001 | CONTENT | Story total 2,842와 Gap flow total 5,000 충돌로 데이터 신뢰 훼손 | Story source/browser |

### P1

| Issue | Category | 주요 과업 영향 | 증거 |
|---|---|---|---|
| P1-PROVENANCE-001 | PROVENANCE | approved Atlas node에서 canonical evidence detail로 추적 불가 | Atlas inspector + mock DetailPage |
| P1-DATA-002 | DATA_CONTRACT | fetched files의 실제 hash/size/row count 무결성 미검증 | loader source audit |
| P1-VISUAL-001 | DESIGN_SYSTEM | reset cascade로 dark CTA와 active nav label 소실 | computed style + screenshots |
| P1-ROUTING-001 | ROUTING | Story/Header에서 Full Explorer 발견 불가; Story state share/reload 불가 | DOM flow/source |
| P1-A11Y-002 | ACCESSIBILITY | mobile scrollable region이 focusable하지 않아 keyboard 사용자 접근 차단 | Axe serious |
| P1-A11Y-003 | ACCESSIBILITY | Answers mark effective target 24.55–32.4px | geometry audit |

## 12. Decisions Required

구현 전에 다음 결정이 필요하다.

1. Story의 모든 mock scene을 production에서 제거할지, persistent `MOCK` banner로 격리할지 결정한다.
2. Story Preview가 새 Atlas ViewModel/encoding/query contract를 공유하고 no bundle에서 DataUnavailable을 표시할지 결정한다.
3. Story 공개 controls를 status/answer type/reset으로 제한할지 결정한다.
4. Full Explorer 진입을 Story CTA와 global navigation 중 어디에 제공할지 결정한다.
5. DataUnavailable의 recovery action, data status 설명, Method/Data 연결 copy를 결정한다.
6. approved EvidenceRepository를 direct page와 background overlay 모두에 적용하는 route contract를 결정한다.
7. topic region/centroid 기본 노출, node label, inspector 위치, mobile breakpoint를 결정한다.
8. URL에 Story status/types와 Explorer node/view 중 무엇을 보존할지 결정한다.
9. pan/zoom은 approved node 수와 측정 결과가 나오기 전에는 도입하지 않는 것으로 잠정 고정한다.
10. 3D는 approved x/y/z 또는 명시적 extrusion variable과 Decision Log가 생기기 전까지 보류한다.

각 결정의 owner, options, risk, required Gate는 [UX_DECISION_REGISTER.csv](UX_DECISION_REGISTER.csv)에 있다.

## 13. Recommended Design Direction

디자인 재진입은 `CONDITIONAL_READY`다. routing shell, Story editorial hierarchy, DataUnavailable, visual token/cascade, accessibility primitive는 현재 증거만으로 설계 결정을 시작할 수 있다. Approved-data Atlas의 density, label, zoom/pan, topic region, performance 시각 검증은 bundle 전까지 시작할 수 없다.

권고 순서는 다음과 같다.

1. public mock provenance와 상충 수치를 먼저 해결해 데이터 신뢰를 복원한다.
2. Story Answers를 shared Atlas ViewModel/encoding/query/evidence navigation contract 위에 올리고 editorial copy/control만 Story에 남긴다.
3. Story node accessibility primitive와 Full Explorer DOM mirror를 하나의 계약으로 통합한다.
4. reset cascade와 CTA contrast, fixed rail obstruction, mobile scroll region/target을 수정 대상으로 확정한다.
5. approved EvidenceRepository를 direct entry/Drawer/Back/focus return까지 연결한다.
6. bundle loader의 actual body hash, file metadata, row count 검증을 Gate로 고정한다.
7. approved bundle 이후에만 node density, region label, centroid, zoom/pan을 실제 측정한다.

이 보고서는 구현 지시가 아니라 다음 Agent 3 작업 범위와 Gate의 입력 자료다.

## 14. Renderer Recommendation

판정: `RENDERER_DECISION_READY — SVG 유지`.

| 선택지 | 현재 근거 | 판정 |
|---|---|---|
| SVG | Story mock 8 nodes, fixture 2 nodes, accessible node/DOM mirror 필요, 실제 성능 실패 없음 | `RECOMMENDED_V1` |
| Canvas | approved node 수와 SVG budget 실패 증거 없음; per-node focus/DOM mirror 추가 비용 | `DEFER` |
| PixiJS | dependency 없음, same accessibility burden, measured need 없음 | `DEFER` |
| Three.js/WebGL | z축 의미 없음, approved bundle 없음, 2D보다 나은 과업/모바일 전략/Decision Log 없음 | `DEFER` |

현재 production actual node count는 0이다. 따라서 SVG element budget, FPS, resize latency를 근거로 전환할 수 없다. TensorFlow.js, browser embedding, browser UMAP fit, force simulation, random jitter는 후보에서 제외한다. 상세 근거는 [RENDERER_READINESS_AUDIT.csv](RENDERER_READINESS_AUDIT.csv)에 있다.

## 15. Next Agent Prompt Inputs

### Exact implementation surfaces

| Issue | Path/component | 다음 검증 입력 |
|---|---|---|
| P0-DATA-001/002 | `src/widgets/atlas-scene/ChapterAnswersAtlas.tsx`, `src/shared/mock/storyData.ts` | mock provenance, topic-space copy, shared VM migration |
| P0-A11Y-001 | `ChapterAnswersAtlas` | focusable node, Enter/Space/Escape, SVG name/summary, DOM mirror, focus return |
| P0-CONTENT-001 | Scale/Gap scene data and copy | denominator/source reconciliation |
| P1-PROVENANCE-001 | `src/app/router/DetailPage.tsx`, `EvidenceRouteOverlay.tsx`, `src/shared/api/atlas/*` | approved EvidenceRepository direct/overlay integration |
| P1-DATA-002 | `src/shared/api/atlas/loadAtlasBundle.ts` 및 manifest schema | fetched body SHA-256, size, row_count, version Gate |
| P1-VISUAL-001 | `src/index.css`, reset/global styles, CTA primitives | cascade/layer/contrast computed-style regression |
| P1-ROUTING-001 | `src/app/router/AppRouter.tsx`, HeaderNav, Story Answers | discoverable CTA + URL state contract |
| P1-A11Y-002/003 | Story rail, Data overflow region, Atlas nodes | focusable scroll regions, 44×44 effective targets |
| ATLAS-RENDER | `src/widgets/atlas-explorer/*` | topic regions, centroids, empty/invalid-node, approved-bundle E2E |

### Required evidence for the next Gate

- committed routing foundation SHA와 clean/controlled worktree scope
- approved frontend release 또는 explicit no-release production fixture test
- actual response body hash mismatch test
- Story/Explorer shared ViewModel and encoding test
- canonical evidence direct/overlay trace test
- keyboard-only Story Answers test and screen reader summary
- 375/768/1440/1920 visual regression after CSS/accessibility repair
- URL reload/back/forward test for status/types/node/view

Machine-readable component/route/data 관계는 [COMPONENT_ROUTE_DATA_MAP.csv](COMPONENT_ROUTE_DATA_MAP.csv), 현재 source/report change scope는 [FILE_CHANGE_MAP.csv](FILE_CHANGE_MAP.csv)에 있다.

## 16. Gate Decision

| Gate | Decision | 근거 |
|---|---|---|
| `FRONTEND_UX_BASELINE_CONFIRMED` | `ACCEPTED` | current source, runtime, 80 screenshots, DOM/Axe evidence 수집 |
| `DESIGN_REENTRY_READY` | `ACCEPTED_CONDITIONALLY` | Story/routing/DataUnavailable/a11y/visual system 범위만 가능 |
| `STORY_PREVIEW_UX_PARTIAL` | `ACCEPTED` | pointer preview 존재, data/accessibility/provenance 위반 |
| `ATLAS_UX_CONTRACT_BLOCKED` | `ACCEPTED` | no approved bundle, incomplete integrity/evidence/Story sharing |
| `ACCESSIBILITY_UX_BLOCKED` | `ACCEPTED` | Story node keyboard failure + mobile Axe serious + target size |
| `VISUAL_SYSTEM_PARTIAL` | `ACCEPTED` | token/primitives 존재, cascade/contrast/layout defect |
| `RENDERER_DECISION_READY` | `ACCEPTED` | SVG 유지, Canvas/Pixi/Three/WebGL 보류 근거 충분 |

다음 Gate는 단일 PASS가 아니라 선행 순서로 운영해야 한다: `DATA_STATE_INTEGRITY_REVIEW` → `EVIDENCE_TRACEABILITY_PASS` → `ACCESSIBILITY_UX_RETEST` → `ATLAS_UX_CONTRACT_READY`. Approved bundle이 생기기 전에는 `ATLAS_RENDER_PASS`를 선언할 수 없다.

---

감사 원본은 [BROWSER_AUDIT_RAW.json](BROWSER_AUDIT_RAW.json), machine-readable summary는 [FRONTEND_UX_UI_CURRENT_STATE_AUDIT.json](FRONTEND_UX_UI_CURRENT_STATE_AUDIT.json), 전체 intake manifest는 [AGENT_UX_INTAKE_MANIFEST.json](AGENT_UX_INTAKE_MANIFEST.json)에 있다. 이번 감사에서 애플리케이션 소스 코드는 수정하지 않았다.
