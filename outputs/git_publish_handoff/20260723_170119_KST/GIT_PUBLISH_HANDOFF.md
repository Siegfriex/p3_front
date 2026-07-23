# P3 Frontend Git Publish and Parallel-Work Handoff

## 0. Document Identity

- 작성 시각: 2026-07-23 17:01:19 KST
- 로컬 저장소: `/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front`
- 원격 저장소: `https://github.com/Siegfriex/p3_front.git`
- 원격 기준 브랜치: `main`
- 기준 HEAD: `6f4835292abe9bc0cbbed81469b21c25c4e95777`
- 새 브랜치: `agent/frontend-routing-atlas-foundation-20260723`
- 게시 커밋: `3e5bbd70a0757f3a34f4d8bd07b666bbab133bb3`
- 커밋 제목: `feat: establish routing and Atlas experience foundation`
- 원격 브랜치: `https://github.com/Siegfriex/p3_front/tree/agent/frontend-routing-atlas-foundation-20260723`
- 원격 커밋: `https://github.com/Siegfriex/p3_front/commit/3e5bbd70a0757f3a34f4d8bd07b666bbab133bb3`

## 1. Executive Summary

프론트엔드의 Routing Foundation, route-driven modal, Atlas contract shell, REDLINE interaction/accessibility 보정, QA toolchain과 SSOT 사본을 하나의 재현 가능한 snapshot으로 고정해 새 원격 브랜치에 push했다.

병렬 에이전트가 같은 worktree에서 계속 파일을 갱신하고 있었기 때문에 `git add -A`를 사용하지 않았다. 앱 소스·설정·테스트·lockfile·SSOT만 명시적으로 stage했고, 대형 `outputs/`, 개인 prompt, 13MB 디자인 원본은 제외했다. stage 이후 새로 생긴 병렬 변경은 매번 unstaged 상태로 식별한 뒤 해당 에이전트의 수정이 안정될 때까지 기다리고, 내용을 검토하고, 관련 QA를 다시 실행한 후에만 stage했다.

게시 시점에는 local HEAD, upstream과 원격 ref가 모두 `3e5bbd70a0757f3a34f4d8bd07b666bbab133bb3`으로 일치했다. 실제 Git merge conflict나 파일 유실은 없었다.

단, push 이후에도 병렬 개발은 계속됐다. 17:01 KST 현재 커밋 이후의 로컬 변경은 23개 tracked 파일 `+530/-125`와 신규 Atlas 유틸/테스트 5개이며, 모두 unstaged·uncommitted·unpublished 상태로 안전하게 남아 있다.

## 2. 수행한 Git 작업

### 2.1 시작 상태 확인

다음을 확인했다.

- Git root와 현재 branch/HEAD
- `git status -sb`
- tracked, staged, untracked 변경
- origin fetch/push URL
- 원격 branch 목록
- package-lock 및 Agent 산출물 상태
- 파일별 최종 수정 시각
- 병렬 에이전트가 실제로 소스를 갱신 중인지 여부

확인 당시 상태:

- 기존 branch: `refactor/routing-technical-foundation`
- 기존 HEAD: `6f4835292abe9bc0cbbed81469b21c25c4e95777`
- origin에는 `main`만 존재
- local worktree에는 routing, Atlas, design/accessibility, test와 audit output이 혼재
- staged 파일은 0개

### 2.2 새 branch 생성

다음 새 branch를 생성했다.

```text
agent/frontend-routing-atlas-foundation-20260723
```

기존 dirty worktree 파일을 reset, restore, checkout 또는 stash하지 않고 동일 working state를 새 branch로 이동했다.

### 2.3 명시적 staging

다음 범위만 명시적으로 stage했다.

