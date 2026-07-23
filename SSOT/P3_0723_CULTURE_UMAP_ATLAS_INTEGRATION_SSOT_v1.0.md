# P3_CULTURE UMAP Atlas Data–Frontend Integration SSOT v1.0

## Document Control

| Field | Value |
|---|---|
| Canonical title | `P3_CULTURE UMAP Atlas Data–Frontend Integration SSOT v1.0` |
| Canonical repository path | `P3_CULTURE/P3_FINAL/contracts/P3_CULTURE_UMAP_ATLAS_INTEGRATION_SSOT_v1.0.md` |
| Status | `CONTRACT_LOCKED / DATA_INSTANCE_PENDING` |
| Contract authority | `P3_FINAL/contracts` |
| Data authority at lock time | Existing pinned Core source; P3_FINAL cutover not declared |
| Frontend implementation authority at lock time | `P3_0722/frontend/p3_front`, branch-level changes pending intentional commit |
| Locked date | `2026-07-23 KST` |
| Change policy | SemVer amendment + Decision Register entry + SHA-256 lock refresh |
| Supersession rule | This document supersedes fragmented UMAP/Atlas integration planning documents for contract decisions. It does not supersede locked Core or Semantic source contracts. |
| Derived copies | Allowed only as `CONFORMED_COPY` with source path, SSOT version, and SHA-256 |
| Mock policy | Mock or legacy fixtures must be explicitly labeled and must never be exposed as approved production data |

This SSOT locks architecture, ownership, interfaces, lifecycle, schemas, and Gate definitions. It does **not** lock a projection ID, model ID, row count, node count, or evidence coverage until the corresponding approved P3_FINAL entities exist.

---

# 1. Executive Decision

## 1.1 Current combined verdict

```text
P3_FINAL_STRUCTURE_READY                 PASS
M1_UMAP_MIGRATION_SCOPE_AUDIT            PASS
TECHNICAL_ROUTING_GATE                   PASS
DESIGN_REENTRY_READY                     PASS
ROUTING_FOUNDATION_COMMITTED             PENDING
P3_FINAL_DATA_AUTHORITY_CUTOVER           PENDING
P3_FINAL_GOLD_AVAILABLE                   FALSE
P3_FINAL_PROJECTION_INSTANCE              NOT_CREATED
P3_FINAL_ATLAS_INSTANCE                   NOT_CREATED
APPROVED_FRONTEND_BUNDLE                  BLOCKED_BY_GOLD
FULL_ATLAS_ROUTE                          NOT_IMPLEMENTED
```

The absence of P3_FINAL projection, Atlas, evidence mart, and approved frontend bundle is contract-conformant at M1. Existing P3_0722 projection and frontend data are legacy/provisional references and are excluded from P3_FINAL authority.

## 1.2 Immediate direction

1. Preserve and intentionally commit the verified routing foundation after human diff and lockfile review.
2. Install this SSOT in `P3_FINAL/contracts` and pin its hash.
3. Proceed through M2–M5 without migrating legacy UMAP, Atlas, or frontend data.
4. Generate a new Gold-backed analysis mart, projection, Atlas entities, and approved bundle after review Gates.
5. Implement `/atlas` against the locked transport and ViewModel contracts. Before approved data exists, production must show a data-unavailable state rather than silently using legacy or mock data.

---

# 2. Authority and Evidence Hierarchy

When sources conflict, use the following order:

1. Actual local files and reproducible execution results
2. P3_FINAL schema/entity registries and frontend manifest
3. This SSOT
4. Latest approved Decision Register entry
5. Current audited implementation reports
6. Historical reports, legacy bundles, conversations, and inference

A document saying `PASS`, `COMPLETE`, or `LOCKED` is not sufficient unless the associated files, hashes, commands, and Gate evidence are available.

## 2.1 Authority separation

| Area | Current authority | Future authority |
|---|---|---|
| Core source | Pinned official Core source under `data_parse/audit_minutes_pdf_etl` | `P3_FINAL/data/10_core` after `CORE_EQUIVALENCE_PASS` |
| Semantic baseline | Validated legacy candidate | `P3_FINAL/data/20_semantic` after `SEMANTIC_BASELINE_EQUIVALENCE_PASS` |
| Gold | Absent | `P3_FINAL/data/40_review/gold` after `GOLD_LABELING_PASS` |
| Analysis/UMAP/Atlas | Legacy excluded reference only | P3_FINAL approved analysis outputs after Gold |
| Frontend bundle | None approved | `P3_FINAL/data/90_exports/frontend/approved/<release_id>` |
| Runtime frontend | `P3_0722/frontend/p3_front` | Same app or successor after explicit repository/cutover decision |
| Deployed data copy | None approved | `p3_front/public/data/releases/<release_id>` as `CONFORMED_COPY` |

`P3_FINAL` may be the canonical **contract workspace** before it becomes the canonical **data instance**.

---

# 3. Confirmed Current State

## 3.1 Migration

- M1 repository structure exists and passes its structure Gate.
- No data payload has been migrated into P3_FINAL.
- No authority or cutover has been declared.
- Legacy embedding, PCA, UMAP, projection, Atlas, frontend source/build/bundle are excluded from migration.
- Gold and approved exports are intentionally absent.
- Next authorized migration operation is M2 raw source copy and `RAW_HASH_PASS`.

## 3.2 Frontend routing foundation

