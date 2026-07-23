# Evidence runtime audit

- Repository interface exists at `src/shared/api/atlas/evidenceRepository.ts` with `getSummary` and `getDetail`.
- DG761 evidence index has 64 approved summaries. Eighteen of 140 nodes reference 18 unique evidence IDs; no referenced ID is missing from the index.
- `toAtlasViewModel` creates an EvidenceRepository only to resolve summaries, then discards the repository from its return value.
- `AtlasInspector` routes a representative ID through background location. It does not fetch detail.
- `EvidenceRouteOverlay` validates DEV IDs only against `MOCK_EVIDENCES`; an approved DG761 ID becomes the generic not-found drawer in dev.
- Production overlay accepts any nonempty ID but `EvidenceDrawer` does not consume the repository and renders `EvidenceUnavailableState`.
- Production direct `DetailPage` unconditionally renders `EvidenceUnavailableState` for every evidence ID.
- `getDetail` is therefore never called by the UI. It also lacks manifest SHA verification and detail schema validation.
- The production preview direct route returns HTTP 200 and a correct fail-closed shell; that is route-shell readiness, not approved-detail readiness.

Verdict: repository existence CONFIRMED; approved detail fetch/render, direct route, and drawer end-to-end are CONTRADICTED.
