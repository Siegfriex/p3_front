# Vercel cache policy recommendation

Use `headers` in `vercel.json` after implementation review:

- `/data/releases/:releaseId/:path*`: `Cache-Control: public, max-age=31536000, immutable`. Release IDs are content-addressed lifecycle boundaries and must never be overwritten.
- `/data/current-release.json`: browser `max-age=0, must-revalidate`; optionally `CDN-Cache-Control: max-age=60, stale-while-revalidate=300`. It must not be immutable.
- `/index.html`: `Cache-Control: public, max-age=0, must-revalidate` (or equivalent `no-cache`) so cached HTML does not pin an obsolete JS/runtime policy.
- Hashed Vite `/assets/**`: long immutable cache.

The current Vite preview emitted `Cache-Control: no-cache` for DG761 JSON; that is local preview behavior, not Vercel evidence. Deployed Preview headers remain NOT_VERIFIABLE.

Official Vercel documentation confirms `headers` rules for static assets and the exact Vite SPA rewrite pattern used here. No config was modified in this preflight.