Canonical runnable app:

```text
/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front
```

Verified branch:

```text
refactor/routing-technical-foundation
```

Verified foundation:

- BrowserRouter owns URL and history.
- Public routes exist for `/`, `/method`, `/data`, `/about`, `/evidence/:evidenceId`, `/case/:caseId`, and wildcard 404.
- Direct Evidence/Case entry renders a page.
- Story-originated Evidence/Case navigation uses background-location Drawer.
- Hash direct entry and browser Back work for seven Story chapters.
- Portal, focus trap, focus return, Escape, background inertness, and scroll lock pass.
- Development Foundation Gallery is isolated from production.
- Reverse FSD imports and deep relative imports are zero.
- CSS undefined variables are zero.
- TypeScript, ESLint, Vitest, build, Playwright, Axe critical/serious, console, and request-failure checks pass.
- Scale and chapter visual compositions were not redesigned.
- No commit or push was performed.
- `package-lock.json` is synchronized and trackable but awaits intentional commit.

## 3.3 Atlas frontend

Current Answers implementation:

```text
/#answers
→ ChapterAnswersAtlas
→ storyData.ts mock import
→ 8-node SVG preview
→ local React state
→ mock evidence ID
→ route-driven Evidence Drawer
```

Current deficiencies:

- `/atlas` does not exist.
- Runtime manifest loader, schema validator, repository, adapter, and Atlas ViewModel pipeline do not exist.
- The legacy 45-node bundle is not served by the app and is not approved.
- Actual node-to-public-evidence linkage does not exist.
- SVG nodes do not satisfy keyboard and DOM-mirror accessibility requirements.
- Legacy nodes overlap severely and are not approved as P3_FINAL coordinates.

---

# 4. Locked Product Structure

## 4.1 Story Preview

| Item | Contract |
|---|---|
| Route | `/#answers` |
| Public name | `어떻게 답했나` |
| Role | Limited editorial scene inside the scrolling Story |
| Controls | status, answer type, legend, reset |
| Renderer | Aggregate SVG |
| Data | Approved aggregate ViewModel subset only |
| Navigation | “전체 지도 보기” carries current filters into `/atlas` |
| Prohibited | raw-point exploration, browser-side UMAP, node aggregation, evidence inference |

## 4.2 Full Explorer

| Item | Contract |
|---|---|
| Route | `/atlas` |
| Public name | `답변행태 지도` |
| First release | Aggregate-node explorer only |
| URL state | status, answer types, selected node, view mode |
| Evidence | Published representative evidence only |
| Raw points | Excluded from v1 |
| Renderer | SVG until measured thresholds justify Canvas/Pixi |
| Required states | loading, error, empty, invalid-node, data-unavailable |

## 4.3 Evidence Detail

| Item | Contract |
|---|---|
| Route | `/evidence/:evidenceId` |
| Direct entry | Full page |
| Story/Atlas background entry | Route-driven Drawer/Bottom Sheet |
| Contents | request, question, answer, reported status, verification, provenance, PDF/page links |
| Public eligibility | Approved, public, provenance-valid evidence only |

Story is not replaced by Atlas.

---

# 5. Semantic and Projection Principles

The following are locked:

1. S1 Editorial Time Space, S2 Topic Space, and S3 Behavior Space are distinct.
2. Node position represents Topic Space.
3. Shape/fill represents answer behavior.
4. Radius represents normalized weighted mass.
5. Opacity represents confidence.
6. Stroke/line style represents status or uncertainty.
7. A1–A4 are information-absence/non-direct behavior.
8. A5–A6 are deferral/procedural behavior.
9. A7–A8 are action/evidence behavior.
10. All statuses are fit in one shared projection.
11. Status-specific UMAP fits are prohibited.
12. Similarity and centroids are computed in high-dimensional space.
13. The frontend does not compute embeddings, UMAP, centroids, dedupe, node mass, status, or aggregation.
14. Filtering must not change semantic coordinates.
15. Browser-side random jitter and force layout are prohibited.
16. Collision adjustment must be deterministic, upstream-produced, bounded, and represented by separate anchor/display coordinates.

Required warnings:

> 이 지도는 의미적 위치를 2차원으로 투영한 표시용 공간입니다.

> 2차원 거리 자체를 실제 유사도 점수로 해석하지 마십시오.

---

# 6. Data Lifecycle and Pipeline Blueprint

```text
M0/M1 Source audit and structure
→ M2 Raw source migration
→ RAW_HASH_PASS
→ M3 Core direct copy and equivalence
→ CORE_EQUIVALENCE_PASS
→ M4 Semantic baseline copy/regeneration and equivalence
→ SEMANTIC_BASELINE_EQUIVALENCE_PASS
→ M5 Review protocol and human adjudication
→ REVIEW_PROTOCOL_READY
→ GOLD_LABELING_PASS
→ M6 Approved exports and review-controlled marts
→ APPROVED_ANALYSIS_INPUT_PASS
→ M7 Master analysis and Gold-backed UMAP/Atlas generation
→ PROJECTION_METHOD_CONTRACT_PASS
→ PROJECTION_INSTANCE_PASS
→ ATLAS_ENTITY_PASS
→ EVIDENCE_TRACEABILITY_PASS
→ M8 Approved frontend bundle generation
→ FRONTEND_BUNDLE_SCHEMA_PASS
→ APPROVED_FRONTEND_BUNDLE_PASS
→ Frontend adapter/route integration
→ VIEWMODEL_ADAPTER_PASS
→ ATLAS_ROUTE_PASS
→ ATLAS_RENDER_PASS
→ ACCESSIBILITY_PASS
→ VISUAL_QA_PASS
→ P3_FINAL_CUTOVER_PASS
```

