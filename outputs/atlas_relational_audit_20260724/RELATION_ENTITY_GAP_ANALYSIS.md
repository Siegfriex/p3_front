# Relationship entity gap analysis

Verdict: `RELATION_DATA_BLOCKED`

No approved relationship entity exists in the current authority chain. The present `node-evidence-links.json` connects a node to an Evidence record; it is not a node-to-node relationship table and must not be repurposed as one.

## Required upstream entity

Logical name: `atlas-relationship-edges`
Canonical entity: `atlas_relationship_edges`

Minimum fields:

`edge_id`, `source_node_id`, `target_node_id`, `relation_type`, `directed`, `weight`, `weight_basis`, `confidence`, `rank_within_source`, `relation_evidence_count`, `relation_label`, `relation_explanation`, `shared_target_issue_id`, `shared_topic_bin_id`, `shared_evidence_ids`, `source_year`, `target_year`, `public_visibility`, `projection_id`, `data_version`, `pipeline_run_id`, `edge_version`.

Validation must prove node foreign keys, duplicate policy, self-loop policy, finite weights, nonblank basis, public Evidence eligibility, temporal direction, and that semantic-neighbor weights were computed in the approved high-dimensional embedding rather than UMAP 2D space.

## Production behavior until supplied

- Map View remains available.
- Relations View renders an explicit `RELATION_DATA_BLOCKED` DataUnavailable state.
- Evidence View renders only approved node/Evidence provenance already present.
- No mock edge is a production fallback.
