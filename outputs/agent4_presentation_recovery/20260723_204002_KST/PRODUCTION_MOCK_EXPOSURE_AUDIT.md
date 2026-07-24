# Production Mock Exposure Audit

## Verdict

`FAIL / BLOCKING`

The production Atlas and Evidence detail branches fail closed correctly, but Story and Case are not production-clean as a whole.

## Source evidence

- `src/widgets/scale-scene/ChapterScale.tsx` imports `STORY_METRICS`, renders a visible `MOCK` badge, and prints `[MOCK Data Reference]`.
- `src/widgets/gap-scene/ChapterGap.tsx` imports `MOCK_EVIDENCES` without a production gate.
- `src/widgets/evidence-chain-scene/ChapterRecord.tsx` imports `MOCK_EVIDENCES` without a production gate.
- `src/widgets/case-sequence/ChapterCases.tsx` imports `EDITORIAL_CASES` without a production gate.
- `src/app/router/DetailPage.tsx` production-gates Evidence mock excerpts, but direct Case rendering still uses `EDITORIAL_CASES`.
- `src/app/router/EvidenceRouteOverlay.tsx` validates route IDs against mock collections before opening the overlay.
- `src/pages/data/DataPage.tsx` imports `MOCK_EVIDENCES`.
- `src/pages/method/MethodPage.tsx` publicly states that frontend content uses deterministic mock fixtures.

## Why the earlier runtime count was insufficient

`CURRENT_STATE_RUNTIME_AUDIT.json` counted explicit provenance selectors only (`fixture-provenance`, `story-fixture-provenance`, `evidence-fixture-notice`). It did not scan rendered text or trace production module imports. Its zero count remains valid for those selectors but is not proof of source-wide production isolation.

## Required remediation

Replace mock-backed Story/Case data with approved repositories, or production-gate every affected chapter and route to explicit DataUnavailable states with no fake number or Evidence. Add a production-build E2E that scans the entire Story and every public detail route for mock labels, known fixture values, and mock-only module behavior.

No remediation was attempted after detection because Agent 4 owner-file source drift had already triggered the mandatory stop condition.