No downstream phase may bypass its prerequisite Gate.

## 6.1 Promotion rule

- Producers write to a temporary run directory.
- Validation produces a machine-readable report.
- Passing output is copied to the next lifecycle directory.
- Failed comparison never overwrites the baseline.
- Gold or approved files are not pre-created as empty Parquet.
- An approved zero-row result requires a signed review manifest.

---

# 7. Canonical Entity Chain and Contract

## 7.1 Upstream chain

```text
meeting
→ page
→ block
→ speaker_turn
→ retrieval_segment
→ qa_pair
→ answer_unit
→ weak behavior entities
→ review queues
→ Gold target-answer links and labels
```

## 7.2 Atlas chain

```text
projection_models
→ projection_points
→ topic_bins
→ semantic_centroids
→ atlas_nodes
→ atlas_node_members
→ target_answer_links
→ answer_behavior_labels
→ evidence_records
→ frontend_manifest
```

Each entity must record grain, PK, FK, row count, dtype, nullable rules, uniqueness, version, pipeline run, visibility, and frontend requirement.

## 7.3 Entity registry

| Entity | Grain | Primary key | Required foreign keys | Lifecycle | Frontend |
|---|---|---|---|---|---|
| `projection_models` | one fitted projection model | `projection_id` | `embedding_model_id` | APPROVED_ANALYSIS | metadata only |
| `projection_points` | one entity in one projection | `(projection_id, entity_type, entity_id)` | `projection_id`, optional `topic_bin_id` | APPROVED_ANALYSIS | explorer optional; not v1 initial load |
| `topic_bins` | one spatial bin in one projection | `topic_bin_id` | `projection_id`, representative target | APPROVED_ANALYSIS | required |
| `semantic_centroids` | one semantic centroid definition | `centroid_id` | `projection_id`, optional bin/type | APPROVED_ANALYSIS | required |
| `atlas_nodes` | one status × topic bin × answer behavior aggregate | `atlas_node_id` | `projection_id`, `topic_bin_id` | APPROVED_ANALYSIS | required |
| `atlas_node_members` | one approved link membership in one node | `(atlas_node_id, target_answer_link_id)` | node, link, target, answer | APPROVED_ANALYSIS | server/export lineage; not necessarily public raw |
| `target_answer_links` | one accepted target-answer link | `target_answer_link_id` | target, QA/answer unit, segment | GOLD | indirect public lineage |
| `answer_behavior_labels` | one answer/code label record | `answer_behavior_label_id` | answer unit/key | WEAK or GOLD, explicitly separated | approved values only |
| `evidence_records` | one public-eligibility evidence record | `evidence_id` | target, link, label, verification, meeting/page/PDF | APPROVED_ANALYSIS | required index/detail |
| `frontend_manifest` | one bundle file registration | `bundle_id` | projection/run/version | APPROVED_EXPORT | required |

## 7.4 Projection model minimum schema

```text
projection_id: string
embedding_model_id: string
fit_scope: literal "all_statuses"
entity_types: list/string set
pca_components: integer
umap_neighbors: integer
umap_min_dist: float
umap_metric: string
random_state: integer
input_count: integer
model_path: string
projection_hash: sha256
x_min/x_max/y_min/y_max: finite float
data_version: string
pipeline_run_id: string
created_at: datetime
```

Actual values remain unlocked until a Gold-backed projection passes validation.

## 7.5 Atlas node minimum schema

```text
atlas_node_id: string
projection_id: string
status_canvas: all|complete|active|unresolved
topic_bin_id: string
answer_type_code: A1|A2|A3|A4|A5|A6|A7|A8
behavior_family: information_non_direct|deferral_procedural|action_evidence
anchor_x/anchor_y: finite float
display_x/display_y: finite float
raw_answer_count: non-negative integer
raw_link_count: non-negative integer
weighted_mass: non-negative float
normalized_mass: float in [0,1]
node_radius: positive finite float
mean_similarity: nullable float
mean_qa_confidence: nullable float in [0,1]
mean_label_confidence: nullable float in [0,1]
node_version: string
pipeline_run_id: string
data_version: string
```

`red`, `amber`, and `blue` are visual tokens, not domain values.

## 7.6 Evidence public eligibility

A record is exportable only when all are true:

```text
review_status = approved
publish_status = approved
public_visibility = true
target-answer link is Gold
behavior label is approved
PDF asset exists
meeting/page provenance is valid
node/member/link/evidence FKs are valid
```

Draft, private, weak-only, or unreviewed evidence is not included in public node interactions.

---

# 8. Frontend Bundle Contract

## 8.1 Canonical and runtime locations

Canonical export:

```text
P3_FINAL/data/90_exports/frontend/approved/<release_id>/
```

Runtime conforming copy:

```text
p3_front/public/data/releases/<release_id>/
```

Rules:

- The runtime copy is `CONFORMED_COPY`, not an independent source.
- Source and copy hashes must match the manifest.
- The app must select a release through an explicit manifest pointer or build-time release ID.
- `P3_0722/frontend/public/data` is legacy/stale and must not be used.
- Components never import raw Parquet or pipeline entities.