- `.gitignore`, `.nvmrc`
- `package.json`, `package-lock.json`
- ESLint, Vitest, Playwright, Vite, TypeScript 설정
- `index.html`, `public/favicon.svg`
- `SSOT/` Markdown 및 provenance JSON
- `src/` 전체 현재 구현
- `tests/` routing, Atlas contract, Atlas experience E2E
- 기존 `OverlayProvider.tsx` 삭제

최종 commit 범위:

```text
115 files changed
13,358 insertions
773 deletions
```

### 2.4 의도적으로 제외한 파일

다음은 stage·commit·push하지 않았다.

| 경로 | 제외 이유 | 현재 상태 |
|---|---|---|
| `outputs/` | audit, screenshot, trace, generated QA 결과가 대량 포함됨 | untracked, 보존 |
| `docs/prompt1.md` | 구현 파일이 아닌 작업 prompt | untracked, 보존 |
| `design/Untitled.png` | 약 13MB 사용자 제공 디자인 참조 원본이며 runtime import 없음 | untracked, 보존 |

제외 파일은 삭제하거나 이동하지 않았다.

### 2.5 Commit과 push

생성한 commit:

```text
3e5bbd70a0757f3a34f4d8bd07b666bbab133bb3
feat: establish routing and Atlas experience foundation
```

다음 원격 branch로 tracking 설정과 함께 push했다.

```text
origin/agent/frontend-routing-atlas-foundation-20260723
```

push 후 `git ls-remote`, local HEAD와 upstream SHA를 대조해 세 값이 모두 동일함을 확인했다.

PR은 생성하지 않았다. 이번 요청 범위는 새 branch 생성, commit, 원격 push까지였다.

## 3. Commit에 포함된 주요 구현

### 3.1 Routing Foundation

- BrowserRouter 기반 URL routing
- `/`, `/method`, `/data`, `/about`
- `/evidence/:evidenceId`, `/case/:caseId`
- development-only `/dev/foundations`
- wildcard 404
- Story chapter hash navigation과 restoration
- route title과 skip-link 접근성
- direct detail page와 background-location Drawer

### 3.2 Overlay and Accessibility

- single portal root
- Dialog, Drawer, BottomSheet primitives
- focus trap과 focus return
- body scroll lock
- Escape, backdrop와 history close
- `aria-modal`, label/description 연결
- mobile Drawer와 tab-row keyboard behavior

### 3.3 Atlas Contract Shell

- lazy `/atlas` route
- transport schema와 ViewModel 분리
- approved manifest loader와 fail-closed no-data state
- production mock/legacy fallback 금지
- URL query parser와 reset/history 계약
- SVG Atlas renderer
- DOM mirror와 live region
- keyboard node navigation
- Atlas filter, inspector, metadata, legend, unavailable shell
- Story Answers의 no-data handoff와 `/atlas` CTA

### 3.4 Design and Responsive Foundation

- REDLINE design tokens와 layout primitives
- Atlas stage, section header, glyph와 data states
- Story/Footer/ProgressTracker 범위와 hit-area 보정
- horizontal scroll region 접근성
- mobile/desktop responsive layout
- WCAG 전용 Playwright config

### 3.5 QA Toolchain

- 실제 ESLint script와 zero-warning contract
- Vitest/jsdom/Testing Library
- Playwright Chromium E2E
- Axe critical/serious 검사
- Node/npm metadata와 공식 package-lock

## 4. 병렬 작업 충돌과 대응 타임라인

이번 작업에서 Git merge conflict는 발생하지 않았다. 아래 항목은 같은 worktree를 여러 에이전트가 동시에 수정하면서 발생한 시간적·범위적 충돌이다.

### C1. Stage 직전 파일이 계속 갱신됨

- `16:21~16:26 KST` 사이 `Dialog.tsx`, `EvidenceDrawer.tsx`, Atlas component와 E2E 파일의 mtime이 계속 변경됐다.
- 즉시 stage하지 않고 15~25초 단위로 변경 시각과 파일 콘텐츠를 다시 확인했다.
- 변경이 잠시 안정된 구간에서만 snapshot을 stage했다.

