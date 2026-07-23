# P3_CULTURE Agent 4 — WCAG 2.2 구현 및 충돌 인계 보고서

작성 시각: 2026-07-23 17:02:25 KST  
보고 범위: `REDLINE PUBLIC RECORD` presentation layer의 시인성·키보드·포인터·접근성 강화 작업  
최종 판정: `CONCURRENT_SOURCE_DRIFT_BLOCKED`

## 1. Executive Intelligence Brief

1. Agent 4는 route landmark, skip link, Atlas DOM navigator, SVG 접근성, Evidence Drawer focus lifecycle, 44×44 target, contrast, forced-colors, reduced-motion을 구현했다.
2. 충돌 전 기준에서는 typecheck, lint, 27개 unit test, production build, routing E2E가 통과했다.
3. 320·375·768·1440·1920 viewport에서 Axe critical/serious 0건과 page-level horizontal overflow 0을 확인했다.
4. Story의 세로 chapter 흐름은 유지했으며 page-level 가로 스크롤을 추가하지 않았다. Atlas 시각 stage만 필요한 경우 내부 단일 scroll region으로 제한했다.
5. 구현 중 repository branch가 기준 브랜치에서 agent branch로 변경되고 새로운 commit이 생성됐다.
6. 이후 Atlas encoding, projection scaler, spatial navigation, glyph, scene, E2E 파일이 외부 프로세스에 의해 다시 변경됐다.
7. 현재 typecheck는 삭제된 hit-radius 상수 import 때문에 실패하며, unit test는 navigation·projection 계약 변경 때문에 실패한다.
8. 따라서 충돌 전 성공 결과를 현재 HEAD의 성공 결과로 재사용할 수 없다.
9. 현재 source는 Agent 4 변경과 외부 Atlas 변경이 혼합된 상태다.
10. 독립 QA 진입 전 파일 소유권과 세 가지 핵심 계약을 먼저 확정하고 전체 검증을 다시 실행해야 한다.

## 2. Repository Baseline과 Drift

### 2.1 작업 시작 시 기록된 freeze

| 항목 | 기록값 | 상태 |
|---|---|---|
| repository | `/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front` | `CONFIRMED` |
| branch | `refactor/routing-technical-foundation` | 세션 시작 기준 |
| HEAD | `6f4835292abe9bc0cbbed81469b21c25c4e95777` | 세션 시작 기준 |
| source file-set digest | `1a854a62ec882ce5d643a86c1ce8170058584144354f24a31e431146a7685920` | 두 snapshot 일치 |
| worktree status digest | `35f7802db265a3869e46183b82aa8beaacdb3bf2cba3b4fc9332c1b635f0acfd` | 두 snapshot 일치 |
| snapshot 간격 | 6초 | drift 없음 |

### 2.2 17:02 KST live 상태

| 항목 | 현재값 | 판정 |
|---|---|---|
| branch | `agent/frontend-routing-atlas-foundation-20260723` | 시작 기준과 다름 |
| HEAD | `3e5bbd70a0757f3a34f4d8bd07b666bbab133bb3` | 시작 기준과 다름 |
| tracked modified | 23 files | 혼합 worktree |
| source untracked | Atlas encoding/hit-testing/parity test 및 구현 5 files | 외부 추가 확인 |
| outputs/design docs | 다수 untracked | 기존 및 병렬 agent 산출물 포함 |

Reflog에서 확인된 사건:

- 2026-07-23 16:24:07 KST: `refactor/routing-technical-foundation`에서 `agent/frontend-routing-atlas-foundation-20260723`로 checkout.
- 2026-07-23 16:42:19 KST: `3e5bbd7 feat: establish routing and Atlas experience foundation` commit 생성.
- Agent 4는 `commit`, `push`, `stash`, `reset`, `checkout`, branch switch를 수행하지 않았다.
- 따라서 위 branch/commit 변경은 Agent 4의 승인된 작업 범위 밖에서 발생한 source drift다.

이 시점 이후 동일 파일에 대한 구현·테스트 결과는 단일 agent 소유로 귀속할 수 없다.

## 3. Agent 4가 구체적으로 수행한 구현

### 3.1 적용 기준

