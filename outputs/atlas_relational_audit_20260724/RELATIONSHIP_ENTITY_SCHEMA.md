# atlas_relationship_edges upstream contract

Status: `CANDIDATE CONTRACT` · runtime entity: `ABSENT` · production UI: `RELATION_DATA_BLOCKED`

```ts
interface AtlasRelationshipEdgeTransport {
  edge_id: string;
  source_node_id: string;
  target_node_id: string;
  relation_type:
    | 'semantic_neighbor'
    | 'shared_target'
    | 'same_topic_cross_behavior'
    | 'shared_evidence_context'
    | 'temporal_continuity';
  directed: boolean;
  weight: number;
  weight_basis: string;
  confidence: number | null;
  rank_within_source: number;
  relation_evidence_count: number;
  relation_label: string | null;
  relation_explanation: string | null;
  shared_target_issue_id: string | null;
  shared_topic_bin_id: string | null;
  shared_evidence_ids: string[] | null;
  source_year: number | null;
  target_year: number | null;
  public_visibility: boolean;
  projection_id: string;
  data_version: string;
  pipeline_run_id: string;
  edge_version: string;
}
```

## Required upstream validations

1. Source and target must exist in the same approved node registry.
2. Self-loops are rejected unless a future relation subtype explicitly permits them.
3. Undirected edges use a canonical source/target ordering; directed duplicates have an explicit policy.
4. `weight` is finite, `weight_basis` is nonblank, and `rank_within_source >= 1`.
5. Public edges reference public-eligible Evidence only.
6. Temporal direction is verified from source records.
7. `semantic_neighbor` is computed from the approved high-dimensional embedding, never UMAP 2D distance.
8. Projection/data/pipeline/edge versions are present and internally consistent.

No fixture or legacy edge may be copied into the production release path.
