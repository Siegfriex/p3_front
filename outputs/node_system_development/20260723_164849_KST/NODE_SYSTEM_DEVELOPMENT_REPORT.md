# Semantic Node & Glyph System Development Report

> 상태: **FINAL NODE SYSTEM HANDOFF / CONTRACT_FIXTURE VERIFIED**  
> 작성 시각: 2026-07-23 KST  
> Canonical root: `/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front`  
> Branch: `agent/frontend-routing-atlas-foundation-20260723`  
> Frozen HEAD/upstream: `4c053ed583d718464a867fccb0b205458dde8273`  
> Final source changes: uncommitted, commit/push 미수행

## 1. Executive Intelligence Brief

두 차례 source snapshot을 5초 이상 간격으로 생성했고 대상 hash가 완전히 일치했다. 그 이후 Agent 3 소유 범위인 node glyph, radius, opacity, state, hit testing, uniform projection scaling, spatial navigation, Story–Explorer parity contract를 구현했다.

현재 production에는 approved Atlas manifest와 deterministic Story preview node ID가 없으므로 Story와 `/atlas` production은 계속 fail-closed `DataUnavailable`을 표시한다. 실제 node QA는 `CONTRACT_FIXTURE` provenance가 보이는 개발·테스트 모드에서만 수행했다. legacy projection, legacy evidence, `storyData.ts` fallback은 연결하지 않았다.

Typecheck, ESLint, Vitest, production build, production no-manifest Playwright, 격리 fixture Playwright, Axe critical/serious 검사가 최종 source에서 통과했다. D-017~D-021을 local node contract로 잠갔으며 approved-data 범위의 Gate는 선언하지 않는다.

## 2. Frozen Baseline

- Snapshot 1/2: 동일
- Snapshot 간 대기: 10초 이상
- Snapshot 1/2 SHA-256: `09af3fee556d7b06cf25f83dcb18f61f52444d259961e2288abd3041f996361a`
- Snapshot 결과: `snapshot_match: true`
- 시작 시 기존 unstaged 파일: `useReturnFocus.ts`, `AtlasDomMirror.tsx`, `atlas-contract-shell.spec.ts`, `technical-routing.spec.ts`
- 위 기존 변경은 제거하거나 되돌리지 않았다.
- Freeze 시 tracked source/test diff는 0이었다. 이후 Agent 3는 최종 owner 8개 파일만 수정했다.

## 3. Node Data Contract

Renderer는 `AtlasNodeViewModel`만 소비한다. raw transport field를 JSX에서 읽지 않는다.

보존 계약:

- `anchor`: audit metadata
- `display`: 렌더링 입력 좌표
- `screen`: immutable projection domain에서 계산된 화면 좌표
- `radiusPx`: upstream 값을 그대로 렌더링
- `encoding`: adapter/config가 생성한 shape/fill/stroke/opacity

금지된 force, jitter, browser collision, aggregation, centroid, kNN edge, filter refit은 추가하지 않았다.

## 4. ViewModel Gaps

아직 upstream 계약이 없어 production Story node field를 연결하지 않았다.

1. `AtlasSummaryTransport.story_preview_node_ids: string[]`
2. `EvidenceSummaryViewModel.questionExcerpt: string | null`
3. `EvidenceSummaryViewModel.answerExcerpt: string | null`

Story subset helper는 approved ID 목록이 비거나, 중복되거나, Full Explorer node set에 없는 ID를 포함하면 실패한다. mass/confidence/좌표 기반 frontend 임의 선택은 구현하지 않았다.

## 5. Glyph Grammar

공유 semantic token으로 다음을 고정했다.

| Dimension | Contract |
|---|---|
| behavior family | information→circle, deferral→diamond, action→square |
| A1–A8 mark | empty, horizontal, vertical, dot, empty, slash, plus, double-dot |
| status | complete solid, active long-dash, unresolved dotted |
| selected | red outer ring |
| focused | independent dark halo |
| focused-selected | halo와 ring 동시 렌더 |

Shape/mark/status mapping은 JSX 분기 여러 곳에 반복하지 않고 `atlasEncoding.ts`가 소유한다.

## 6. Radius and Mass Representation