- WCAG 2.2 Level AA normative criteria
- WAI-ARIA APG Dialog Modal Pattern
- WAI-ARIA APG Keyboard Interface practices
- 프로젝트의 44×44 enhanced target policy
- 프로젝트의 full-focus-visibility policy
- `$vercel:react-best-practices`

React 구현에는 named export, native semantic control, 불필요한 effect 기반 state 동기화 회피, 불필요한 memoization 회피 원칙을 적용했다.

### 3.2 Route와 의미 구조

- route별 고유 document title 갱신 구조를 추가했다.
- Story 및 Atlas에 `본문으로 건너뛰기` skip link를 연결했다.
- Atlas route에 다음 skip target을 구성했다.
  - Atlas controls
  - Atlas node 목록
  - 선택된 node 정보
- 각 route의 `main` landmark에 안정적인 ID와 programmatic focus target을 부여했다.
- heading은 시각 크기가 아니라 문서 구조를 기준으로 유지했다.

주요 구현 파일:

- `src/app/router/RouteAccessibility.tsx`
- `src/shared/ui/accessibility/SkipLinks.tsx`
- route page 및 Story chapter landmark 파일

주의: 위 신규 파일은 Agent 4가 작성했지만 현재 HEAD의 외부 commit에 흡수된 상태여서 `git status`만으로 작성 주체를 판별할 수 없다.

### 3.3 Atlas 접근성 구조

Atlas를 다음 세 계층으로 정리했다.

1. Visual SVG
2. Interactive DOM node navigator
3. Textual summary와 inspector

구현 내용:

- SVG root에 `role="img"`, `<title>`, `<desc>`를 연결했다.
- SVG node mark는 `aria-hidden="true"`, `focusable="false"`로 처리해 DOM navigator와의 이중 노출을 방지했다.
- DOM navigator를 node interaction의 단일 keyboard owner로 구현했다.
- navigator 전체를 하나의 Tab stop으로 운영하는 roving `tabIndex`를 적용했다.
- 각 node는 native `<button type="button">`과 `aria-pressed`를 사용한다.
- `aria-describedby`로 수치 설명을 분리했다.
- confidence가 null이면 0 또는 임의 백분율로 읽지 않도록 했다.
- focus와 visual highlight를 동기화했다.

초기 keyboard model:

- `Arrow Left/Right/Up/Down`: screen coordinate 기준 가장 가까운 방향 node
- `Home/End`: canonical order의 첫/마지막 node
- `Enter/Space`: node 선택
- `Escape`: selection 해제

관련 파일:

- `src/widgets/atlas-explorer/AtlasDomMirror.tsx`
- `src/widgets/atlas-explorer/AtlasScene.tsx`
- `src/widgets/atlas-explorer/AtlasNodeGlyph.tsx`
- `src/shared/lib/atlas/atlasAccessibility.ts`
- `src/shared/lib/atlas/atlasNodeNavigation.ts`
- `src/shared/lib/atlas/atlasNodeNavigation.test.ts`

### 3.4 Atlas 좌표와 모바일 overflow 대응

- filter나 selection으로 semantic coordinate를 재계산하지 않았다.
- Story 전체 page에 horizontal scroll을 만들지 않았다.
- 320–375px viewport에서 44×44 SVG hit target을 보존하기 위해 Atlas stage에만 local overflow region을 적용했다.
- heading, controls, node navigator, inspector, projection note는 single-axis reflow를 유지했다.
- 이 구현은 “초광폭 레퍼런스처럼 페이지 전체를 가로로 넘기는 방식”이 아니라 “하방 스크롤 기반 Story + 필요한 stage 내부 제한 스크롤”이다.

### 3.5 Evidence Drawer와 focus lifecycle

- backdrop close를 `mousedown` 즉시 실행에서 `click`/pointer-up 이후 실행으로 변경했다.
- 닫기, copy, footer action의 44×44 target을 확보했다.
- Drawer 내부 tab을 native/ARIA tab contract에 맞춰 roving focus로 구현했다.
- `Arrow Left/Right`, `Home`, `End`를 지원했다.
- `Escape` close와 focus trap을 유지했다.
- browser Back으로 overlay가 닫히는 route contract를 검증했다.
- opener가 존재하면 opener로 focus를 반환하도록 했다.
- opener가 filter로 제거된 경우 다음 fallback 순서를 구현했다.
  1. Atlas node navigator heading
  2. selected filter
  3. Atlas stage heading
