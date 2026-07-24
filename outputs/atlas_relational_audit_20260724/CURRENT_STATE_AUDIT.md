# Atlas relationship and infographic current-state audit

Audit date: 2026-07-24 KST
Repository realpath: `/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front`
Branch / HEAD: `P3_FRONT_DEPLOY` / `aa6c391da3514957005da46f5fd41010157bbd75`
Audit mode: read-only application audit before implementation

## Executive classification

`PARTIALLY_CONFIRMED`

The approved aggregate Atlas is real and reproducibly loaded. The relational Atlas is not yet supported by an approved relationship entity.

## Confirmed

- `public/data/current-release.json` selects `ATLAS_DG761_STORY_20260724_024000_KST_D9DB2264`.
- The runtime manifest and the P3_FINAL approved export are byte-identical (`diff -qr` produced no difference).
- Manifest SHA-256 is `fb91d21a4171f1600835744a89138f762cad448c9dad4d9ef0eec91c45bd0fdc`, matching the pointer.
- Projection ID is `PROJ_DG761_20260723_213011_KST_4665FDF3E5CF`; `fit_scope=all_statuses`.
- Runtime bundle contains 140 aggregate nodes, 761 answer entities, 64 node/evidence links, 64 public Evidence summaries, 24 topic bins and 24 centroids.
- Loader verifies manifest and payload hashes, runtime schemas, release/projection IDs, counts and public Evidence eligibility.
- `/atlas` renders approved `display_x/display_y`; filter state does not refit or mutate projection coordinates.
- SVG has an accessible title/description and a synchronized 140-item keyboard DOM mirror.
- At 375px the page itself has no horizontal overflow, but the 720px Atlas SVG is placed inside a horizontal scroll region.

## Partially confirmed

- The derived Story release is present under the approved export path and is the canonical pointer target, but the located validation report names its base release rather than the derived Story release.
- Topic labels are approved transport strings, but 4 of 24 labels are 130–160 characters and are not publication-ready headings without deterministic clipping or an upstream short-label field.
- Representative Evidence is available for 18 of 140 nodes; the current inspector does not load the approved question/answer detail.

## Contradicted

- The current public route has no `지도 / 관계 / 근거 흐름` views. `view=relations` is treated as an invalid value while Map remains visible.
- Node shape is a single circle for every behavior family even though inner-mark tokens exist.
- Approved topic bins and centroids are loaded but not rendered in the Full Explorer.
- The inspector presents `normalizedMass.toFixed(3)` and confidence as raw decimals without an Evidence dossier or metric definition.
- No relationship reason, edge list, edge keyboard model or relationship ViewModel exists.

## Blocked

`RELATION_DATA_BLOCKED`

No `atlas_relationship_edges` entity, relationship payload, relationship runtime schema, or manifest logical file was found in P3_FINAL, the approved export, public release, frontend source, or current runtime. No relationship may be inferred from UMAP 2D distance.

## Current browser evidence

- Baseline desktop: `screenshots/baseline/atlas-map-default-1440.png`
- Selected desktop: `screenshots/baseline/atlas-map-selected-1440.png`
- Selected tablet: `screenshots/baseline/atlas-map-selected-768.png`
- Selected mobile: `screenshots/baseline/atlas-map-selected-375.png`
