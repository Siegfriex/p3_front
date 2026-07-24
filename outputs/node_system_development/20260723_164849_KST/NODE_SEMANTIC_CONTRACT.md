# Node Semantic Contract

## Locked decisions

- D-017: padded isotropic projection mapping, uniform scale, centered letterbox, immutable full-projection domain.
- D-018: directional half-plane → angular deviation → projected distance → canonical ID.
- D-019: visual radius equals ViewModel `radiusPx`; independent minimum 44px pointer target; deterministic overlap resolution.
- D-020: `matched | context | excluded`. Story may render noninteractive context; Full Explorer excludes unmatched nodes.
- D-021: raw confidence remains in ViewModel; semantic confidence and interaction emphasis are composed separately. Current floor is provisional pending approved distribution.

## Semantic mapping

```text
position = approved display coordinate in topic space
shape = behavior family
inner mark = answer type A1-A8
radius = upstream radiusPx
opacity = adapter/config confidence presentation
stroke = status
red outer ring = selected
dark/paper halo = keyboard focus
```

Anchor coordinates remain audit metadata. No frontend aggregation, dedupe, force, jitter, collision displacement, UMAP, centroid, mass, radius, status, behavior, or proximity edge computation is allowed.

## Ownership handoff

Agent 3 owns semantic tokens, glyph construction, projection scaling, hit testing, navigation, parity, Scene node semantics, DOM navigator contract, and core node E2E. Agent 4 may change composition and presentation through existing semantic tokens/props but must not rewrite these contracts.
