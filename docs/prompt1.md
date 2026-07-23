# P3_CULTURE — LOCAL RUNTIME REPRODUCIBILITY RECOVERY

당신은 Senior Frontend Build Engineer이자
Local Runtime Recovery Auditor다.

현재 저장소는 정적 코드 감사는 완료되었으나,
project-local dependency와 lockfile이 없어
typecheck, build, dev server, browser screenshot을 재현하지 못하는 상태다.

이번 작업의 목적은 다음 두 가지뿐이다.

1. 승인 가능한 방식으로 재현 가능한 project-local dependency 상태를 구축한다.
2. 현재 소스 코드를 수정하지 않고 앱을 실행하여 실제 런타임 증거를 수집한다.

ChapterScale 또는 다른 UI를 개발하지 않는다.
Prologue 디자인을 수정하지 않는다.

현재 알려진 저장소:

Repository:
`/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front`

Expected branch:
`main`

Expected baseline HEAD:
`6f4835292abe9bc0cbbed81469b21c25c4e95777`

────────────────────────────────────
0. 절대 제한
────────────────────────────────────

금지:

- ChapterPrologue 수정
- ChapterScale 수정
- 다른 chapter 수정
- CSS 또는 token 수정
- dependency version 임의 upgrade
- npm audit fix
- package major version 변경
- Vite config 우회 수정
- Tailwind 제거
- 상위 디렉터리 node_modules 사용
- 실패를 숨기기 위한 script 변경
- TypeScript strictness 완화
- lint/type 오류 무시
- screenshot을 위한 임시 UI 삽입
- 기존 mock data 수정
- 기존 docs Gate를 PASS로 변경
- commit 또는 push
- 감사 산출물 삭제

허용:

- Git과 package metadata 조사
- 과거 Git history에서 lockfile 탐색
- remote ref 안에서 과거 lockfile 탐색
- project-local lockfile 생성
- project-local node_modules 생성
- packageManager metadata 추가 제안
- typecheck, build, dev 실행
- 브라우저 캡처
- runtime audit 파일 생성

package.json 변경은 아래 조건에서만 허용한다.

- packageManager 필드 추가
- 명백히 잘못된 package metadata 보완

script, dependency version, source code는 변경하지 않는다.

package.json을 변경했다면 별도 diff와 이유를 보고하며
커밋하지 않는다.

────────────────────────────────────
1. 시작 상태 재확인
────────────────────────────────────

실행:

git status --short --branch
git rev-parse HEAD
git diff --name-status
git ls-files --others --exclude-standard

기준 HEAD가 예상값과 다르면 작업을 중지하지는 말되
BASELINE_MISMATCH로 보고한다.

기존 `outputs/`는 보존한다.

────────────────────────────────────
2. 승인 가능한 lockfile 탐색
────────────────────────────────────

먼저 기존 lockfile을 복구할 수 있는지 조사한다.

확인:

- 현재 repository 전체
- Git history
- 모든 local refs
- remote refs
- 바로 이전 commit
- AI Studio export 또는 동일 앱의 인접 디렉터리
- package.json과 동일한 name/version/dependency 조합인지

명령 예시:

git log --all -- package-lock.json
git log --all -- pnpm-lock.yaml
git log --all -- yarn.lock
git ls-tree -r <commit> --name-only
find .. -maxdepth 3 \( -name package-lock.json -o -name pnpm-lock.yaml -o -name yarn.lock \)

인접 디렉터리의 lockfile은
package.json dependency가 동일한 경우에만 후보로 기록한다.

승인 우선순위:

1. 동일 repository의 과거 lockfile
2. 동일 package.json hash의 export lockfile
3. 현재 package.json으로 새 package-lock 생성

다른 프로젝트의 lockfile을 그대로 복사하지 않는다.

────────────────────────────────────
3. package manager 결정
────────────────────────────────────

현재 로컬에서 사용할 수 있는 npm을 기본 후보로 한다.

다음 근거를 확인한다.

- npm script 사용
- 기존 lockfile 유형
- packageManager field
- repository documentation
- deployment configuration

pnpm 또는 yarn의 명확한 근거가 없으면 npm을 선택한다.

최종 판정:

PACKAGE_MANAGER = npm | pnpm | yarn
DECISION_EVIDENCE = ...

npm을 선택한 경우 권장 metadata:

`"packageManager": "npm@10.8.2"`

단, package.json 변경 전후 diff를 남긴다.

────────────────────────────────────
4. lockfile 구축
────────────────────────────────────

A. 승인 가능한 과거 lockfile이 있으면:

- 해당 파일만 현재 worktree에 복원
- package.json과의 dependency mismatch 검사
- mismatch가 있으면 설치하지 말고 보고

B. lockfile이 전혀 없으면:

현재 package.json을 기준으로 project-local lockfile을 생성한다.

우선:

npm install --package-lock-only --ignore-scripts

그 후 기록:

- package-lock version
- resolved React
- ReactDOM
- TypeScript
- Vite
- Tailwind
- @tailwindcss/vite
- motion
- transitive package count
- engine warnings
- peer dependency warnings

package.json에 선언된 semver 범위를 넘는 버전을 허용하지 않는다.

새 lockfile 생성 전후의 package.json hash와 diff를 기록한다.

────────────────────────────────────
5. project-local dependency 설치
────────────────────────────────────

유효한 package-lock이 준비되면:

npm ci

조건:

- repository root에서 실행
- project-local node_modules 생성
- 상위 디렉터리 node_modules에 의존하지 않음
- install script 오류를 숨기지 않음
- npm audit fix 실행 금지

확인:

npm root
npm exec -- tsc --version
npm exec -- vite --version
npm ls --depth=0

`npm root`가 현재 repository 아래가 아니면 FAIL 처리한다.

────────────────────────────────────
6. ancestor dependency 오염 검사
────────────────────────────────────

현재 문제는 상위 경로의 Vite가 잘못 실행된 정황이 있다.

다음을 확인한다.

which vite
npm exec -- which vite
node -p "require.resolve('vite/package.json')"
node -p "require.resolve('@tailwindcss/vite/package.json')"
node -p "require.resolve('typescript/package.json')"

모든 resolved path가 현재 repository의
`node_modules` 아래인지 확인한다.

상위 `/home/sieg/projects-wsl/SBS_dataScience/node_modules`
경로가 사용되면 실패로 판정한다.

전역 또는 상위 node_modules를 삭제하지 않는다.

────────────────────────────────────
7. 정적 검증
────────────────────────────────────

정확히 실행:

npm run lint
npm run build

현재 `lint` script가 `tsc --noEmit`임을 명시한다.
ESLint와 혼동하지 않는다.

각 명령마다 기록:

- command
- start/end
- exit code
- stdout
- stderr
- warning
- generated files
- Git diff

실패 시 소스 수정 금지.
오류를 유형별로 보고한다.

- dependency
- TypeScript
- Vite
- Tailwind
- filesystem
- application source

────────────────────────────────────
8. dev server 실행
────────────────────────────────────

build가 통과한 경우에만 실행한다.

npm run dev

확인:

- 실제 bound URL
- port 3000
- HTTP status
- initial HTML response
- console output
- failed requests

dev server는 감사 세션 동안만 유지하고
종료 시 정상적으로 정리한다.

────────────────────────────────────
9. 브라우저 런타임 검증
────────────────────────────────────

기존 `agent-browser`를 사용한다.
새 브라우저 도구를 설치하지 않는다.

필수 viewport:

375 × 812
768 × 1024
1440 × 1000
1920 × 1080

필수 화면:

1. Prologue default
2. Prologue lower state
3. Prologue→Scale boundary
4. Scale default
5. Method view
6. FoundationGallery exposure
7. Gap
8. Answers
9. Evidence drawer open
10. Mobile Prologue
11. Mobile drawer
12. reduced-motion Prologue
13. presentation-mode Prologue
14. full landing page

캡처 파일:

runtime_375_prologue.png
runtime_768_prologue.png
runtime_1440_prologue.png
runtime_1920_prologue.png
runtime_1440_prologue_lower.png
runtime_1440_prologue_scale_boundary.png
runtime_1440_scale.png
runtime_1440_method.png
runtime_1440_foundation_gallery.png
runtime_1440_gap.png
runtime_1440_answers.png
runtime_1440_drawer.png
runtime_375_drawer.png
runtime_1440_reduced_motion.png
runtime_1440_presentation.png
runtime_1440_fullpage.png

스크린샷을 재구성하거나
과거 이미지를 런타임 증거로 제출하지 않는다.

