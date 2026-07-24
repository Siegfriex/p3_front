# PCA–UMAP Compare Specification

The compare view synchronizes node identity, not absolute coordinate position.

| Pane | Current behavior | Activation requirement |
|---|---|---|
| UMAP 2D | Approved canonical nodes rendered | Current release bundle |
| PCA 2D | Contract frame only; no nodes | Versioned PCA coordinates plus PC1/PC2 explained variance |

When PCA data is approved, both panes must preserve `atlas_node_id`, selection, glyph grammar, radius, status, confidence, and textual navigator identity. The UI may report neighbor preservation and displacement only when those metrics are supplied by the data contract. It must state that PCA summarizes variance linearly, UMAP preserves local neighborhoods nonlinearly, and their coordinates are not directly comparable absolute coordinates.

Gate: `PCA_UMAP_COMPARE_VID_PASS` for the implemented comparison contract, not `PCA_MODEL_PASS`.