## 8.2 Required v1 files

```text
frontend-manifest.json
atlas-summary.json
atlas-nodes-all.json
atlas-topic-bins.json
atlas-centroids.json
evidence-index.json
projection-meta.json
method-meta.json
assets-manifest.json
```

Conditional files:

```text
atlas-nodes-active.json
atlas-nodes-complete.json
atlas-nodes-unresolved.json
```

These are emitted only if manifest field `status_partitioned=true`.

Evidence detail transport is abstracted by `EvidenceRepository.getDetail(evidenceId)`. The manifest declares one of:

```text
route-json
arrow
```

The storage choice is made at M8 after approved payload size measurement. Raw projection points are not included in v1.

## 8.3 Manifest minimum fields

```text
manifest_version
release_id
app_contract_version
data_version
pipeline_run_id
projection_id
projection_hash
publication_ready = true
generated_at
status_partitioned
evidence_detail_transport
files[]:
  logical_name
  path
  format
  sha256
  row_count
  size_bytes
  cache_policy
```

String `"<NA>"` is prohibited. Null is JSON `null`, and numeric fields remain numeric.

---

# 9. Frontend Architecture and FSD Contract

## 9.1 Ownership

```text
app
→ router, providers, shell, error boundary

pages
→ route composition and route-level loading/error state

widgets
→ product scenes and interaction orchestration

shared/api
→ transport, manifest, runtime schema validation

shared/lib
→ adapters, query-state serialization, projection scaling

shared/config
→ encoding dictionary, warnings, static contracts

shared/types
→ transport-independent ViewModels

shared/ui
→ reusable accessible primitives
```

No `pages`, `widgets`, or `shared` module may import from `app`. `shared` may not import from `pages` or `widgets`.

## 9.2 Locked module blueprint

```text
src/pages/atlas/
├─ AtlasPage.tsx
└─ AtlasRouteError.tsx

src/widgets/atlas-explorer/
├─ AtlasExplorer.tsx
├─ AtlasScene.tsx
├─ AtlasControls.tsx
├─ AtlasInspector.tsx
└─ AtlasDomMirror.tsx

src/widgets/atlas-scene/
└─ ChapterAnswersAtlas.tsx        # Story preview; may reuse shared ViewModels

src/shared/api/atlas/
├─ loadAtlasManifest.ts
├─ loadAtlasBundle.ts
├─ atlasTransportSchema.ts
└─ evidenceRepository.ts

src/shared/lib/atlas/
├─ toAtlasViewModel.ts
├─ atlasQueryState.ts
└─ scaleProjection.ts

src/shared/config/atlas/
├─ atlasEncoding.ts
└─ atlasWarnings.ts

src/shared/types/
└─ atlas.ts
```

The routing foundation remains in the existing app/router/shared overlay structure.

## 9.3 Component boundary

`AtlasScene` receives finalized ViewModels. It must not:

- read raw pipeline column names
- aggregate nodes
- infer status
- dedupe
- compute mass
- compute UMAP or centroids
- mutate semantic coordinates
- fetch evidence directly

---

# 10. ViewModel Contract

```ts
type AtlasStatus = "all" | "complete" | "active" | "unresolved";
type AnswerType = "A1" | "A2" | "A3" | "A4" | "A5" | "A6" | "A7" | "A8";
type BehaviorFamily =
  | "information_non_direct"
  | "deferral_procedural"
  | "action_evidence";

interface AtlasNodeViewModel {
  id: string;
  projectionId: string;
  topicBinId: string;
  topicLabel: string | null;
  status: Exclude<AtlasStatus, "all">;
  answerType: AnswerType;
  behaviorFamily: BehaviorFamily;
  anchor: { x: number; y: number };
  display: { x: number; y: number };
  screen: { x: number; y: number };
  radiusPx: number;
  normalizedMass: number;
  answerCount: number;
  linkCount: number;
  confidence: number | null;
  representativeEvidenceId: string | null;
  isPublicEvidenceAvailable: boolean;
  encoding: {
    shapeToken: string;
    fillToken: string;
    strokeToken: string;
    opacity: number;
  };
}

interface TopicBinViewModel {
  id: string;
  label: string | null;
  center: { x: number; y: number };
  memberCount: number;
  representativeTargetIssueId: string | null;
}

interface CentroidViewModel {
  id: string;
  type: string;
  status: Exclude<AtlasStatus, "all"> | null;
  answerType: AnswerType | null;
  position: { x: number; y: number };
  memberCount: number;
  medoidEntityId: string | null;
}

interface EvidenceSummaryViewModel {
  id: string;
  title: string;
  reportedStatus: string | null;
  verificationStatus: string | null;
  meetingId: string;
  pageStartNo: string;
  pageEndNo: string;
  pdfAssetId: string;
  publicVisibility: true;
}
```

The transport schema and ViewModel are separate. Visual tokens are created by the adapter/config layer.

---

# 11. Route and State Contract

## 11.1 Routes

```text
/
 /method
 /data
 /about
 /atlas
 /evidence/:evidenceId
 /case/:caseId
 /dev/foundations          development only
 *
```

## 11.2 Atlas query state

Canonical parameters:

```text
status=all|complete|active|unresolved
types=A1,A2,...
node=<atlas_node_id>
view=nodes
```

Rules:

- Unknown values are rejected or normalized explicitly.
- Order of `types` is canonicalized A1→A8.
- Reset removes Atlas parameters.
- Browser Back/Forward and reload restore state.
- Story preview may use the same parameters with `#answers`.
- “Full explorer” navigation carries preview filters to `/atlas`.
- Evidence navigation uses background location; direct Evidence URL remains canonical.

---

# 12. Renderer, Accessibility, and Performance

## 12.1 Renderer

- v1 is aggregate-only SVG.
- Retain SVG while approved interactive nodes remain within measured target-device budgets.
- Reassess Canvas/Pixi only when more than approximately 1,000 points are simultaneously visible or measured frame/input budgets fail.
- Never render all raw answers as SVG DOM marks.
- Raw point mode requires a separate Decision Register amendment.

## 12.2 Coordinate scaling

- One immutable projection domain is loaded from `projection-meta.json`.
- Scale is computed once per viewport, not per filter.
- Background grid and marks use the same plot rectangle.
- Aspect ratio policy is explicit and tested.
- `display_x/y` is rendered; `anchor_x/y` remains available for audit.
- Labels may use frontend layout offsets only when they do not alter node coordinates.

## 12.3 Accessibility Gate

Required:

- SVG name and concise chart summary
- focusable node controls or synchronized roving controls
- Enter/Space activation
- focus, hover, and touch parity
- Escape clears node selection
- filter-synchronized DOM mirror
- selection/filter live announcement
- 44×44 effective touch targets
- color-independent encoding
- focus restoration after Drawer close
- reduced-motion support
- Axe critical/serious zero plus manual SVG checks

## 12.4 Performance Gate

Measure on approved data:

- initial JS and route chunk size
- manifest and bundle bytes
- load/parse duration
- filter and selection latency
- frame budget during pan/resize if implemented
- DOM/SVG element counts
- memory
- failed requests and console errors

`/atlas` must be route-lazy-loaded.

---

# 13. Mock and Legacy Policy

Classifications:

```text
CANONICAL
CANDIDATE
DERIVED
FRONTEND_BUNDLE
MOCK
LEGACY
STALE
UNKNOWN
```

Rules:

1. `storyData.ts` Atlas records remain `MOCK`.
2. P3_0722 45-node bundle remains `LEGACY_PROVISIONAL_FIXTURE`.
3. Fixtures may be used only in development/tests with a visible provenance flag.
4. Production build must not silently fall back to fixtures.
5. Missing approved manifest produces `DataUnavailable`, not mock Atlas.
6. Legacy projection ID, coordinates, counts, and evidence IDs are never copied into the approved bundle.
7. Test fixtures must be minimal contract fixtures, not presented as empirical results.

---

# 14. Locked Decisions

| ID | Decision | State |
|---|---|---|
| D-001 | Single authoritative integration SSOT resides in `P3_FINAL/contracts` | LOCKED |
| D-002 | P3_FINAL contract authority is distinct from data-instance cutover | LOCKED |
| D-003 | Legacy UMAP/Atlas/frontend data is excluded from P3_FINAL | LOCKED |
| D-004 | All statuses use one joint projection | LOCKED |
| D-005 | Frontend never recomputes semantic entities | LOCKED |
| D-006 | `/ #answers` remains Story preview; `/atlas` is Full Explorer | LOCKED |
| D-007 | v1 Full Explorer is aggregate-only | LOCKED |
| D-008 | v1 renderer is SVG, subject to measured thresholds | LOCKED |
| D-009 | Domain behavior family is semantic; color mapping belongs to adapter/config | LOCKED |
| D-010 | Public evidence must be approved, public, and provenance-valid | LOCKED |
| D-011 | Canonical bundle lives in P3_FINAL; app public data is a hash-identical conforming copy | LOCKED |
| D-012 | `/atlas` state is URL-backed and restorable | LOCKED |
| D-013 | Evidence detail storage is abstracted; JSON vs Arrow selected after M8 sizing | DEFERRED |
| D-014 | Raw-point mode | DEFERRED / OUT OF V1 |
| D-015 | Current routing foundation is commit-ready but not committed | CONFIRMED |
| D-016 | Actual projection ID/model/counts remain unlocked until Gold-backed run passes | LOCKED AS PENDING |

---

# 15. Gate Register

| Gate | Current |
|---|---|
| `P3_FINAL_STRUCTURE_READY` | PASS |
| `RAW_HASH_PASS` | PENDING |
| `CORE_EQUIVALENCE_PASS` | PENDING |
| `SEMANTIC_BASELINE_EQUIVALENCE_PASS` | PENDING |
| `REVIEW_PROTOCOL_READY` | PENDING |
| `GOLD_LABELING_PASS` | PENDING |
| `PROJECTION_METHOD_CONTRACT_PASS` | CONTRACT DEFINED / INSTANCE PENDING |
| `PROJECTION_INSTANCE_PASS` | BLOCKED_BY_GOLD |
| `ATLAS_ENTITY_PASS` | BLOCKED_BY_PROJECTION |
| `EVIDENCE_TRACEABILITY_PASS` | NO DENOMINATOR |
| `FRONTEND_BUNDLE_SCHEMA_PASS` | CONTRACT DEFINED / FILES ABSENT |
| `APPROVED_FRONTEND_BUNDLE_PASS` | BLOCKED_BY_GOLD |
| `TECHNICAL_ROUTING_GATE_PASS` | PASS |
| `ROUTING_FOUNDATION_COMMITTED` | PENDING HUMAN REVIEW |
| `VIEWMODEL_ADAPTER_PASS` | NOT_IMPLEMENTED |
| `ATLAS_ROUTE_PASS` | NOT_IMPLEMENTED |
| `ATLAS_RENDER_PASS` | MOCK PREVIEW ONLY |
| `ACCESSIBILITY_PASS` | ROUTING/DRAWER PASS; ATLAS PENDING |
| `VISUAL_QA_PASS` | PENDING APPROVED DATA |