────────────────────────────────────
10. 브라우저 검증 항목
────────────────────────────────────

각 viewport에서 확인:

- HeaderNav 렌더링
- HeaderNav sticky
- mobile nav 존재 또는 부재
- FooterRail overlap
- horizontal overflow
- Prologue headline wrapping
- 실제 12-column appearance
- 모바일 4-column 주장
- Evidence Line 위치
- Evidence Line clipping
- Prologue handoff endpoint
- Scale receiver 부재 여부
- EditorialImageField pending 상태
- ASSET_PENDING production 노출
- FoundationGallery production 노출
- reduced-motion 실제 동작
- presentation mode 실제 동작
- drawer ESC
- drawer focus
- body scroll
- console error
- console warning
- failed network requests

측정 가능한 경우:

- documentElement.scrollWidth
- documentElement.clientWidth
- relevant boundingClientRect
- header height
- Evidence endpoint coordinates
- Scale first visual anchor coordinates

Prologue endpoint와 Scale 시작점 사이의
pixel delta를 viewport별로 계산하라.

────────────────────────────────────
11. 소스 수정 금지 상태에서 판정
────────────────────────────────────

이번 작업에서 UI 문제를 발견해도 수정하지 않는다.

각 문제를 다음으로 분류한다.

RUNTIME_BLOCKER
VISUAL_BLOCKER
RESPONSIVE_DEFECT
ACCESSIBILITY_DEFECT
CONTENT_RISK
ARCHITECTURE_DEBT
NON_BLOCKING

────────────────────────────────────
12. 산출물
────────────────────────────────────

출력 위치:

outputs/runtime_recovery/<YYYYMMDD_HHMMSS>/

필수:

RUNTIME_RECOVERY_REPORT.md
RUNTIME_RECOVERY_REPORT.json
DEPENDENCY_RESOLUTION.csv
COMMAND_LOG.txt
BROWSER_VERIFICATION.csv
SCREENSHOT_INDEX.md
screenshots/

package.json 또는 lockfile을 변경했다면:

PACKAGE_METADATA_DIFF.patch
PACKAGE_LOCK_SUMMARY.md

────────────────────────────────────
13. 최종 판정
────────────────────────────────────

아래 중 복수 판정한다.

RUNTIME_REPRODUCIBLE
LOCKFILE_CREATED
DEPENDENCY_INSTALL_PASS
TYPECHECK_PASS
BUILD_PASS
DEV_SERVER_PASS
BROWSER_EVIDENCE_COMPLETE
PROLOGUE_RUNTIME_QA_PASS
PROLOGUE_RUNTIME_QA_FAIL
PROLOGUE_SCALE_HANDOFF_FAIL
FOUNDATION_GALLERY_EXPOSURE_CONFIRMED
BLOCKED_BY_DEPENDENCY
BLOCKED_BY_SOURCE_ERROR
BLOCKED_BY_FILESYSTEM

`PROLOGUE_RUNTIME_QA_PASS`는
필수 viewport와 reduced-motion·presentation mode가
모두 검증된 경우에만 허용한다.

────────────────────────────────────
14. 작업 종료 시 Git 상태
────────────────────────────────────

실행:

git status --short --branch
git diff --name-status
git diff -- package.json
git diff -- package-lock.json
git ls-files --others --exclude-standard

변경을 자동 커밋하거나 복원하지 않는다.

application source 변경이 발생했다면
Critical finding으로 보고한다.

────────────────────────────────────
15. 채팅 보고 형식
────────────────────────────────────

[RUNTIME RECOVERY COMPLETE]

Repository:
Branch / HEAD:
Package Manager:
Lockfile:
Local node_modules:

Typecheck:
Build:
Dev Server:
Browser Evidence:

Prologue Runtime:
Scale Runtime:
Handoff:
FoundationGallery:
Mobile:
Reduced Motion:
Presentation Mode:
Drawer:

Modified Files:
- package metadata
- lockfile
- application source
- generated outputs

Critical Findings:
1.
2.
3.

Artifacts:
- report
- JSON
- dependency CSV
- browser CSV
- screenshots

Recommended Next Action:
한 단계만 제시

코드 디자인 수정 없이 종료하라.

Final Gate:

LOCAL_RUNTIME_RECOVERY_COMPLETE