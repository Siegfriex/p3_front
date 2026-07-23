# Agent 3 Node Core Change Request

No Agent 3 core file was modified. The following additions are requested as versioned ViewModel fields before the corresponding presentation can activate:

1. Approved topic-region label state (`approved`, `provisional`, `unlabeled`), rationale, medoid ID, and screen-mapped anchor/contour geometry.
2. Screen-mapped centroids with explicit type (`marker`, `answer`, `topic`) and provenance.
3. PCA 2D/3D node coordinates, axis names, and explained variance.
4. Optional UMAP 3D and Tensor payloads with method metadata and quality metrics.
5. Stable unique accessible node names that include `atlas_node_id` when semantic labels repeat.

The request does not authorize coordinate scaling, radius, hit-testing, angular keyboard navigation, aggregation, or node identity changes.