---

# 16. Implementation Blueprint

## Phase 0 — Contract and routing baseline

1. Install and hash-pin this SSOT.
2. Review the routing branch’s 61-file change map and `package-lock.json`.
3. Commit intentionally on `refactor/routing-technical-foundation`.
4. Do not mix Atlas feature work into that commit.

Exit:

```text
SSOT_LOCK_PASS
ROUTING_FOUNDATION_COMMITTED
```

## Phase 1 — Migration and schema readiness

1. Complete M2–M4 Gates.
2. Align entity registry and column dictionary with this SSOT.
3. Add future UMAP/Atlas entities to the registry without creating empty data payloads.
4. Add contract tests for IDs, dtype, nullability, enum values, and lifecycle.

Exit:

```text
RAW_HASH_PASS
CORE_EQUIVALENCE_PASS
SEMANTIC_BASELINE_EQUIVALENCE_PASS
UMAP_ENTITY_CONTRACT_READY
```

## Phase 2 — Review and Gold

1. Establish review protocol.
2. Produce accepted target-answer links.
3. Produce approved behavior labels and completion verification.
4. Sign Gold manifests.

Exit:

```text
REVIEW_PROTOCOL_READY
GOLD_LABELING_PASS
```

## Phase 3 — Approved analysis and Atlas

1. Build Gold-backed analysis mart.
2. Fit one all-status projection.
3. Compute high-dimensional centroids.
4. Produce topic bins, bounded display coordinates, nodes, members, and evidence lineage.
5. Validate distribution and traceability.

Exit:

```text
PROJECTION_INSTANCE_PASS
ATLAS_ENTITY_PASS
EVIDENCE_TRACEABILITY_PASS
```

## Phase 4 — Approved frontend bundle

1. Generate manifest and aggregate bundle.
2. Validate schema, row counts, hashes, publication rules, and size.
3. Copy to app runtime path as `CONFORMED_COPY`.

Exit:

```text
APPROVED_FRONTEND_BUNDLE_PASS
RUNTIME_BUNDLE_COPY_PASS
```

## Phase 5 — Frontend Atlas

1. Add `/atlas` lazy route and data-unavailable/error boundaries.
2. Implement loader, schemas, adapter, ViewModels, query state, SVG renderer, DOM mirror, and inspector.
3. Refactor Story preview to consume the same approved ViewModels.
4. Preserve Story visuals unless a separate design decision authorizes changes.

Exit:

```text
VIEWMODEL_ADAPTER_PASS
ATLAS_ROUTE_PASS
ATLAS_RENDER_PASS
ACCESSIBILITY_PASS
```

## Phase 6 — Integration and release

1. Verify IDs, versions, projection, row counts, hashes, query restoration, evidence links, responsive behavior, accessibility, and performance.
2. Capture deterministic visual regression evidence.
3. Declare cutover only after all required Gates pass.

Exit:

```text
VISUAL_QA_PASS
P3_FINAL_CUTOVER_PASS
```

---

# 17. Local Agent Prompt 1 — SSOT and Migration Custodian

```text
You are the P3_FINAL Contract and Migration Custodian.

Mission:
Install and enforce P3_CULTURE_UMAP_ATLAS_INTEGRATION_SSOT_v1.0 as the sole UMAP/Atlas integration authority while preserving the locked Core and Semantic contracts.

Current facts:
- P3_FINAL_STRUCTURE_READY is PASS.
- P3_FINAL is a canonical contract workspace but not yet the data authority.
- M2_RAW_SOURCE_MIGRATION is the next authorized migration step.
- Legacy embedding, UMAP, projection, Atlas, frontend source, and frontend bundle are excluded.
- Gold and approved exports must remain absent.
- The frontend routing foundation is on a separate branch and is not part of this migration task.

Allowed:
- Add the SSOT under P3_FINAL/contracts.
- Generate a SHA-256 lock manifest.
- Update contract indexes and registries where required to reference the SSOT.
- Add schema definitions for future UMAP/Atlas entities without creating data payloads.
- Run read-only validation and contract tests.
- Execute M2 only if explicitly authorized by the existing migration Gate sequence.

Forbidden:
- Copy or regenerate legacy UMAP/Atlas/frontend artifacts.
- Create empty Gold or approved Parquet.
- Declare data authority or cutover.
- Modify locked Core identifiers or text lineage.
- Modify the frontend repository.
- Commit or push unless explicitly instructed.

Required work:
1. Record source path, destination path, SHA-256, version, and lifecycle.
2. Reconcile ENTITY_REGISTRY, COLUMN_DICTIONARY, FUNCTION_REGISTRY, MIGRATION_MAP, and DATA_LIFECYCLE with the SSOT.
3. Add a contract-only registry for projection_models, projection_points, topic_bins, semantic_centroids, atlas_nodes, atlas_node_members, evidence_records, and frontend_manifest.
4. Verify that no physical UMAP/Atlas/approved bundle payload exists.
5. Produce a contradiction report rather than silently editing conflicts.
6. Report the exact next allowed Gate.

Required outputs:
- SSOT_INSTALLATION_REPORT.md
- SSOT_LOCK_MANIFEST.json
- CONTRACT_CROSSWALK.csv
- ENTITY_REGISTRY_DIFF.csv
- COLUMN_DICTIONARY_DIFF.csv
- MIGRATION_MAP_DIFF.csv
- CONTRACT_CONTRADICTIONS.md
- COMMAND_LOG.txt
- AGENT_1_MANIFEST.json

Final verdict:
SSOT_LOCK_PASS
or
SSOT_LOCK_BLOCKED
```

