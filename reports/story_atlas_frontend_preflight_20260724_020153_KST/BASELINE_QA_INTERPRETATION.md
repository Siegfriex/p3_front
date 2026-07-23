# Baseline QA interpretation

- Typecheck: PASS.
- Lint: PASS.
- Unit with current ambient `.env` DG761: FAIL, 45/46 passed. The single `AtlasPage` test expects no configured release and is not isolated from Vite env.
- Unit with `VITE_ATLAS_RELEASE_ID=`: PASS, 46/46. This proves the failure is scenario coupling, not a generic unit regression.
- Production build with DG761: PASS. Production build with explicit empty release: PASS.
- Default Playwright: FAIL, 10 passed / 8 failed / 9 skipped. Five failures lock or assume no-release state while ambient DG761 is loaded; three use a stale evidence opener accessible name.
- Manual DG761 browser runtime: Explorer real-data PASS for the tested boundaries: manifest, SHA/schema pipeline, 140/140/140 counts, query selection, invalid node, reload, Back/Forward, direct routes, zero console errors.
- Story real-data: NOT IMPLEMENTED. Existing test PASSes around its DataUnavailable panel must not be called Story integration PASS.
- Fail-closed no-release production build: PASS; zero data requests and `NO_APPROVED_RELEASE_CONFIGURED`.
- Evidence approved detail: NOT IMPLEMENTED despite route shells returning 200.
- Axe: zero violations on manual production-preview `/#answers` and `/atlas`; the baseline Axe-named E2E timeout occurred before analysis.
- Vercel deployment: NOT TESTED and not authorized.

Overall baseline: PARTIALLY_CONFIRMED. DG761 Explorer is confirmed locally, but repository QA and release closure are not green.
