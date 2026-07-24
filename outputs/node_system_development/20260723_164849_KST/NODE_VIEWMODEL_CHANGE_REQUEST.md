# Node ViewModel Change Request

Status: `REQUIRED / NOT APPROVED / NOT IMPLEMENTED`

## Requested contracts

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

`story_preview_node_ids` must live in a manifest-registered SHA-256-validated body. IDs must be nonempty, unique, exist in the Full Explorer node set, and match release/projection. The selector preserves object identity, coordinates, source radius, confidence, and encoding.

The current Decision Logs do not approve these fields. Therefore production Story remains DataUnavailable. No raw evidence, top mass, top confidence, random, visually convenient, or frontend hard-coded fallback is permitted.
