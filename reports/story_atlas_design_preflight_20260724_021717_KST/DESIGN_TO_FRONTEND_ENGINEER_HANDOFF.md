# Design to Frontend Engineer Handoff

## Outcome

Implement Story Preview and repair Explorer/Evidence integration against the locked contracts in this directory. Do not treat this handoff as approval of the current 16-node candidate, DG761 as the canonical current release, or post-implementation Visual QA.

## Required order

1. Obtain an approved Story 16-node ID contract and resolve the upstream display-coordinate collision decision.
2. Introduce one cached approved release resource used by Story, Explorer and EvidenceRepository.
3. Compose `ChapterAnswersAtlas` from the shared ViewModels and approved selector. Reuse the canonical scene/glyph/encoding; add Story-only chrome, label density and summary depth only.
4. Place result count and legend before the Explorer scene. Keep map/inspector hierarchy.
5. Make every DOM navigator name unique while preserving spatial keyboard movement.
6. Wire release-valid evidence IDs to the same record model in Drawer/Bottom Sheet and direct page.
7. Apply component-scoped responsive and motion rules. Do not redesign other chapters.
8. Execute every scenario in `VISUAL_QA_ACCEPTANCE_CRITERIA.csv`; a separate reviewer decides final Visual QA.

## Non-negotiable preservation

- One release, projection, domain, ViewModel and encoding system
- Untouched anchor/display coordinates and upstream radius
- No browser UMAP, aggregation, force, jitter or collision displacement
- Fail-closed production when approved data is absent
- Story Evidence Line and editorial cadence
- URL-backed state and Back/Forward restoration
- Reported status distinct from independent verification

## Known blockers

- Final approved Story 16-node IDs absent
- Candidate Story set: 16 visual overlaps and 20 hit overlaps
- Full Explorer: 532 visual overlaps and 1,133 hit overlaps
- Data member-grain contract contradiction
- Repository and release pointer handoffs incomplete

## Required evidence for review

- Field-level Story/Explorer node parity JSON
- 375/768/1440/1920 screenshots
- URL state and focus logs
- 140/140 unique accessible names
- 44×44 target audit plus overlap report
- forced-colors, reduced-motion and 200% zoom captures
- drawer/direct semantic-content parity
- source/data/config hash proof and approved release ID/hash