- 기존 `Math.max(8, Math.min(28, radiusPx))` clamp를 제거했다.
- visual radius는 source `radiusPx`와 동일하다.
- 작은 node의 hit radius만 `max(22, radiusPx)`로 확장한다.
- source/rendered radius를 SVG `data-*` audit metadata로 남겼다.
- 기본 projection padding은 48 SVG unit이다.
- contract fixture 최대 radius 22 기준 요구 padding `22 + focus halo 13 + safety 8 = 43`을 만족한다.
- approved real-data 최대 radius는 아직 알 수 없으므로 실제 release에서 padding 재검산이 필요하다.

## 7. Confidence and Opacity

`getNodeDisplayOpacity`로 semantic confidence와 interaction dimming을 분리했다. 단순 곱셈은 사용하지 않는다.

- semantic floor: 0.45
- filtered: 0.14
- dimmed: 0.24–0.40
- hovered: 최소 0.82
- selected/focused: 최소 0.88

## 8. Status Stroke System

- `complete`: solid
- `active`: `12 6`
- `unresolved`: `2 5`
- glyph stroke는 ViewModel `encoding.strokeToken`을 사용한다.
- `vector-effect="non-scaling-stroke"`를 유지한다.

## 9. Interaction State Machine

Interaction 상태는 `default`, `hovered`, `focused`, `selected`, `focused-selected`, `dimmed`다. 별도 filter 상태는 `matched | context | excluded`다. Story는 context dim을 허용하지만 Full Explorer unmatched node는 excluded로 미렌더링한다. 어느 경우에도 projection domain과 ViewModel screen coordinate는 다시 계산하지 않는다.

## 10. Hit Area System

- visual mark와 transparent interaction target을 분리했다.
- effective target은 최소 44×44 CSS px다.
- visual glyph는 `pointer-events: none`, hit target이 pointer owner다.
- 겹친 hit region은 포인터와 node 중심 거리 우선, 동률이면 canonical node ID로 결정한다.
- overlap audit 함수는 좌표를 이동시키지 않고 충돌 쌍만 보고한다.

## 11. Keyboard Spatial Navigation

DOM mirror가 유일한 keyboard owner다. SVG glyph는 `aria-hidden`이며 별도 tab stop이 없다.

Directional algorithm:

1. 입력 방향 반평면 candidate
2. angular deviation 오름차순
3. projected directional distance 오름차순
4. canonical node ID 오름차순

Home/End, Arrow keys, Enter/Space, Escape 계약을 유지한다.

## 12. Label LOD

Label은 selected/focused/hovered node에만 나타난다. 내용은 A-code, 짧은 behavior label, answer count다. Topic label은 approved manual-label 여부를 구별할 계약이 없어 node label에서 사용하지 않았다. 오른쪽 경계 근처에서는 label anchor를 왼쪽으로 flip하며 node 좌표는 바꾸지 않는다.

## 13. Edge Policy

기본 edge는 0개다. 2D proximity 기반 edge는 생성하지 않았다. approved relation transport가 없으므로 data edge나 centroid relation도 렌더링하지 않았다.

## 14. Story Node Field

Production Story approved node count는 0이다. `#answers > .page-frame`는 DataUnavailable scene을 유지하며 mock node를 노출하지 않는다. deterministic `story_preview_node_ids`가 없으므로 node selector를 production에 연결하지 않았다.

## 15. Full Explorer Node Field

`/atlas`는 동일 node set을 immutable domain으로 투영한다. Full Explorer의 unmatched node는 excluded로 미렌더링한다. 필터 결과가 0이어도 graph frame/domain은 유지되며 reset message를 표시한다. Reset 후 node는 원래 screen coordinate로 복원된다.

## 16. Story–Explorer Parity

Pure contract test가 다음 equality를 검사한다: ID, projection, anchor, display, answer type, behavior family, status, normalized mass, source radius, confidence, encoding. Viewport별 `screen` 좌표만 달라질 수 있다. Approved Story ID가 없어 real Story subset parity는 아직 실행할 수 없다.

## 17. Responsive Geometry

Fixture screenshot viewport: 320×800, 375×812, 768×1024, 1440×900, 1920×1080.