- mobile bottom sheet에 safe-area bottom을 반영했다.

관련 파일:

- `src/widgets/evidence-drawer/EvidenceDrawer.tsx`
- `src/shared/hooks/useReturnFocus.ts`

### 3.6 Focus, contrast, forced colors, reduced motion

- keyboard focus에 최소 2px outline과 paper halo를 적용했다.
- `outline: none` 기반 제거를 사용하지 않았다.
- `scroll-padding`과 `scroll-margin`으로 sticky UI에 의한 focus obstruction을 줄였다.
- forced-colors에서 system color 기반 outline과 selected state가 유지되도록 했다.
- loading red rule의 continuous animation을 제거했다.
- `prefers-reduced-motion: reduce`에서 transition을 0–80ms 범위로 축소했다.
- 작은 metadata 대비 개선을 위해 다음 token을 조정했다.
  - `ink.tertiary`: `#74736E` → `#6F6E69`
  - ochre text: `#8A6F32` → `#806426`
- essential form/control border를 `line.strong` 기준으로 강화했다.

### 3.7 44×44 pointer target 및 semantic control

다음 인터랙션의 유효 target을 44×44 이상으로 보강했다.

- Global Header navigation
- Story controls
- year filters
- Evidence switcher
- Case 선택 버튼
- Gap filters와 evidence card action
- Remains actions
- Drawer close/copy/footer action
- Atlas visual node hit area

Gap evidence interaction owner는 clickable `div`에서 native `button`으로 변경했다.

### 3.8 콘텐츠 및 정보 노출 보정

- Method taxonomy의 `(Red/Amber/Blue)` 색 이름을 domain label에서 제거했다.
- Data table의 essential issue text를 단순 말줄임으로 제거하지 않게 했다.
- 수정한 button에 `type="button"`을 명시했다.

## 4. 충돌 전 검증 결과

아래 결과는 외부 source drift가 관측되기 전, Agent 4 구현 기준 결과다. 현재 HEAD에 그대로 승계된 결과로 간주하면 안 된다.

| 검증 | 결과 | 근거 |
|---|---|---|
| TypeScript | PASS | `npm run typecheck` |
| ESLint | PASS | `npm run lint` |
| Unit tests | PASS | 11 files, 27 tests |
| Production build | PASS | 2166 modules transformed |
| Atlas route chunk | 39.42 kB, gzip 12.13 kB | build output |
| Fixture E2E | PASS | 3 passed, 2 skipped |
| Production no-data E2E | PASS | 2 passed, 3 skipped |
| Technical routing E2E | PASS | 7/7 passed |
| Axe critical/serious | 0 | 320/375/768/1440/1920 fixture states |
| Page horizontal overflow | 0 | 5 viewport 측정 |
| Visible Story targets under 44px | 0 | browser geometry 재측정 |
| SVG node hit area | 44×44 이상 | 2-node contract fixture |
| SVG hit-area overlap | 0 | 2-node contract fixture |
| Drawer browser Back | PASS | route-driven overlay scenario |
| Drawer focus return | PASS | opener 및 fallback 확인 |

자동 Axe 0건은 독립적인 WCAG conformance 인증을 뜻하지 않는다.

## 5. 생성된 시각 증거

경로:

`outputs/wcag22_interaction/20260723_162627_KST/screenshots/`

생성된 주요 상태:

- `320/atlas_320x800_approved-default.png`
- `320/atlas_320x800_unavailable-default.png`
- `375/atlas_375x812_approved-default.png`
- `375/atlas_375x812_unavailable-default.png`
- `768/atlas_768x1024_approved-default.png`
- `768/atlas_768x1024_unavailable-default.png`
- `1440/atlas_1440x900_approved-default.png`
- `1440/atlas_1440x1000_unavailable-default.png`
- `1920/atlas_1920x1080_approved-default.png`
- `1920/atlas_1920x1080_unavailable-default.png`
- `atlas_contract_fixture_1440x1000.png`
- `atlas_contract_fixture_selected_1440x1000.png`
- `forced-colors/atlas_375x812_forced-colors.png`
- `reduced-motion/atlas_375x812_reduced-motion.png`
- `text-spacing/atlas_375x812_text-spacing.png`
- `zoom-400/atlas_320x800_zoom-400-simulated.png`

