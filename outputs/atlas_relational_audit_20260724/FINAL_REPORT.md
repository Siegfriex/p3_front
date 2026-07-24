# P3_CULTURE Atlas Infographic and Relationship Visualization Report

## 1. Executive Intelligence Brief

The current approved Atlas release now operates as one URL-backed three-view product: Map, Relations, and Evidence. The Map is reorganized as an editorial infographic with release context, deterministic filter summary, structural node glyphs, approved topic centroid references, external selected-node annotation, population comparison, and an Evidence dossier. Evidence uses the same approved repository and preserves PDF/page provenance.

The relationship target is not production-ready. No approved `atlas_relationship_edges` entity exists in the inspected release, so the Relations view deliberately returns `RELATION_DATA_BLOCKED`. No 2D-neighbor inference, fixture fallback, or legacy edge was introduced.

Overall classification: `PARTIALLY_CONFIRMED`.

## 2. Confirmed Current State

- Repository realpath: `/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front`
- Branch / audited HEAD: `P3_FRONT_DEPLOY` / `aa6c391da3514957005da46f5fd41010157bbd75`
- Current release: `ATLAS_DG761_STORY_20260724_024000_KST_D9DB2264`
- Projection: `PROJ_DG761_20260723_213011_KST_4665FDF3E5CF`
- Data version: `CORE_1.0.1__SEMANTIC_1.2.0__c29d2523c0ee`
- Counts: 140 nodes, 761 answer entities, 769 labels, 64 public Evidence records, 64 node-Evidence links, 24 bins, 24 centroids.
- Projection method metadata: Korean character TF-IDF → SVD 96D L2 → cosine UMAP, one `all_statuses` projection.
- Current frontend release and inspected approved export are byte-identical.
- Browser rendering uses approved `display_x/display_y`; `anchor_x/anchor_y` remain audit metadata.

## 3. Current Data–Frontend Contract

Loader → runtime schema → adapter → shared Atlas ViewModel → Map/Relations/Evidence renderer was traced. The adapter scales a fixed projection domain but does not derive embeddings, centroids, topology, mass, rank, status, or Evidence eligibility. All three views retain the same release, projection, selected node, status/types filters, and Evidence route.

`normalized_mass` is treated as a radius/mass index, not a population share, because its release total is 17.58 rather than 1. Percentile and local rank are not displayed because no approved fields were found.

## 4. Visual and Interaction Deficiencies

The former screen was a functional but debug-like scatterplot: weak hierarchy, undifferentiated alpha circles, colliding selected label, sparse raw metrics, and no inspectable relationship reason. The implementation resolves the page hierarchy and selection dossier, but immutable approved coordinates still place some nodes on top of one another. The frontend intentionally does not use jitter or collision forces.

Raw topic strings are often too long for in-field publication labels. They are now clipped only for presentation in an external topic index while retaining IDs and approved source strings; no unsupported cluster name is invented.

## 5. Relationship Data Availability

`BLOCKED`. No relation manifest member, entity file, schema record, edge count, or approved relationship ViewModel input was found. The UI therefore renders no SVG edge and exposes an explicit unavailable state in Relations and the dossier. The recommended upstream transport and validations are documented in `RELATIONSHIP_ENTITY_SCHEMA.md`.

## 6. Contradictions and Missing Evidence

- Relationship diagrams requested by the target cannot be supported by the current approved bundle.
- The located validation report identifies the base release, not the derived Story release name; derived-release-specific validation is `PARTIALLY_CONFIRMED` despite byte equality.
- Only 18 of 140 aggregate nodes have representative public Evidence; absence is shown rather than hidden.
- Approved topic-region geometry was not found, so the frontend shows centroids/indexes but draws no invented region polygons.
- Selected-edge screenshots, real edge traversal, topology performance, and editorial relationship Story scene are `BLOCKED`.

## 7. Proposed Information Architecture

The implemented flow is: release/filter summary → Map/Relations/Evidence tabs → synchronized controls → main visual and dossier → A1–A8 comparison strip → DOM mirror → projection warning. Desktop uses a persistent visual/dossier grid; tablet moves the dossier below; mobile uses stacked controls, a local chart scroller, and in-flow details without page overflow.

## 8. Proposed Node Encoding

- Position: approved Topic Space coordinates.
- Outer family shape: circle for information/non-direct, rounded square for procedural/deferment, diamond for action/evidence.
- Internal mark: approved A1–A8 token.
- Radius: upstream `radiusPx` / normalized weighted mass.
- Opacity: upstream confidence within a legible floor.
- Stroke/dash: status and uncertainty.
- Selection: halo and focus ring.
- Evidence unavailable: explicit internal indicator.
- Color: secondary channel only.

Area balance, separating strokes, minimum-size recognizability, 44px hit areas, focus, and monochrome-independent tokens were reviewed.

## 9. Proposed Edge Encoding

