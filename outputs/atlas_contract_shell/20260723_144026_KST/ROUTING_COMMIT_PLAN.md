# Routing Foundation Commit Plan

## Decision

`ROUTING_FOUNDATION_COMMIT_READY`

Commit authorization was checked twice. `AUTH_COMMIT_ROUTING_FOUNDATION=true` was not present, so no staging, commit, or push was performed.

## Baseline

- Branch: `refactor/routing-technical-foundation`
- HEAD: `6f4835292abe9bc0cbbed81469b21c25c4e95777`
- Technical Gate: `TECHNICAL_ROUTING_GATE_PASS`
- Design Gate: `DESIGN_REENTRY_READY`
- SSOT SHA-256: `99ee7cb16039afbebbd1373aa58e22aa89fd4ba257d26da3648e9422cf2bfb2d`
- Package lock: lockfile v3; root name/version/dependency maps equal to `package.json`
- Index: unchanged; cached diff empty

## Boundary

The authoritative routing file list is the 61-row technical routing Gate map. `ROUTING_COMMIT_FILESET.csv` reproduces the exact candidates and explicit exclusions.

Routing commit must include:

- BrowserRouter entry and route shell
- direct Evidence/Case pages and background-location overlay
- hash navigation/restoration
- portal/Dialog/Drawer/BottomSheet and focus/scroll primitives
- routing tests and QA configuration
- `package-lock.json`

Routing commit must exclude:

- every file under `src/pages/atlas`, `src/widgets/atlas-explorer`, `src/shared/{api,lib,config}/atlas`, and `src/shared/types/atlas.ts`
- `tests/e2e/atlas-contract-shell.spec.ts`
- SSOT copies, historical outputs, concurrent UX-audit outputs, prompts, and placeholders
- Agent 3 output directory

## AppRouter overlap

`src/app/router/AppRouter.tsx` contains both the pre-existing routing foundation and the new Atlas route hunk. It must not be staged wholesale for a routing-only commit.

When authorization is later present:

1. Re-run branch, HEAD, status, SSOT hash, lock consistency, and full QA.
2. Stage the exact routing files in `ROUTING_COMMIT_FILESET.csv`.
3. Use hunk staging for `AppRouter.tsx`; exclude `lazy`/`Suspense`, `LazyAtlasPage`, `atlasRouteLoading`, and `<Route path="atlas">`.
4. Verify staged diff contains no `/atlas`, `AtlasPage`, Atlas transport/ViewModel, or fixture code.
5. Verify `package-lock.json` is staged.
6. Verify no `outputs/`, SSOT copy, prompt, or unrelated untracked file is staged.
7. Run routing QA against the staged intent.
8. Create one intentional routing-foundation commit. Do not push.

Suggested commit subject:

`refactor(frontend): establish technical routing foundation`

## Visual scope

Agent 3 did not modify Story chapter or Scale source. Their existing dirty-tree changes remain part of the pre-existing routing/design foundation and require the human diff review already prescribed by the technical Gate.