---

# 18. Local Agent Prompt 2 — Data and UMAP Pipeline Engineer

```text
You are the P3_FINAL Data, Semantic, Review, and UMAP Pipeline Engineer.

Mission:
Build the approved entity pipeline from migrated Core through Gold-backed projection, Atlas nodes, evidence lineage, and frontend export. Work strictly by Gate and never use excluded legacy projection/Atlas as authority.

Read first:
- P3_CULTURE_UMAP_ATLAS_INTEGRATION_SSOT_v1.0
- Core SSOT and parser addendum
- Semantic Contract
- Entity Registry, Column Dictionary, Migration Map, Data Lifecycle
- Latest migration Gate reports

Execution rule:
Do not execute a phase whose prerequisite Gate is absent. At the current M1 state, prepare schemas/tests/plans only unless M2 or later is explicitly authorized.

Locked rules:
- All statuses share one projection.
- Similarity and centroids are high-dimensional.
- Frontend receives computed entities and never recomputes them.
- Weak and Gold labels are separate.
- Node positions use topic; behavior is encoding; mass is radius; confidence is opacity.
- Collision display coordinates are deterministic and bounded.
- Legacy projection ID, node counts, and evidence records are reference-only.

Required pipeline:
Core
→ Semantic
→ Review candidates
→ Gold target-answer links and labels
→ approved analysis mart
→ embeddings
→ projection_models
→ projection_points
→ topic_bins
→ semantic_centroids
→ atlas_nodes
→ atlas_node_members
→ evidence_records
→ frontend_manifest and approved bundle

For every entity validate:
- grain
- PK/FK
- row count
- dtype
- nullable
- unique
- enum/domain
- data version
- pipeline run
- lifecycle
- public visibility
- frontend requirement

Projection validation:
- fit_scope exactly all_statuses
- one selected projection instance
- model name/revision/dimension/hash
- reproducible random state and parameters
- input_count equals point count
- finite coordinates and declared bounds
- no status-specific fits

Atlas validation:
- node count by status
- A1–A8 distribution
- topic-bin and centroid counts
- anchor/display displacement bound
- member coverage
- no orphan link
- representative public evidence
- node→member→Gold link→label→evidence→PDF/page traceability

Required outputs by executed phase:
- DATA_PIPELINE_PLAN.md
- UMAP_ATLAS_ENTITY_REGISTRY.csv
- UMAP_ATLAS_COLUMN_DICTIONARY.csv
- PIPELINE_DAG.json
- ENTITY_VALIDATION_REPORT.md/json
- PROJECTION_CONTRACT_ACTUAL.json
- ATLAS_DISTRIBUTION.csv
- EVIDENCE_TRACEABILITY.csv/json
- FRONTEND_EXPORT_MANIFEST.json
- COMMAND_LOG.txt
- AGENT_2_MANIFEST.json

Final verdict must match the highest completed Gate. Never claim PASS for blocked downstream entities.
```

---

# 19. Local Agent Prompt 3 — Frontend Atlas Engineer

