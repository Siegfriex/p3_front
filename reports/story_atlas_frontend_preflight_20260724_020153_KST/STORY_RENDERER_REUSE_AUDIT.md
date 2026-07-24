# Story renderer reuse audit

Verdict: renderer reuse is feasible, but `AtlasExplorer` as a whole is not the right Story component.

- Reuse directly: `AtlasScene` (finalized nodes), `AtlasDomMirror` (keyboard owner), `AtlasControls`, `AtlasLegend`, `AtlasNodeGlyph`, accessibility helpers, hit testing, navigation, and encoding config.
- Recompose for Story: editorial header/metadata, approved subset, local/URL-backed filter state, compact layout, and CTA.
- Do not reuse in Story: full release rail, full selection inspector, invalid-node deep-link behavior, or all-node Explorer composition unless the product decision explicitly wants them.
- `AtlasScene` does not aggregate or recompute semantic positions. It renders `screen`, preserves anchor/display audit attributes, and filters only via supplied states.
- Story must call `selectStoryAtlasNodes` before the renderer. The selector requires Explorer nodes, a nonempty unique approved node ID list, and matching Story/Explorer release and projection IDs.
- Screen coordinates may differ by viewport; semantic anchor/display, radius, encoding, status, type, family, mass, and confidence must remain equal.

Current blocker: DG761 manifest and bundle contain no `story_preview_node_ids`. Frontend selection is therefore forbidden.
