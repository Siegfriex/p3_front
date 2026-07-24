# Shared loader architecture recommendation

Recommendation: B — a framework-independent release resource/service with a thin React hook wrapper.

## Alternatives

- A, hook-only `src/shared/api/atlas/useAtlasRelease.ts`: small initial diff, but cache/dedupe and non-React testing become hook lifecycle concerns. PARTIALLY_SUITABLE.
- B, `atlasReleaseResource.ts` + `useAtlasRelease.ts`: preserves existing transport functions, centralizes one release pipeline, dedupes concurrent Story/Explorer consumers, and remains testable without React. RECOMMENDED.
- C, extend `EvidenceRepository`: rejected as the primary release owner. Evidence detail is a downstream dependency and should not own manifest, projection scale, or Atlas ViewModel adaptation.

## Single managed pipeline

`resolve release (env -> pointer -> unavailable)` → manifest fetch/validation → bundle fetch/SHA/schema → projection scale → ViewModel adapter → release metadata + EvidenceRepository. The resource owns in-flight dedupe/cache and abort subscriber accounting; the hook owns React subscription and exposes loading/ready/unavailable/error.

`AtlasPage` and `ChapterAnswersAtlas` consume the same hook. Story receives the same ViewModel node objects and applies `selectStoryAtlasNodes` with upstream-approved IDs outside the presentational renderer. No Story loader copy, raw JSON read, aggregation, projection recalculation, encoding rebuild, force, jitter, or UMAP is permitted.

Cache keys must include release ID plus app contract version. Pointer fetch must be revalidated; immutable release promises may remain cached for the session. A failed or aborted request must not poison the cache.
