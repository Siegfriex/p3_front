# Agent 4 Node System Handoff

## Stable semantic surface

Agent 4 may compose and style `AtlasNodeGlyph`, `AtlasScene`, inspector placement, legend layout, and responsive presentation through the existing props and semantic CSS tokens.

Do not rewrite:

- family → shape and A1–A8 mark mappings
- status dash mapping
- source radius preservation
- minimum 44px hit target and deterministic resolver
- padded isotropic scaler
- spatial keyboard ranking
- `matched | context | excluded` semantics
- independent focus halo and selected ring
- DOM mirror as sole keyboard owner
- Story–Explorer parity selector and tests

## Presentation-safe extension points

- CSS variables referenced by `fillToken`, `strokeToken`, focus and selection tokens
- label typography/leader presentation without moving node coordinates
- surrounding composition and breakpoint layout
- legend presentation that preserves shape+mark+status distinctions
- forced-colors/reduced-motion styles that preserve state distinctions

## Blocked inputs

Do not render production Story nodes until approved `story_preview_node_ids` exist. Do not synthesize Evidence excerpts. Do not treat the provisional confidence floor or 2-node performance as an approved real-data distribution.

Any requested semantic change must be made through Agent 3 contract/config props and must retain the node owner test suite.
