# Vercel preflight blockers

1. No linked Vercel project is discoverable for this repository; `.vercel/project.json` is absent.
2. `vercel.json` is untracked, so Git deployment cannot rely on its SPA rewrite.
3. DG761 runtime release is untracked; an env override without the asset copy would yield manifest 404.
4. `current-release.json` is absent and resolver support is not implemented.
5. Story real-data wiring and approved Evidence detail wiring are not implemented.
6. Baseline QA is not green: current-env unit has 1 failure; default Playwright has 8 failures, including environment-coupled no-data expectations and stale evidence opener tests.
7. Cache headers for immutable releases, mutable pointer, and HTML are absent.
8. Preview/Production environment scopes and `VITE_ATLAS_RELEASE_ID` values cannot be verified without a project link.
9. The worktree is broadly dirty. Any implementation must stage exact files only and keep reports/build artifacts out of source commits.
10. The legacy `ATLAS_20260723_211051_KST_1A82C82A` directory is also under `public/data`; Vite copied it into `dist`, so it would remain directly downloadable even though the resolver does not select it.

Preview deployment is not authorized in this task and was not attempted.
