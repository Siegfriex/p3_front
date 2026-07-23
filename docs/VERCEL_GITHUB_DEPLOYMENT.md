# Vercel + GitHub deployment

This repository is a standalone Vite/React application. Import the GitHub
repository itself; do not import the parent `P3_CULTURE` repository.

## Repository contract

- GitHub repository: `https://github.com/Siegfriex/p3_front`
- Framework preset: Vite (auto-detected)
- Root directory: `.`
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `main`
- Runtime version: the Node/npm versions declared in `package.json` and `.nvmrc`

The same values are pinned in `vercel.json`, so the Vercel dashboard should not
need command overrides.

## Before merging or deploying

Run:

```bash
npm ci
npm run deploy:check
npm run test:e2e:preview
```

`deploy:check` runs TypeScript, ESLint, unit tests, and the production build.
`test:e2e:preview` rebuilds the app and checks the production-mode `dist`
through Vite Preview, including direct entry to every public BrowserRouter route.
Development-mode browser checks remain available through `npm run test:e2e`.

## Git integration

1. Push the release-ready changes to GitHub.
2. Merge the release branch into `main`.
3. In Vercel, choose **Add New > Project** and import `Siegfriex/p3_front`.
4. Keep the detected settings above and deploy.

Vercel will create Preview deployments for non-production branches and a
Production deployment for updates to `main`.

## Environment variables and Atlas data

The baseline editorial site does not require a secret or environment variable.

The default runtime authority is `public/data/current-release.json`. It must
point to an approved immutable manifest at:

```text
public/data/releases/<release-id>/frontend-manifest.json
```

The pointer SHA-256, release ID, projection ID/hash, manifest, bundle files, Story
preview IDs, and Evidence detail files are verified before rendering. If the
pointer or bundle is absent, the Atlas surfaces intentionally render their
data-unavailable state rather than using an unapproved fixture.

`VITE_ATLAS_RELEASE_ID` is an optional QA/rollback override. Leave it empty in
normal Production and Preview builds so the runtime pointer remains authoritative.
Because Vite embeds `VITE_*` values at build time, redeploy after changing an
override.

`vercel.json` marks the mutable pointer and SPA documents `no-cache`, while files
under `/data/releases/` are immutable and receive a one-year cache lifetime.

## Routing

The application uses `BrowserRouter`. The SPA rewrite in `vercel.json` makes
direct visits and refreshes work for routes such as `/atlas`, `/method`,
`/evidence/:evidenceId`, and `/case/:caseId`.
