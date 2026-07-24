# P3_CULTURE Technical Routing Gate

## Audit identity

- Canonical app: `/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front`
- Branch: `refactor/routing-technical-foundation`
- Base HEAD: `6f4835292abe9bc0cbbed81469b21c25c4e95777`
- Started: `2026-07-23T13:12:39+09:00` (`2026-07-23T04:12:39Z`)
- Evidence bundle: `/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front/outputs/technical_routing_gate/20260723_133340`
- Final verdict: `TECHNICAL_ROUTING_GATE_PASS`, `DESIGN_REENTRY_READY`

## Repository and lock ownership

`p3_front` is a nested Git repository inside parent repository `/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE`. A clean tracked-source start was confirmed before creating the work branch. `package-lock.json` is now synchronized with `package.json`, is located in `p3_front`, and is not ignored; it remains untracked pending the review/commit step. Historical `outputs/` content was preserved and remains untracked and not ignored. No commit or push was performed.

## Implemented foundation

- BrowserRouter now owns public navigation; the former `useState` view switch and `OverlayProvider` monolith were removed.
- Public routes: `/`, `/method`, `/data`, `/about`, `/evidence/:evidenceId`, `/case/:caseId`, and wildcard 404.
- `/dev/foundations` renders only in Vite development. Production preview returns the application 404 state.
- Story chapter hashes support direct entry for `prologue`, `scale`, `record`, `gap`, `answers`, `cases`, and `remains` with the 56px sticky-header offset.
- Evidence/Case navigation uses React Router background-location state: Story click opens a route-driven Drawer; direct URL renders a full detail page.
- Drawer uses a portal, modal semantics, focus trap, initial focus, focus return, Escape, backdrop policy, body-scroll lock, root isolation, browser-back close, and mobile sheet behavior.
- Presentation and reduced-motion preferences are isolated in a shared provider. Chapter observer state remains Story-scoped.
- `pages/widgets/shared → app` reverse imports and relative imports climbing three or more levels are both zero.
- FoundationGallery was removed from Method and is reachable only through the guarded development route.

## Toolchain

| Item | Verified value |
|---|---|
| Node | 20.20.1 |
| npm | 10.8.2 |
| React | 19.2.8 |
| React Router | 7.18.1 |
| Vite | 6.4.3 |
| TypeScript | 5.8.3 |
| ESLint | 10.7.0 |
| Vitest | 4.1.10 |
| Playwright | 1.61.1 |
| Axe Playwright | 4.12.1 |

## Final execution evidence

Final `npm run qa:foundation` completed with exit code 0:

- Typecheck: PASS
- ESLint (`--max-warnings=0`): PASS
- Vitest: 3 files, 7 tests PASS
- Production build: PASS, 2,132 modules transformed
- Playwright: 7 scenarios PASS in Chromium
- Axe: zero critical or serious violations across Story, Method, Data, About, direct Evidence, 404, and route-modal Drawer
- Console errors: zero in automated scenarios and the final browser inspection
- Application request failures: zero in automated scenarios
- Undefined CSS variables: zero (`108` definitions, `81` distinct usages)

Both the development server on port 3000 and the production preview server on port 4173 were started. Production preview deep links rendered successfully. Production `/dev/foundations` returned `{notFound:true, foundations:false}`; development returned the Foundation Gallery.

## Gate verdicts

| Gate | Verdict | Evidence |
|---|---|---|
| PACKAGE_LOCK_TRACKABLE | PASS | synchronized lockfile, project-local, not ignored |
| TYPECHECK_PASS | PASS | final qa chain |
| ESLINT_PASS | PASS | final qa chain, zero warnings allowed |
| UNIT_TEST_PASS | PASS | 7/7 |
| BUILD_PASS | PASS | Vite production build |
| PREVIEW_PASS | PASS | port 4173 browser inspection |
| PLAYWRIGHT_PASS | PASS | 7/7 |
| URL_ROUTING_PASS | PASS | public route scenario |
| DIRECT_ROUTE_PASS | PASS | Evidence and Case direct entry |
| HASH_ROUTE_PASS | PASS | direct and explicit hash scenario; `#scale` top 56px |
| BROWSER_HISTORY_PASS | PASS | hash back restore and Drawer back close |
| NOT_FOUND_PASS | PASS | wildcard and invalid detail states |
| DEV_GALLERY_ISOLATED | PASS | dev true, preview false |
| OVERLAY_PORTAL_PASS | PASS | `#overlay-root` portal |
| FOCUS_TRAP_PASS | PASS | unit and E2E |
| FOCUS_RETURN_PASS | PASS | unit and E2E |
| BODY_SCROLL_LOCK_PASS | PASS | unit and E2E |
| AXE_CRITICAL_SERIOUS_ZERO | PASS | Axe multi-route scenario |
| NO_UNDEFINED_CSS_VARIABLES | PASS | static token scan |
| CONSOLE_ERROR_ZERO | PASS | runtime collector |
| APPLICATION_NETWORK_FAILURE_ZERO | PASS | request-failure collector |

## Scope guard

StoryPage and all seven chapter visual compositions were retained. Only routing hookups, state ownership, semantics, token contrast integrity, and technical QA support were changed. Scale visual redesign was not started.

## Final state

`TECHNICAL_ROUTING_GATE_PASS`

`DESIGN_REENTRY_READY`
