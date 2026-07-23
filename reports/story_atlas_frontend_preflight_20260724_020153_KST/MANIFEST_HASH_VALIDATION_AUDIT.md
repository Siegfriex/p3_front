# Manifest and hash validation audit

- Runtime cryptographic verification: CONFIRMED for the five fetched payloads: atlas-nodes-all, atlas-topic-bins, atlas-centroids, evidence-index, projection-meta. `loadAtlasBundle.fetchJson` hashes response bytes with `crypto.subtle.digest('SHA-256')` before JSON parsing.
- Manifest trust root: NOT cryptographically pinned. `frontend-manifest.json` is schema-validated and its `release_id` must equal the selected release, but the manifest file itself has no independent trusted hash.
- Declared-only files: atlas-summary, method-meta, and assets-manifest are required as manifest entries but are not fetched or hashed by the current loader.
- Evidence detail: `EvidenceRepository.getDetail` fetches JSON but does not locate the corresponding manifest entry, verify SHA-256, or validate a detail transport schema.
- Projection checks: bundle projection IDs must collapse to one manifest projection ID and projection-meta hash must equal manifest projection hash. This is value equality, not a second cryptographic verification of projection semantics.
- Build-time verification: none.
- E2E verification: contract-fixture tests exercise the loader path; this preflight additionally loaded DG761 in a real browser with no schema/hash error. No deliberate corruption test was run against DG761.
- Canonical approved export versus runtime copy: all file hashes matched; `diff` produced no differences.

Verdict: PARTIALLY_CONFIRMED. Bootstrap payload integrity is real; manifest trust, declared-only files, and evidence details remain gaps.