`zoom-400-simulated`는 실제 OS assistive-technology 결과가 아니라 CSS viewport equivalent이므로 `NOT_VERIFIABLE_ENVIRONMENT` 범위를 벗어나지 않는다.

## 6. 확인된 충돌 지점

### 6.1 충돌 파일과 현재 SHA-256

| 파일 | 현재 SHA-256 | 마지막 관측 mtime | 충돌 내용 |
|---|---|---|---|
| `src/shared/config/atlas/atlasEncoding.ts` | `9b849c88b78d95c607fe8c074019ed9f8b265518c73bde584476171539086cd4` | 16:58:00 | hit target·padding·glyph·state token 재정의 |
| `src/shared/lib/atlas/scaleProjection.ts` | `fe339f420c31fb7f59e52d90f308ed95fc8ddda530feb9e85e2f404024c151ef` | 16:50:27 | padded isotropic scaler로 변경 |
| `src/shared/lib/atlas/atlasNodeNavigation.ts` | `ee02d930df530e90773ccf4ab5bd0654fabb9ea0a98d7f7a3d348af071f5fca3` | 16:51:16 | nearest-direction에서 angular ranking으로 변경 |
| `src/widgets/atlas-explorer/AtlasNodeGlyph.tsx` | `59b4c424ec2103a11e1cb85d3a3d7baeea9e73bc824c8f2499911f14f9c8084e` | 16:51:54 | 새 encoding/state model 소비 |
| `src/widgets/atlas-explorer/AtlasScene.tsx` | `de30cebc1bba32406367b4b4cc81878fa75a78168e94b55d633fc7c4e7032ee5` | 16:54:48 | hit-testing/parity 구조와 기존 접근성 구현 중첩 |
| `tests/e2e/atlas-contract-shell.spec.ts` | `0f6afd22995be00311705a2edaedf93535bfdeece29333caee8e4c41e6b80da5` | 16:58:15 | 외부 E2E 시나리오 재작성 |

mtime는 작성 주체를 증명하지 않지만, freeze 이후 같은 핵심 파일이 재변경됐음을 증명한다.

### 6.2 계약 수준 충돌

#### C1. Hit-target 단일 기준 부재

Agent 4 구현은 mobile에서 visual node의 크기를 바꾸지 않고 stage 내부 유효 hit area와 local scroll width로 44×44를 확보했다.

외부 변경은 다음을 추가했다.

- `ATLAS_MINIMUM_HIT_TARGET_PX`
- 새로운 glyph/selection/focus offset token
- 별도 hit-testing helper

동시에 기존 `ATLAS_EFFECTIVE_HIT_RADIUS`를 제거했다. `AtlasScene.tsx`에는 제거된 상수 import가 남아 현재 typecheck가 실패한다.

판정: `CONTRADICTED`

#### C2. Projection scaler 계약 충돌

기존 test는 x/y domain을 viewport에 독립적으로 매핑하는 결과를 기대했다.

외부 변경은 다음을 도입했다.

- projection padding
- isotropic scale
- `contentRect`
- `scaleFactor`

따라서 기존 기대값 `{x: 20, y: 130}` 대신 `{x: 110, y: 90}`이 반환된다.

이 변경은 화면 비율 왜곡을 줄일 수 있으나 Agent 3의 immutable projection scaler 계약과 승인되지 않은 상태에서는 UI layer가 단독 확정할 수 없다.

판정: `BLOCKED`

#### C3. Spatial keyboard navigation 계약 충돌

Agent 4 초기 구현은 지정 방향의 Euclidean nearest candidate를 선택했다.

외부 변경은 angular deviation을 우선하는 ranking으로 교체했다. 동일 fixture에서 기대값 `right-near` 대신 `right-far`가 선택된다.

두 방식 모두 deterministic할 수 있지만 사용자 mental model이 다르므로 Decision Log 없이 test expectation만 바꿀 수 없다.