```text
You are the P3_CULTURE Frontend Atlas Engineer.

Mission:
Preserve the verified routing foundation and implement the Story Preview and Full Atlas against the locked bundle, adapter, ViewModel, URL-state, accessibility, and performance contracts.

Current facts:
- Branch refactor/routing-technical-foundation has TECHNICAL_ROUTING_GATE_PASS.
- The branch is not committed or pushed.
- /atlas is not implemented.
- Current Story Answers is an 8-node mock SVG.
- Legacy 45-node data is not approved and is outside the app's Vite public root.
- Approved P3_FINAL frontend bundle is blocked by Gold.

Stage 0:
Before Atlas work, inspect the routing diff and package-lock. Produce a commit plan that separates routing foundation from Atlas feature work. Do not commit or push without explicit authorization.

Implementation order:
1. Add route-lazy `/atlas` with DataUnavailable, loading, error, empty, and invalid-node states.
2. Add shared/api/atlas manifest loader and runtime transport schema.
3. Add shared/lib/atlas adapter, URL query parser/serializer, and immutable projection scaler.
4. Add shared/types/atlas ViewModels.
5. Add shared/config/atlas encoding dictionary and projection warnings.
6. Build aggregate SVG AtlasScene and synchronized DOM mirror.
7. Build Atlas controls, selection inspector, and evidence navigation.
8. Refactor ChapterAnswersAtlas to consume the same ViewModel contract.
9. Connect only an approved bundle. In development/tests, a fixture must be explicitly tagged LEGACY_PROVISIONAL_FIXTURE or CONTRACT_FIXTURE.
10. Production must never fall back to fixture data.

FSD boundaries:
- app owns router/providers/shell.
- pages own route composition.
- widgets own product interaction.
- shared/api owns transport validation.
- shared/lib owns adapter/query/scale.
- shared/config owns visual encoding.
- shared/types owns ViewModels.
- No reverse imports to app.

Renderer:
- v1 aggregate-only SVG.
- no browser UMAP, centroid, aggregation, force, or random jitter.
- scale once from projection-wide bounds.
- grid and marks share one plot rectangle.
- display coordinates are rendered; anchor coordinates remain audit metadata.

URL state:
- /atlas?status=...&types=...&node=...&view=nodes
- canonicalize A1–A8 order
- reload and Back/Forward restore state
- Story preview carries filters to /atlas
- Evidence direct page and background Drawer both work

Accessibility:
- SVG label/summary
- keyboard node traversal
- Enter/Space activation
- focus/hover/touch parity
- Escape clear
- DOM mirror
- live announcements
- 44px effective targets
- focus return
- reduced motion
- Axe plus manual SVG checks

Required outputs:
- FRONTEND_ATLAS_IMPLEMENTATION_REPORT.md/json
- FILE_CHANGE_MAP.csv
- ROUTE_QUERY_MATRIX.csv
- VIEWMODEL_CONTRACT_DIFF.csv
- BUNDLE_LOAD_AUDIT.csv
- ACCESSIBILITY_REPORT.csv
- PERFORMANCE_REPORT.json
- VISUAL_QA_INDEX.md
- COMMAND_LOG.txt
- AGENT_3_MANIFEST.json

Required Gates:
ROUTING_FOUNDATION_REVIEWED
VIEWMODEL_ADAPTER_PASS
ATLAS_ROUTE_PASS
ATLAS_RENDER_PASS
ACCESSIBILITY_PASS

Do not claim real-data PASS while the approved manifest is absent.
```

---

# 20. Local Agent Prompt 4 — Data–Frontend Integration and Release QA Director

```text
You are the P3_CULTURE Data–Frontend Integration and Release QA Director.

Mission:
Independently compare P3_FINAL data outputs, approved frontend bundle, and frontend runtime. Do not implement features. Decide whether the system may enter the next Gate or cut over.

Sources:
- P3_CULTURE_UMAP_ATLAS_INTEGRATION_SSOT_v1.0
- latest migration/data/frontend manifests
- actual local files and hashes
- current frontend branch/commit
- automated and browser QA evidence

Compare in this order:
1. canonical roots and repository ownership
2. SSOT version and hash
3. data version, pipeline run ID, projection ID, projection hash
4. entity row counts, PK/FK, dtype, nullability, enums
5. manifest file list, hashes, sizes, and row counts
6. canonical export versus runtime CONFORMED_COPY
7. repository → validator → adapter → ViewModel → renderer trace
8. node → member → Gold link → label → evidence → PDF/page trace
9. route/query reload and Back/Forward restoration
10. Story Preview and Full Explorer coordinate/encoding parity
11. mock/legacy isolation
12. responsive, accessibility, performance, visual regression

Required runtime scenarios:
- /#answers direct
- preview filter and reset
- preview → /atlas filter carry
- /atlas direct/reload
- status/type combinations including no match
- selected node deep link
- invalid node
- node → evidence Drawer
- evidence direct URL
- browser Back/Forward
- 375, 768, 1440, 1920 viewports
- reduced motion
- keyboard-only traversal
- production build with no approved bundle
- production build with approved bundle
- fixture fallback prohibition

Required outputs:
- INTEGRATION_INTELLIGENCE_REPORT.md/json
- VERSION_HASH_CROSSCHECK.csv
- ENTITY_BUNDLE_COUNT_DIFF.csv
- DATAFLOW_TRACE.md
- EVIDENCE_TRACEABILITY_REPORT.csv/json
- ROUTE_QUERY_QA.csv
- ACCESSIBILITY_QA.csv
- PERFORMANCE_QA.json
- VISUAL_REGRESSION_INDEX.md
- MOCK_LEGACY_ISOLATION.csv
- GATE_DECISION.json
- COMMAND_LOG.txt

Allowed verdicts:
DATA_ENTITY_AUDIT_PASS
PROJECTION_CONTRACT_LOCKED
FRONTEND_BUNDLE_CONTRACT_LOCKED
VIEWMODEL_ADAPTER_PASS
ATLAS_ROUTE_PASS
ATLAS_RENDER_PASS
EVIDENCE_TRACEABILITY_PASS
ACCESSIBILITY_PASS
VISUAL_QA_PASS
P3_FINAL_CUTOVER_PASS

If evidence is missing, use BLOCKED or NOT_VERIFIABLE. Never infer a PASS from a document label alone.
```

---

# 21. Final Lock Statement

This SSOT locks the integration architecture and contracts. The next valid sequence is:

```text
review and commit routing foundation
+ install/hash-pin SSOT
→ M2 RAW_HASH_PASS
→ M3 CORE_EQUIVALENCE_PASS
→ M4 SEMANTIC_BASELINE_EQUIVALENCE_PASS
→ M5 GOLD_LABELING_PASS
→ Gold-backed projection and Atlas
→ approved frontend bundle
→ /atlas integration and final QA
```

No legacy projection, legacy Atlas node, draft/private evidence, or mock frontend record may cross into approved production data.
