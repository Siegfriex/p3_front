# Story Atlas ViewModel Change Request

Status: `DRAFT / NOT IMPLEMENTED / BLOCKED BY CONCURRENT SOURCE DRIFT`

## Required approved frontend fields

1. A deterministic editorial Story preview node ID list in a manifest-registered, SHA-256-validated JSON body, preferably `atlas-summary.json.story_preview_node_ids`.
2. Optional public `questionExcerpt` and `answerExcerpt` fields on `EvidenceSummaryViewModel`, backed by approved evidence transport.

## Reason

The current `AtlasViewModelBundle` has no approved Story subset selector input. Selecting top mass, top confidence, visually convenient coordinates, random nodes, or topic-label-based exclusions in the frontend would violate the locked contract.

The current `EvidenceSummaryViewModel` exposes a title and provenance/status metadata but not the one-line question and answer excerpts required by the Story evidence summary. Components must not read raw evidence fields to fill this gap.

## Proposed non-breaking shape

```ts
interface AtlasSummaryTransport {
  node_count: number;
  story_preview_node_ids: string[];
}

interface EvidenceSummaryViewModel {
  questionExcerpt: string | null;
  answerExcerpt: string | null;
}
```

The approved preview IDs must all exist in the Full Explorer node set. The selector must preserve node object identity, display/anchor coordinates, radius, and encoding.