판정: `BLOCKED`

#### C4. Node state ownership 충돌

외부 `atlasEncoding.ts`와 `AtlasNodeGlyph.tsx`는 default/hover/focus/selected/dimmed 상태 token과 내부 mark를 확장했다. Agent 4의 DOM focus·selection synchronization과 결합될 때 다음을 다시 검증해야 한다.

- focus와 selected의 동시 식별
- SVG pointer와 DOM keyboard highlight parity
- forced-colors의 selected/focus 구분
- 44×44 hit area overlap
- ViewModel opacity와 UI dimmed opacity 충돌

판정: `PARTIALLY_CONFIRMED`

### 6.3 외부 신규 source

다음 파일은 freeze 이후 untracked source로 추가됐다.

- `src/shared/config/atlas/atlasEncoding.test.ts`
- `src/shared/lib/atlas/atlasNodeHitTesting.ts`
- `src/shared/lib/atlas/atlasNodeHitTesting.test.ts`
- `src/shared/lib/atlas/atlasNodeParity.ts`
- `src/shared/lib/atlas/atlasNodeParity.test.ts`

이들은 Atlas node target/parity 검증 방향과 관련 있지만 현재 commit에 포함되지 않았고 Agent 4의 baseline에는 없었다.

### 6.4 병렬 agent 충돌 증거

`outputs/story_atlas_node_field/20260723_162520_KST/CONCURRENT_SOURCE_DRIFT_REPORT.md`에서도 Agent 4의 변경을 해당 agent 관점의 외부 drift로 감지하고 중단했다.

즉, 최소 두 작업 흐름이 같은 Atlas file-set을 동시에 관찰·수정했으며 어느 한쪽의 최종 테스트 결과만으로 현재 tree를 승인할 수 없다.

## 7. Drift 이후 현재 실패

### 7.1 Typecheck

현재 의미 있는 첫 오류:

```text
AtlasScene.tsx imports removed ATLAS_EFFECTIVE_HIT_RADIUS
```

영향:

- Atlas build contract
- node hit target 계산
- production build readiness

판정: `BLOCKED`

### 7.2 Unit test

현재 의미 있는 실패:

1. node navigation: expected `right-near`, received `right-far`
2. projection scaler: expected `{x: 20, y: 130}`, received `{x: 110, y: 90}`

이는 단순 test typo가 아니라 navigation과 projection 의미 계약이 바뀐 결과다.

판정: `BLOCKED`

## 8. 파일 소유권 인계 지도

### 8.1 Agent 4 구현이 명확한 영역

- `src/app/router/RouteAccessibility.tsx`
- `src/shared/ui/accessibility/SkipLinks.tsx`
- `src/shared/lib/atlas/atlasAccessibility.ts`
- `src/shared/hooks/useReturnFocus.ts`
- `src/widgets/evidence-drawer/EvidenceDrawer.tsx`
- Story chapter의 semantic button/44px target 변경
- `src/pages/method/MethodPage.tsx`
- `src/pages/data/DataPage.tsx`
- global focus/forced-colors/reduced-motion CSS

### 8.2 반드시 merge 판단이 필요한 공유 영역

- `src/shared/config/atlas/atlasEncoding.ts`
- `src/shared/lib/atlas/scaleProjection.ts`
- `src/shared/lib/atlas/scaleProjection.test.ts`
- `src/shared/lib/atlas/atlasNodeNavigation.ts`
- `src/shared/lib/atlas/atlasNodeNavigation.test.ts`
- `src/widgets/atlas-explorer/AtlasDomMirror.tsx`
- `src/widgets/atlas-explorer/AtlasNodeGlyph.tsx`
- `src/widgets/atlas-explorer/AtlasScene.tsx`
- `src/widgets/atlas-explorer/AtlasExplorer.tsx`
- `src/widgets/atlas-explorer/AtlasExplorer.test.tsx`
- `tests/e2e/atlas-contract-shell.spec.ts`

### 8.3 외부 신규 영역

- `atlasNodeHitTesting.*`
- `atlasNodeParity.*`
- `atlasEncoding.test.ts`

## 9. 실행한 주요 명령