결과: 병렬 에이전트가 작성 중인 중간 상태를 commit하지 않았다.

### C2. 첫 staging 이후 새 병렬 변경 발생

첫 stage 이후 다음 파일이 `AM` 또는 `MM` 상태로 나타났다.

- `AtlasDomMirror.tsx`
- `AtlasExplorer.test.tsx`
- `EvidenceDrawer.tsx`
- `atlas-contract-shell.spec.ts`
- 신규 `atlasNodeNavigation.test.ts`

기존 index는 유지하고 새 변경을 unstaged로 분리해 검토했다. 해당 변경이 안정된 뒤 관련 파일만 다시 stage했다.

결과: 기존 staged snapshot도 보존하고 최신 병렬 변경도 유실하지 않았다.

### C3. Unit test의 접근성 이름 계약 불일치

첫 `qa:foundation` 실행에서 다음 1건이 실패했다.

```text
AtlasExplorer.test.tsx
expected accessible name: 정보 부재·비직접 계열 + 계약 검증 주제
actual accessible name: 정보 부재·비직접 계열, 추진중, A1
```

실제 DOM mirror의 accessible name 계약이 변경됐지만 test regex가 이전 topic-label 계약을 기대한 상태였다.

임의로 assertion을 삭제하거나 소스를 수정하지 않았다. 병렬 에이전트가 접근성 이름 expectation, roving tabindex, spatial keyboard navigation과 관련 unit/E2E를 갱신한 것을 확인한 뒤 targeted test를 재실행했다.

```text
2 test files passed
5 tests passed
```

### C4. 방향키 navigation 변경이 stage 이후 추가됨

`atlasNodeNavigation.ts`가 stage 이후 다시 변경됐다.

- 단순 좌/우/상/하 부호 판정
- 주 이동축이 교차축보다 큰 후보만 인정하는 방향 판정

동시에 Home/End와 nearest-node navigation test가 추가됐다. 이를 별도 diff로 검토하고 unit test가 통과한 뒤 다시 stage했다.

### C5. Fixture Playwright server 실행 충돌

명시적 fixture E2E 첫 실행은 코드 실패가 아니라 sandbox localhost 제한으로 중단됐다.

```text
listen EPERM: operation not permitted 0.0.0.0:3000
```

이후 승인된 비-sandbox 실행을 사용했다. `VITE_ATLAS_*`만 전달한 실행에서는 fixture test 활성화 플래그가 없어 3건이 skip됐다.

다음 실행에서는 `ATLAS_CONTRACT_FIXTURE_E2E=true`를 추가했으나 기본 webServer 환경에서 fixture provenance가 노출되지 않아 3건이 실패했다. assertion을 변경하지 않고, 기존 Agent 4의 격리 config를 사용했다.

```text
port: 3003
reuseExistingServer: false
VITE_ATLAS_RELEASE_ID: contract-release-001
VITE_ATLAS_FIXTURE_PROVENANCE: CONTRACT_FIXTURE
ATLAS_CONTRACT_FIXTURE_E2E: true
```

최종 결과:

```text
3 fixture tests passed
2 production-only tests skipped
```

### C6. Commit 직전 추가 WCAG 작업 발생

최종 검토 직전에 다음 변경이 다시 unstaged로 등장했다.

- `AtlasScene.tsx` scroll-region 접근성
- `layout.css` minimum SVG width와 contained horizontal scrolling
- Atlas hit-area overlap, 320/375/768/1440/1920 viewport 검사
- forced-colors, reduced-motion, text-spacing, 400% zoom 검사
- `playwright.wcag.config.ts`

파일을 검토하고 stage한 뒤 `qa:foundation` 전체를 다시 실행했다.

### C7. Push 이후 병렬 작업 재개

push 직후 `atlas-contract-shell.spec.ts`가 다시 수정됐고, 17:01 KST에는 후속 변경이 더 확대됐다.