Five contract types are reserved: semantic neighbor, shared target, same-topic cross-behavior, shared Evidence context, and temporal continuity. Type maps to line token and textual label; weight to upstream-bounded width; confidence to bounded opacity; direction to marker; uncertainty to dash. Every edge must expose `weight_basis`, explanation, Evidence count, version and source/target. No encoding is activated until approved edges exist.

## 10. Proposed ViewModel and Bundle Changes

Add `atlas_relationship_edges` as a validated manifest entity, then adapt it into `AtlasRelationViewModel` and `AtlasRelationSummaryViewModel`. Required FK, duplicate, public Evidence, temporal direction, finite-weight, version, and non-2D semantic-neighbor validations are specified. The current bundle surface has `relations: null`, making absence explicit rather than overloading an empty array.

Future upstream additions should include approved population mass share, percentile/rank, confidence band, topic-region geometry, concise editorial topic labels, and full node/member/link/label/Evidence chains where public policy permits.

## 11. Implemented Changes

- Three URL-backed views and canonical `status`, `types`, `node`, `view`, `relation`, `depth` parsing.
- Back/Forward/reload restoration and explicit invalid-node handling.
- Release/data/projection header, deterministic filter summary, counts, and representative Evidence coverage.
- Family/A1–A8 grouped controls and reset semantics.
- Approved centroid topic index; no browser cluster boundary.
- Multivariate node glyphs, neutral separation, selected halo, unavailable indicator.
- External selected-node annotation with leader line.
- Evidence dossier with source question/answer, contextual counts, confidence scale, Evidence status, page and PDF CTA.
- A1–A8 population comparison strip and synchronized textual mirror.
- Explicit relation DataUnavailable with no mock or inferred edges.
- Responsive layout and dedicated Atlas relational E2E coverage.

## 12. Responsive and Accessibility Results

At 375, 768, 1440 and 1920, Map/Relations/Evidence have no horizontal page overflow and Axe critical/serious is zero. A first 375px run found a keyboard-inaccessible horizontal topic list; the list received a named focus target and the rerun passed 6/6. Nodes have keyboard activation, DOM equivalents and 44px effective targets. Existing Evidence Drawer focus restoration remains verified.

Network-edge keyboard traversal is not claimable because approved edges do not exist; the equivalent unavailable explanation is accessible.

## 13. Performance Results

Local lab observations: LCP 520 ms, map-to-relations commit 54.4 ms, status-filter commit 47 ms, 2,517 DOM elements, 1,319 chart SVG elements and 140 nodes. Production build: Atlas JS 22.93 kB / 7.33 kB gzip; Atlas CSS 13.16 kB / 2.92 kB gzip. These are local lab/build observations, not field p75 Core Web Vitals. The existing Story chunk remains 522.33 kB and triggers the build warning.

## 14. Remaining Risks

1. Upstream relationship production, validation and public Evidence policy are absent.
2. Dense approved coordinates still overlap; only an upstream approved display layout can change them.
3. Raw topic labels need an approved editorial short-label field.
4. Representative public Evidence coverage is 18/140 nodes, not full node coverage.
5. Real-edge rendering, edge density, selected-edge dossier, and topology performance are untested.
6. Story Preview is not yet the requested 3–5-node approved relation scene.
7. The shared worktree contains extensive pre-existing staged/uncommitted changes; no commit or push was made.

## 15. Decisions Required

1. Approve an upstream owner and pipeline run for `atlas_relationship_edges`.
2. Freeze duplicate/direction/top-k/public-Evidence policies per relation type.
3. Decide whether topic labels receive a separate approved editorial field.
4. Decide whether mass share/percentile/rank become upstream contract fields.
5. After real edges pass validation, authorize the Relations overlay, selected-edge Inspector, Story relation scene, and complete visual QA matrix.

## 16. Gate Decision

| Gate | Verdict | Basis |
|---|---|---|
| Infographic hierarchy | `INFOGRAPHIC_HIERARCHY_PASS` | Summary, Map, comparison, dossier and warnings are visibly ordered and runtime-tested. |
| Node encoding | `NODE_ENCODING_PASS` | Family shape, A1–A8 mark, mass radius, confidence opacity, status stroke and accessible state are distinct. |
| Relation entity contract | `BLOCKED` | Proposed contract exists; approved runtime entity does not. |
| Relation view | `BLOCKED` | Correct fail-closed UI exists; no real ego graph can be rendered. |
| Evidence provenance | `PARTIALLY_CONFIRMED` | Approved representative node→Evidence→meeting/page/PDF works; full relation chain is absent. |
| Story relation preview | `BLOCKED` | No approved relations support the requested scene. |
| Accessibility | `ACCESSIBILITY_PASS` | Axe critical/serious zero, keyboard/DOM/touch/focus checks pass for available surfaces. |
| Visual QA | `PARTIALLY_CONFIRMED` | 375/768/1440/1920 Map/Evidence/unavailable states verified; required real-edge scenarios are impossible. |

Final product verdict: `PARTIALLY_CONFIRMED`.