```text
git branch --show-current
git rev-parse HEAD
git status --porcelain=v1 -uall
git reflog --date=iso
sha256sum <Atlas/Evidence/CSS/test files>
npm run typecheck
npm run lint
npm run test
npm run build
./node_modules/.bin/playwright test --config=<WCAG fixture config>
./node_modules/.bin/playwright test --config=<production no-data config>
./node_modules/.bin/playwright test tests/e2e/technical-routing.spec.ts
agent-browser <route/geometry/accessibility verification>
```

브라우저 검증에서 console error, page error, unexpected request failure를 수집했고, 충돌 전 시나리오에서는 0건이었다.

## 10. 아직 검증하지 못한 항목

다음은 환경 또는 source drift 때문에 PASS를 선언하지 않는다.

- NVDA + Chrome 실제 transcript
- VoiceOver + Safari 실제 transcript
- 모바일 VoiceOver 또는 TalkBack 실제 transcript
- Windows High Contrast 실제 장치 결과
- 현재 혼합 worktree 기준 전체 Playwright/Axe 회귀
- current branch/HEAD 기준 production build
- approved frontend bundle 기준 실제 node density와 touch overlap
- EvidenceRepository 실제 approved content 기준 Drawer 장문 reflow

상태: `NOT_VERIFIABLE_ENVIRONMENT` 또는 `BLOCKED`

## 11. 복구 및 병합 순서

1. Atlas 관련 다른 agent 작업을 종료하고 branch·HEAD·worktree를 다시 freeze한다.
2. 다음 파일의 단일 owner를 지정한다.
   - `atlasEncoding.ts`
   - `scaleProjection.ts`
   - `atlasNodeNavigation.ts`
   - `AtlasNodeGlyph.tsx`
   - `AtlasScene.tsx`
   - Atlas E2E spec
3. Hit target의 단일 기준을 선택한다.
   - config token 기반 hit testing
   - stage minimum-width/local scroll 기반
   - 또는 두 방식의 명시적 역할 분리
4. Agent 3과 projection scaler를 확정한다.
   - 독립 x/y mapping
   - padded isotropic mapping
5. spatial keyboard navigation rule을 Decision Log로 확정한다.
   - Euclidean nearest-in-direction
   - angular deviation priority
6. DOM navigator가 interaction의 단일 accessibility owner라는 계약을 유지한다.
7. Agent 4의 route/skip-link/Drawer/focus/semantic 변경을 선택적으로 보존한다.
8. 구현과 test expectation을 같은 commit에서 정합화한다.
9. 전체 QA를 처음부터 다시 실행한다.
10. 새 output SHA-256 manifest와 독립 QA용 보고서를 생성한다.

## 12. Gate Decision

현재 증거로 유지 가능한 구현 상태:

```text
SEMANTIC_STRUCTURE_IMPLEMENTED
ENHANCED_FOCUS_SYSTEM_IMPLEMENTED
KEYBOARD_INTERACTION_IMPLEMENTED_AT_PRE_DRIFT_BASELINE
TOUCH_TARGET_IMPLEMENTED_AT_PRE_DRIFT_BASELINE
DRAWER_FOCUS_LIFECYCLE_IMPLEMENTED_AT_PRE_DRIFT_BASELINE
REDUCED_MOTION_IMPLEMENTED_AT_PRE_DRIFT_BASELINE
FORCED_COLORS_IMPLEMENTED_AT_PRE_DRIFT_BASELINE
```

현재 선언할 수 없는 상태:

```text
ACCESSIBILITY_INTERACTION_IMPLEMENTATION_READY_FOR_INDEPENDENT_QA
WCAG22_AA_CONFORMANCE_CERTIFIED
ACCESSIBILITY_PASS
VISUAL_QA_PASS
ATLAS_RENDER_PASS
P3_FINAL_CUTOVER_PASS
```

최종 local verdict:

```text
CONCURRENT_SOURCE_DRIFT_BLOCKED
```

## 13. 참고 기준

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA APG Dialog Modal Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [WAI-ARIA APG Keyboard Interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)

## 14. 변경 범위 고지

이 인계 요청에서는 source code를 추가로 수정하지 않았다. 생성한 파일은 본 Markdown 보고서 한 개다.
