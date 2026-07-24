# Semantic Node Core Current-State Report

> Final local verdict: `AGENT_3_NODE_CORE_HANDOFF_READY`  
> Real-data verdict: `NOT_VERIFIABLE / APPROVED DATA ABSENT`  
> Repository: `/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front`  
> Branch: `agent/frontend-routing-atlas-foundation-20260723`  
> Frozen recovery HEAD/upstream: `20835ecadcce0a57067231806c4cfde9dd5b8f41`

## 1. Executive result

The user-supplied recovery point `3e5bbd7` was a starting hypothesis. Live recovery found the branch and upstream at `20835ec`, with a clean owner baseline. Two start snapshots taken 11 seconds apart matched for branch, HEAD, upstream, worktree state, owner/test SHA-256, and `package-lock.json`.

An intermediate freeze observed additional Agent 4 output files outside Agent 3 ownership. Agent 3 did not alter or absorb them. After all integrated QA completed, the authoritative post-QA final snapshots at 21:04 KST were taken more than 11 seconds apart and matched for every Agent 3 owner/test SHA, branch, HEAD, upstream, `package-lock.json`, and the complete worktree status. Final source stability is therefore PASS.

The current node system already contained the core isotropic scaler, semantic glyph grammar, source-radius preservation, transparent hit layer, angular navigation, and pure Story–Explorer parity helpers. Final development therefore preserved the established geometry and closed four current-state gaps:

1. Home/End now resolves by canonical node ID rather than transport array order.
2. A URL-selected node is cleared when the active Full Explorer filter excludes it; no substitute node is selected.
3. `getNodeDisplayOpacity` now exposes the exact `semanticOpacity` contract and keeps semantic, interaction, context, and excluded behavior separate.
4. The visual glyph declares `pointerEvents="none"` in owner code, leaving the transparent hit layer as the pointer owner independently of global CSS.

Additional tests cover diagonal angular priority, candidate reduction after filtering, proportional viewport resize, fixture-radius projection padding, direct filtered-selection closure, and code-level pointer ownership.

## 2. Interim report versus live source

| Area | Interim evidence | Live recovery finding |
|---|---|---|
| HEAD | report froze `4c053ed` | current local/upstream is `20835ec` |
| Agent 4 drift block | historical conflict at `3e5bbd7` | obsolete for current node owner files; start freeze stable |
| Unit count | 14 files / 39 tests | final 15 files / 46 tests |
| Home/End | described as canonical | source used array endpoints; corrected |
| Filter selection | controls cleared selection | direct URL could retain a selected excluded node; corrected |
| Opacity API | conceptual semantic opacity | parameter was `baseOpacity`; aligned to `semanticOpacity` |
| Pointer owner | behavior depended on class CSS plus hit circle | glyph now carries explicit `pointer-events="none"` |
| Approved data | absent | still absent; production remains DataUnavailable |

## 3. Canonical node contract

The renderer consumes `AtlasNodeViewModel`. Agent 3 did not add raw transport access, browser UMAP, aggregation, mass computation, dedupe, centroid computation, force, jitter, collision displacement, or 2D proximity edges.

Preserved fields:

```text
id, projectionId, topicBinId, status, answerType, behaviorFamily,
anchor, display, screen, radiusPx, normalizedMass, confidence,
encoding, representativeEvidenceId, isPublicEvidenceAvailable
```

Coordinate meaning remains:

```text
anchor  = audit coordinate
display = upstream bounded-display coordinate
screen  = immutable projection domain projected into the shared PlotRect
```

## 4. Projection decision

`createProjectionScale` uses one padded isotropic factor:

```text
scale = min(availableWidth / domainWidth, availableHeight / domainHeight)
```

- x/y share one factor.
- letterbox space is centered.
- y is inverted only at the screen projection boundary.
- bounds, plot, and content rectangle are frozen.
- filtering does not recalculate domain or coordinates.
- fixture maximum radius 22 requires 43 units; configured fixture padding is 48.
- approved maximum radius is absent, so real-release padding remains unverified.

## 5. Glyph, radius, and state

- behavior family: circle / diamond / square as locked.
- A1–A8 marks: empty, horizontal, vertical, center dot, empty, slash, plus, double dot.
- status: solid, long dash, dotted/broken.
- selected: independent red outer ring.
- focused: independent contrast halo.
- focused-selected: both are rendered.
- visual radius equals positive finite upstream `radiusPx`.
- hit radius is `max(22, radiusPx)`, producing at least 44×44 in the fixture runtime.

## 6. Confidence and opacity

`getNodeDisplayOpacity` now receives:

```ts
{
  semanticOpacity,
  interactionState,
  filterState,
  isSelected,
  isFocused,
}
```

No multiplicative fade chain is used. The fixture floor `0.45`, null opacity `0.72`, context/dim range `0.24–0.40`, hover minimum `0.82`, and selected/focus minimum `0.88` remain explicitly provisional pending an approved confidence distribution.

## 7. Hit testing and keyboard navigation

- visual glyph: pointer-events none.
- transparent hit circle: sole SVG pointer owner.
- selection occurs on click/pointer-up, not pointerdown.
- overlap resolution: center distance, then code-unit canonical node ID.
- overlap audit reports geometry without moving nodes.
- DOM mirror remains the sole keyboard owner.
- Arrow keys use half-plane, angular deviation, directional distance, canonical ID.
- Home/End now use canonical ID endpoints.
- Enter/Space select; Escape clears.

## 8. Filter and Story parity

Full Explorer assigns only `matched` or `excluded`; excluded nodes are not rendered. When an existing selection becomes excluded, the URL selection is cleared without replacement. Coordinates, domain, scaler, and camera remain unchanged.

The pure Story selector requires a non-empty, unique approved ID list and matching release/projection. It preserves node object identity. Production Story remains `DataUnavailable` because `story_preview_node_ids` is absent. No frontend heuristic subset was added.

Pure parity checks ID, projection, anchor, display, status, answer type, behavior family, normalized mass, source radius, confidence, and encoding while allowing viewport screen coordinates to differ. Approved Story subset parity remains blocked.

## 9. Edge and evidence policy

Default edge count remains zero. No proximity edge is generated. Node selection and Evidence open remain separate; the CTA is available only for approved public representative evidence. Required question/answer excerpts remain a ViewModel change request rather than a raw-data read.

## 10. Reproduced QA

| Gate | Result |
|---|---|
| Repository-wide TypeScript | PASS |
| Agent 3 scoped TypeScript | PASS |
| ESLint | PASS, zero warnings |
| Vitest | PASS, 15 files / 46 tests |
| `npm run build` | PASS, 2,167 modules |
| Default production Playwright | PASS, 17 passed / 9 mode-specific skipped |
| Isolated fixture Playwright | PASS, 5 passed / 2 production-only skipped |
| Fixture viewport | 320, 375, 768, 1440, 1920 |
| Axe critical/serious | 0 in covered fixture and production states |
| page horizontal overflow | 0 in covered states |
| coordinate/radius drift | 0 in fixture assertions |
| duplicate accessible node | 0; DOM mirror is the only keyboard owner |
| fixture hit target below 44 | 0 |
| fixture hit overlap | 0 |
| production fixture node | 0 |
| console/page/request errors | 0 in covered E2E states |

During QA, a concurrently created Agent 4 test initially blocked repository-wide TypeScript with an `.inert` union error. Agent 3 did not edit that file. Agent 4 subsequently narrowed the element type and excluded generated outputs from the root TypeScript boundary. The final repository-wide `npm run typecheck` and `npm run build` both pass. Agent 4 also consumed the node-core request by deriving projection padding from the full approved radius set in `AtlasPage` before filtering.

## 11. Performance scope

Final measurements are from a two-node `CONTRACT_FIXTURE`, not approved data:

- DOMContentLoaded: 347.4 ms
- filter: 15.7 ms
- navigation: 21.2 ms
- selection: 19.9 ms
- resize settle: 30.9 ms
- layout shift: 0
- SVG elements: 33
- visual nodes / DOM buttons: 2 / 2

These numbers cannot justify a renderer decision for real density.

## 12. Remaining blockers

1. Approved frontend manifest and node bundle absent.
2. Approved `story_preview_node_ids` absent.
3. Approved Evidence question/answer excerpts absent.
4. Approved maximum radius and confidence distribution absent.
5. Real density hit overlap, label LOD, accessibility, and performance not verifiable.
6. Real Story–Explorer subset parity not verifiable.

## 13. Final gate

```text
AGENT_3_NODE_CORE_HANDOFF_READY
PRODUCTION_DATA_UNAVAILABLE_PRESERVED
CONTRACT_FIXTURE_VERIFIED
REAL_DATA_PASS_NOT_DECLARED
REPOSITORY_TYPECHECK_AND_BUILD_PASS
AGENT_3_FINAL_OWNER_FREEZE_PASS
PARALLEL_NON_OWNER_OUTPUT_DRIFT_OBSERVED
FINAL_POST_QA_FULL_WORKTREE_FREEZE_PASS
```
