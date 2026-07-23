# Current Atlas dataflow

Story: `/#answers` → `StoryPage` → `ChapterAnswersAtlas` → parse existing URL query → build CTA URL → unconditional `AtlasDataUnavailable`. There is no manifest request, bundle request, adapter, ViewModel, selector call, SVG mark, DOM mirror, or evidence binding.

Explorer: `/atlas` → lazy `AtlasPage` → `loadAtlasManifest(undefined)` → `configuredAtlasReleaseId()` from `VITE_ATLAS_RELEASE_ID` → `/data/releases/<id>/frontend-manifest.json` → `parseFrontendManifest` → `loadAtlasBundle` → SHA-256 Web Crypto check for five fetched JSON payloads → transport parsers → projection ID/hash cross-check → `createProjectionScale` → `toAtlasViewModel` → `AtlasExplorer` → filter-only derivation → `AtlasScene` + `AtlasControls` + `AtlasInspector` + `AtlasDomMirror`.

Evidence: `AtlasInspector` can serialize a representative evidence ID into route navigation. The route does not receive the repository created inside `toAtlasViewModel`; `DetailPage` and `EvidenceDrawer` instead use DEV mocks or production unavailable states. Therefore the real-data flow stops at route navigation.

SSOT target: both Story and Explorer consume one cached release resource that owns resolution, pointer, manifest, bundle verification, schema parsing, scaling, ViewModel adaptation, metadata, abort, and request dedupe. Story then applies only the approved upstream ID list through `selectStoryAtlasNodes`; rendering receives finalized ViewModels.
