# Node Semantic Contract

- Renderer input is `AtlasNodeViewModel` only.
- `anchor` is audit metadata; `display` is upstream bounded display; `screen` is shared immutable-domain projection.
- Browser-side UMAP, aggregation, mass calculation, dedupe, centroid calculation, force, jitter, collision displacement, and proximity edges are prohibited.
- Story and Explorer reuse the same node identity, projection, display, radius, confidence, and encoding.
- Production without an approved bundle or approved Story ID list remains fail-closed.
- Default edge count is zero.
- Actual data PASS is not implied by fixture PASS.
