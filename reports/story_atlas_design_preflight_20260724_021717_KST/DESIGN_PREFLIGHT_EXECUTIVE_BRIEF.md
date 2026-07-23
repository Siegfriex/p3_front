# Story–Atlas Design Preflight Executive Brief

## Executive verdict

`STORY_ATLAS_DESIGN_PREFLIGHT_READY`

The design contract is ready for implementation, while implementation cutover and final Visual QA are not ready. Story remains a limited 16-node editorial scene at `/#answers`; Full Explorer remains a 140-node aggregate analysis route at `/atlas`; Evidence Detail remains one canonical record presented as a background Drawer/Bottom Sheet or direct page. All three must consume one approved release, projection, ViewModel and encoding system.

The design verdict does not approve the current data release, the candidate 16-node selection, the Story implementation, EvidenceRepository wiring, or production Visual QA.

This report is an evidence-cutoff snapshot at `2026-07-24T02:39:34+09:00`. Concurrent implementation edits began under `src/shared/api/atlas/`, `src/shared/lib/atlas/` and `src/shared/types/` after the cutoff. They were preserved and not incorporated into this preflight; the post-implementation Visual QA must evaluate the stabilized tree against these contracts.

## Current evidence

- Story is fail-closed and has no renderer, controls, DOM navigator or evidence action.
- Explorer renders the 140-node DG761 release only because an ignored local environment override selects it.
- The finalized frontend preflight is `FRONTEND_RELEASE_PREFLIGHT_READY` and recommends `atlasReleaseResource.ts` plus `useAtlasRelease.ts`; that readiness is an implementation blueprint, not release approval.
- The latest release-build handoff is `STORY_ENABLED_CANONICAL_RELEASE_BLOCKED`; the approved Story 16-node ID list is absent.
- A release-valid evidence ID is rejected by the current DEV evidence route because the route reads mocks rather than the Atlas repository.
- The 140-node map has 532 visual-overlap pairs and 1,133 hit-area-overlap pairs. All 140 nodes participate in at least one hit overlap; maximum overlap degree is 35.
- The 16-node data-preflight candidate has 16 visual-overlap pairs and 20 hit-area-overlap pairs. It is candidate evidence only, not the locked Story contract.
- Runtime checks confirmed 44×44 minimum targets, URL Back/Forward restoration, keyboard spatial traversal, Enter selection, Escape clear, reduced-motion CSS and Drawer focus return.
- Runtime checks contradicted unique node naming: 140 DOM buttons expose only 20 unique accessible names.

## Locked product roles

1. Story Preview teaches the encoding, shows a bounded editorial subset and hands filters to Full Explorer. It never asks the reader to analyze all nodes.
2. Full Explorer keeps the map as the primary object, with controls, legend, inspector, method/provenance access and synchronized DOM navigation.
3. Evidence Detail preserves the same record content and status semantics in Drawer/Bottom Sheet and direct-page contexts.

## Locked visual decisions

- Light archival surface, red Evidence Line continuity and existing chapter cadence remain.
- Canonical `720×520` viewBox and immutable projection domain are shared. Viewport/chrome/label density may differ; coordinates, radius and encoding may not.
- Family uses shape plus fill; A1–A8 use inner marks/labels; status uses stroke/dash; confidence uses opacity; mass uses radius.
- Focus uses an outer neutral/high-contrast halo. Selection uses a separate inner red ring. Focused-selected displays both.
- Legend sits before the scene, not after a 140-row navigator.
- Mobile inspector remains in flow below the scene; Evidence uses the modal Bottom Sheet.
- Filter changes never animate coordinates. Reduced motion disables glyph scale/translation and smooth scroll.

## Integration blockers

1. Final approved 16-node IDs and selection hash are missing.
2. Upstream display coordinates require a collision decision; frontend jitter, force layout and coordinate mutation remain prohibited.
3. Data member-grain SSOT contradiction blocks the story-enabled canonical release.
4. Story and Evidence routes do not consume the shared approved release resource/repository.
5. DOM node names are not unique enough for nonvisual navigation.

## Gate disposition

- `STORY_PREVIEW_DESIGN_CONTRACT_LOCKED`: PASS
- `FULL_EXPLORER_DESIGN_CONTRACT_LOCKED`: PASS
- `VISUAL_PARITY_CONTRACT_LOCKED`: PASS
- `INTERACTION_CONTRACT_LOCKED`: PASS
- `RESPONSIVE_CONTRACT_LOCKED`: PASS
- `EVIDENCE_UX_CONTRACT_LOCKED`: PASS
- `ACCESSIBILITY_VISUAL_CONTRACT_LOCKED`: PASS
- `VISUAL_QA_CONTRACT_READY`: PASS
- Post-implementation `VISUAL_QA_PASS`: NOT_EXECUTED

## Report path

`/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front/reports/story_atlas_design_preflight_20260724_021717_KST`