중요:

- 원격 commit을 amend하지 않았다.
- force push하지 않았다.
- 후속 변경을 restore/reset하지 않았다.
- 후속 변경은 모두 local unstaged 상태로 보존했다.

## 5. Commit Snapshot QA 결과

최종 commit에 들어간 snapshot은 다음 검증을 통과했다.

| Gate | 결과 | 세부 |
|---|---|---|
| staged diff check | PASS | whitespace error 없음 |
| excluded-path scan | PASS | `outputs/`, prompt, design 원본 미포함 |
| secret-pattern scan | PASS | 대표적인 key/private-key/password 패턴 없음 |
| typecheck | PASS | `tsc --noEmit` |
| ESLint | PASS | zero warnings |
| Vitest | PASS | 11 files, 27 tests |
| production build | PASS | Vite 2,166 modules |
| default Playwright | PASS | 15 passed, 3 fixture-only skipped |
| explicit Atlas fixture | PASS | 3 passed, 2 production-only skipped |
| Axe | PASS | covered route/fixture critical·serious 0 |

최종 build 크기:

| Asset | Raw | Gzip |
|---|---:|---:|
| CSS | 80.52 kB | 15.22 kB |
| Atlas lazy chunk | 39.55 kB | 12.17 kB |
| main JS | 475.88 kB | 148.50 kB |

## 6. 원격에 고정된 상태

원격 branch가 가리키는 snapshot은 다음과 같다.

```text
branch: agent/frontend-routing-atlas-foundation-20260723
commit: 3e5bbd70a0757f3a34f4d8bd07b666bbab133bb3
subject: feat: establish routing and Atlas experience foundation
```

검증 당시 다음 값이 모두 동일했다.

- `git rev-parse HEAD`
- `git rev-parse @{upstream}`
- `git ls-remote --heads origin agent/frontend-routing-atlas-foundation-20260723`

## 7. 17:01 KST 현재 Commit 이후 로컬 변경

다음 변경은 `3e5bbd70`에 포함되지 않았고 원격에도 올라가지 않았다.

### 7.1 Modified tracked files

```text
src/app/styles/layout.css
src/pages/data/DataPage.tsx
src/pages/method/MethodPage.tsx
src/shared/config/atlas/atlasEncoding.ts
src/shared/hooks/useReturnFocus.ts
src/shared/lib/atlas/atlasNodeNavigation.test.ts
src/shared/lib/atlas/atlasNodeNavigation.ts
src/shared/lib/atlas/scaleProjection.test.ts
src/shared/lib/atlas/scaleProjection.ts
src/widgets/atlas-explorer/AtlasDomMirror.tsx
src/widgets/atlas-explorer/AtlasExplorer.test.tsx
src/widgets/atlas-explorer/AtlasExplorer.tsx
src/widgets/atlas-explorer/AtlasNodeGlyph.tsx
src/widgets/atlas-explorer/AtlasScene.tsx
src/widgets/case-sequence/ChapterCases.tsx
src/widgets/evidence-chain-scene/ChapterRecord.tsx
src/widgets/evidence-drawer/EvidenceDrawer.tsx
src/widgets/gap-scene/ChapterGap.tsx
src/widgets/prologue-scene/ChapterPrologue.tsx
src/widgets/remains-scene/ChapterRemains.tsx
src/widgets/scale-scene/ChapterScale.tsx
tests/e2e/atlas-contract-shell.spec.ts
tests/e2e/technical-routing.spec.ts
```

Tracked diff 규모:

```text
23 files changed
530 insertions
125 deletions
```

### 7.2 New source/test files

```text
src/shared/config/atlas/atlasEncoding.test.ts
src/shared/lib/atlas/atlasNodeHitTesting.test.ts
src/shared/lib/atlas/atlasNodeHitTesting.ts
src/shared/lib/atlas/atlasNodeParity.test.ts
src/shared/lib/atlas/atlasNodeParity.ts
```

