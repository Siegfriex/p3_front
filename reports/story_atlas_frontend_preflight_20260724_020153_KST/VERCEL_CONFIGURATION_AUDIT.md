# Vercel configuration audit

- `vercel.json` exists in the worktree but is untracked. It specifies `npm run build`, `npm ci`, `dist`, and the official Vite SPA catch-all rewrite `/(.*) -> /index.html`.
- Local production preview returned HTTP 200 for `/`, `/atlas`, `/evidence/:id`, `/case/:id`, `/method`, `/data`, and `/about`. This proves Vite build routing, not a Vercel deployment.
- Vercel CLI is not installed and `.vercel/project.json` is absent.
- The authenticated Vercel connector listed the available team and six projects; none matched `p3_front` or this Git repository. No linked project, Preview environment, Production environment, or deployment could be inspected.
- `VITE_ATLAS_RELEASE_ID` is a Vite build-time public variable. It must be set per Preview/Production build if used; changing it after build cannot change the already bundled resolver value.
- DG761 runtime copy and `vercel.json` are both untracked, so a Git-triggered Vercel build from current HEAD cannot contain either.
- The local build copied both DG761 and the older `ATLAS_20260723_211051_KST_1A82C82A` directory into `dist`; the older release is therefore a production-exposure blocker even without automatic selection.
- No Vercel Function, backend/API route, or server route exists. The app is static SPA + JSON.
- No secret-like value was found in the scoped scan. `.env` is ignored; only the non-secret release ID is used by Atlas.
- Vite `base` is default `/`. Current absolute `/data/...` URLs work at a root domain but are not base-path portable.
- Current `vercel.json` has no headers/cache rules.

Configuration readiness: SPA syntax CONFIRMED in the local worktree; deployable linked/config state BLOCKED.