- page horizontal overflow: 0
- small viewport: 44px hit target 보존을 위해 Atlas stage 내부 scroll region 유지
- projection domain/refit: 변경 없음
- SVG viewBox: 720×520
- plot rect: x=76, y=48, width=600, height=408
- uniform aspect-preserving scale와 centered letterbox 적용

## 18. Accessibility

Contract/shell readiness만 검증했으며 real-data accessibility PASS는 선언하지 않는다.

- accessible SVG title/description: 통과
- chart summary: 통과
- single accessible node control via DOM mirror: 통과
- focus/selection independent visuals: 통과
- Enter/Space/Escape: 통과
- Arrow/Home/End: 통과
- live region: 통과
- 44px hit target: 통과
- forced colors/reduced motion/text spacing: screenshot 및 Axe 검사 수행
- Axe critical/serious: 0

## 19. Performance

모든 값은 2-node `CONTRACT_FIXTURE`이며 approved real-data 결과가 아니다.

| Metric | Result |
|---|---:|
| initial DOMContentLoaded | 358.8 ms |
| filter latency | 21.3 ms |
| directional navigation latency | 25.7 ms |
| node selection latency | 28.3 ms |
| resize settle | 44.3 ms |
| layout shift | 0 |
| used JS heap | 18,200,000 bytes |
| SVG element count | 33 |
| visual node count | 2 |
| DOM navigator items | 2 |

Fixture 규모가 작으므로 SVG 유지/renderer 교체 판단 근거로 확대 해석하지 않는다.

## 20. Tests

| QA | Result |
|---|---|
| `npm run typecheck` | PASS |
| `npm run lint` | PASS, 0 warnings |
| `npm test` | PASS, 14 files / 39 tests |
| `npm run build` | PASS |
| production no-manifest Playwright | PASS, 15 passed / 4 fixture skipped |
| isolated fixture Playwright | PASS, 5 passed / 2 production skipped |
| node pointer/touch/filter invariance | PASS |
| fixture performance test | PASS |
| Axe critical/serious | 0 |

Fixture 첫 실행은 기존 3000번 dev server가 재사용돼 fixture env가 적용되지 않아 실패했다. 구현 실패가 아닌 환경 격리 문제로 판정했고, 기존 프로세스를 종료하지 않고 3011 전용 config로 재실행해 통과했다. Visual glyph가 hit target을 가로채던 실제 문제는 `pointer-events: none`으로 수정한 뒤 재검증했다.

## 21. Remaining Blockers

1. Approved frontend manifest와 real node bundle 부재
2. Approved `story_preview_node_ids` 부재
3. Evidence question/answer excerpt ViewModel 부재
4. Approved 최대 radius를 이용한 projection padding 검산 불가
5. Real node density에서 hit-overlap 및 label LOD 검증 불가
6. Story approved subset과 Explorer real parity 검증 불가
7. Confidence opacity mapping은 approved distribution 전까지 provisional

## 22. Gate Decision

현재 증거로 확인 가능한 local contract gates:

- `NODE_CONTRACT_CONFIRMED`
- `NODE_VIEWMODEL_REQUIREMENTS_READY`
- `NODE_GLYPH_SYSTEM_PASS`
- `NODE_RADIUS_CONTRACT_PASS`
- `NODE_STATUS_ENCODING_PASS`
- `NODE_STATE_SYSTEM_PASS`
- `NODE_HIT_TARGET_PASS`
- `NODE_SPATIAL_NAVIGATION_PASS`
- `NODE_LABEL_LOD_PASS`
- `NODE_EDGE_POLICY_LOCKED`

`NODE_STORY_EXPLORER_PARITY_PASS`는 pure/fixture contract 수준에서만 성립하며 approved-data gate로 확대하지 않는다.

Final local verdict: `SEMANTIC_NODE_SYSTEM_VERTICAL_SLICE_COMPLETE`

## Current Artifact Paths

- Report: `/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front/outputs/node_system_development/20260723_164849_KST/NODE_SYSTEM_DEVELOPMENT_REPORT.md`
- Performance JSON: `/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front/outputs/node_system_development/20260723_164849_KST/NODE_PERFORMANCE_REPORT.json`
- Screenshots: `/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front/outputs/node_system_development/20260723_164849_KST/screenshots/`
- Isolated Playwright report: `/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front/outputs/node_system_development/20260723_164849_KST/playwright-report/`