### 7.3 Existing untracked non-product files

```text
design/
docs/prompt1.md
outputs/
```

이 보고서 역시 `outputs/` 아래에 생성되므로 자동으로 원격 commit에 포함되지 않는다.

## 8. 충돌 위험 매트릭스

| 위험 | 현 상태 | 이미 취한 조치 | 후속 원칙 |
|---|---|---|---|
| 동일 파일 동시 수정 | 실제 발생 | stage 전후 `git diff`로 신규 변경 분리 | 다른 에이전트 종료 전 `git add -A` 금지 |
| 중간 작업 snapshot commit | 회피 | 변경 안정 구간 확인 | mtime보다 content diff와 QA를 우선 |
| routing/Atlas 범위 혼합 | 의도적으로 하나의 snapshot으로 게시 | 제품 파일만 명시 stage | 후속 변경은 별도 commit 권장 |
| output 대량 유입 | 회피 | `outputs/` 전체 제외 | 별도 artifact 정책 결정 전 추적 금지 |
| 디자인 원본 대용량 blob | 회피 | `design/Untitled.png` 제외 | 별도 Git LFS/asset 결정 필요 |
| stale unit/E2E assertion | 발생 후 해결 | 병렬 수정 확인 및 전체 QA 재실행 | assertion 삭제·완화 금지 |
| sandbox local socket | 발생 | 격리 port와 승인된 실행 사용 | application failure로 오분류 금지 |
| fixture env 오구성 | 발생 후 해결 | explicit flag + isolated config | production/no-fixture와 fixture suite 분리 |
| push 후 새 로컬 변경 | 현재 존재 | unstaged 보존 | amend/force-push 금지 |

## 9. 후속 에이전트 지시

1. `git reset --hard`, `git restore`, `git checkout --`, `git stash`를 실행하지 않는다.
2. `3e5bbd70`을 안전한 원격 복구점으로 취급한다.
3. 현재 23개 modified 파일과 신규 5개 Atlas 파일은 병렬 에이전트의 후속 작업이다. 소유자를 확인하기 전 삭제·복원하지 않는다.
4. 후속 commit이 필요하면 먼저 `git status -sb`, `git diff --name-status`, 신규 파일 목록을 다시 캡처한다.
5. 후속 변경은 `3e5bbd70`을 amend하지 않고 별도 commit으로 만든다.
6. stage는 명시적 경로만 사용한다. `git add -A` 또는 `git add .`를 사용하지 않는다.
7. stage 이후 `git diff --name-status`에 동일 파일이 다시 나타나면 병렬 수정이 발생한 것이므로 commit을 멈춘다.
8. 다음 QA를 모두 재실행한다.

```text
npm run typecheck
npm run lint
npm run test
npm run build
npm run test:e2e
```

9. fixture-only Atlas E2E는 test process의 `ATLAS_CONTRACT_FIXTURE_E2E=true`와 webServer의 `VITE_ATLAS_*` 환경을 분리하지 않는다.
10. `outputs/`, `design/Untitled.png`, `docs/prompt1.md`는 별도 승인 없이는 commit하지 않는다.

## 10. 최종 판정

```text
NEW_BRANCH_CREATED=PASS
INTENTIONAL_STAGING=PASS
PARALLEL_CHANGE_PRESERVATION=PASS
COMMIT_CREATED=PASS
REMOTE_PUSH=PASS
REMOTE_SHA_MATCH=PASS
COMMIT_SNAPSHOT_QA=PASS
POST_PUSH_LOCAL_CHANGES_PRESERVED=PASS
PR_CREATED=NO_NOT_REQUESTED
```

원격 branch와 commit은 안전하게 고정됐다. 이후 로컬 개발은 계속 진행됐으며, 그 변경은 원격 snapshot과 분리된 상태다.
