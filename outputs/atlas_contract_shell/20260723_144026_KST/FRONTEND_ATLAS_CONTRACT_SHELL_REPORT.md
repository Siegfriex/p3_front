# P3_CULTURE Frontend Atlas Contract Shell Report

## Final verdicts

```text
ROUTING_FOUNDATION_COMMIT_READY
ATLAS_CONTRACT_SHELL_PASS
```

These verdicts are limited to F0 routing-boundary readiness and the F1 technical contract shell. They do not assert approved bundle, real-data rendering, evidence traceability, accessibility on real nodes, or P3_FINAL cutover.

## 1. Repository preflight

| Item | Evidence | Result |
|---|---|---|
| Canonical app | `/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front` | CONFIRMED |
| Branch | `refactor/routing-technical-foundation` | MATCH |
| HEAD | `6f4835292abe9bc0cbbed81469b21c25c4e95777` | UNCHANGED |
| Commit authorization | `AUTH_COMMIT_ROUTING_FOUNDATION` absent | NO COMMIT |
| Index | `git diff --cached` empty | UNSTAGED |
| SSOT | `SSOT/P3_0723_CULTURE_UMAP_ATLAS_INTEGRATION_SSOT_v1.0.md` | READ IN FULL |
| SSOT SHA | `99ee7cb16039afbebbd1373aa58e22aa89fd4ba257d26da3648e9422cf2bfb2d` | LOCK MATCH |
| Package lock | lockfile v3; name/version/dependency maps match package | CONSISTENT |
| Historical outputs | numerous untracked audit/recovery bundles | PRESERVED / EXCLUDED |

No package installation, Git staging, commit, or push was performed.

## 2. Routing foundation boundary

The technical routing Gate's exact source/tooling files remain the routing commit candidate. `package-lock.json` is included. Historical outputs, prompts, SSOT copies, concurrent UX audit files, and Agent 3 outputs are excluded.

The new `/atlas` route necessarily adds one hunk to `src/app/router/AppRouter.tsx`, which already contains the uncommitted routing foundation. A later routing-only commit must hunk-stage this file and exclude:

- React `lazy`/`Suspense` additions for Atlas
- `LazyAtlasPage`
- `atlasRouteLoading`
- `<Route path="atlas">`

All other Atlas source is isolated in new FSD paths. Agent 3 did not modify Story or Scale.

Routing QA status:

- TypeScript, ESLint, Vitest, production build: PASS
- Existing technical routing Playwright: 7/7 PASS
- Existing route/modal Axe critical/serious: 0
- Existing console/request checks: PASS

Because authorization is absent, the result is `ROUTING_FOUNDATION_COMMIT_READY`, not committed.

## 3. `/atlas` contract route

`/atlas` is route-lazy-loaded into a separate production chunk. It implements:

- Suspense route loading state
- manifest/bundle loading state
- explicit route/transport error state
- DataUnavailable state
- zero-node and filter-empty states
- invalid selected-node state

Production release resolution is explicit through `VITE_ATLAS_RELEASE_ID`. With no approved release configured, `loadAtlasManifest` returns `NO_APPROVED_RELEASE_CONFIGURED` before calling fetch. A configured 404 returns `APPROVED_MANIFEST_NOT_FOUND`. Neither path falls back to `storyData.ts`, the excluded 45-node bundle, or a fixture.

## 4. FSD implementation

```text
app/router/AppRouter.tsx            lazy route only
pages/atlas/                        route composition and errors
widgets/atlas-explorer/             controls, scene, inspector, DOM mirror
shared/api/atlas/                   transport, manifest, bundle, evidence repository
shared/lib/atlas/                   adapter, query state, projection scale
shared/config/atlas/                visual encoding and warnings
shared/types/atlas.ts               transport-independent ViewModels
```

Static scans found:

- pages/widgets/shared → app reverse imports: 0
- shared → pages/widgets imports: 0
- raw pipeline field names in Atlas page/widget components: 0
- undefined CSS variables: 0

## 5. Transport and ViewModel contract

Implemented ViewModels:

- `AtlasNodeViewModel`
- `TopicBinViewModel`
- `CentroidViewModel`
- `EvidenceSummaryViewModel`
- `AtlasViewModelBundle`

Transport and ViewModels are separate. Runtime validation rejects:

- string `"<NA>"`
- numeric strings and non-finite numbers
- negative counts/mass and out-of-range probabilities
- red/amber/blue as domain behavior families
- publication-ready false
- unsafe file paths, duplicate logical names, missing required files
- draft/private evidence
- mismatched file SHA-256, projection ID, or projection hash

Domain behavior values remain semantic. `atlasEncoding.ts` owns shape/fill mapping and status stroke mapping. Components receive only finalized ViewModels.

## 6. URL state

Canonical contract:

```text
/atlas?status=all|complete|active|unresolved
      &types=A1,A2,...
      &node=<atlas_node_id>
      &view=nodes
```

- A1–A8 ordering is canonicalized by the serializer.
- Invalid values are reported and interpreted safely without passive URL mutation.
- Default/reset serializes to `/atlas` with Atlas parameters removed.
- Explicit control/selection actions create restorable history entries.
- Reload, Back, and Forward were verified with a contract fixture.
- `buildAtlasHrefFromPreview` provides the Story filter handoff contract. Story was not edited because that file belongs to the pending routing commit boundary.

## 7. Fixture isolation

The minimal fixture exists only in tests and uses:

- `contract-projection-001`
- `contract-node-001/002`
- `contract-evidence-001`

It does not use the legacy projection ID or `ev-101`. Dev fixture rendering requires explicit environment variables and shows a visible provenance banner. Production build contains no fixture payload or legacy identifier in the Atlas lazy chunk.

## 8. Renderer shell

- aggregate-only SVG
- fixed 720×520 viewBox
- immutable projection bounds
- one shared 600×408 plot rectangle for background grid and marks
- display coordinates rendered
- anchor coordinates retained as audit metadata
- no browser UMAP, centroid computation, aggregation, force simulation, or random jitter
- synchronized DOM mirror
- no raw-point mode

The production lazy Atlas chunk is 31,015 bytes raw / 9,663 bytes gzip. No real-data performance claim is possible before an approved bundle exists.

## 9. Accessibility contract readiness

Implemented and tested with the two-node contract fixture:

- accessible SVG name and concise description
- visible chart summary
- focusable SVG node buttons
- Enter selection and Escape clear
- focus/pointer/touch activation parity baseline
- synchronized native-button DOM mirror
- polite selection/filter live region
- 44px DOM mirror/control target policy and enlarged SVG hit region
- semantic shape plus color encoding
- existing route-driven Drawer focus compatibility
- no new animation; existing reduced-motion foundation retained
- Axe critical/serious 0 at 375px fixture state

This is `CONTRACT/SHELL READY`, not real-data accessibility PASS.

## 10. QA summary

| Gate | Final result |
|---|---|
| Typecheck | PASS |
| ESLint | PASS, zero warnings |
| Vitest | PASS, 9 files / 23 tests |
| Production build | PASS, 2,150 modules |
| Lazy route chunk | PASS, 9,663 bytes gzip |
| Routing Playwright | PASS, 7/7 |
| Atlas fixture Playwright | PASS, 3/3 |
| Production no-manifest Playwright | PASS, 2/2 |
| Axe fixture critical/serious | 0 / 0 |
| Unexpected console errors | 0 |
| Unexpected application request failures | 0 |
| FSD import scan | PASS |
| Undefined CSS variables | 0 |
| Production fixture/legacy scan | PASS |

The sandbox initially denied localhost binding, and an existing port-3000 server caused one fixture orchestration false start. The existing process was preserved. Final browser QA ran independently on port 3001 and production preview on port 4176.

## 11. Remaining data-dependent work

- Approved P3_FINAL manifest and conforming runtime copy do not exist.
- Real node count, labels, overlaps, evidence coverage, and bundle sizes are unknown.
- Story preview still uses its existing 8-node mock; it was deliberately not connected or refactored in F1.
- Arrow evidence detail transport is abstracted but intentionally not implemented.
- Real-data responsive, performance, accessibility, and visual QA remain pending.

## 12. Prohibited claims

This report does not declare:

- `APPROVED_FRONTEND_BUNDLE_PASS`
- real-data `ATLAS_RENDER_PASS`
- `EVIDENCE_TRACEABILITY_PASS`
- `P3_FINAL_CUTOVER_PASS`

## Final

`ROUTING_FOUNDATION_COMMIT_READY`

`ATLAS_CONTRACT_SHELL_PASS`
