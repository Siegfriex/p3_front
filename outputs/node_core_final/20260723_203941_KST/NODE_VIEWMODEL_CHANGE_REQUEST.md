# Node ViewModel Change Request

Status: `REQUIRED / NOT IMPLEMENTED / BLOCKED_BY_APPROVED_DATA`

## 1. Story subset contract

Add the following field to the approved Atlas summary transport and validated ViewModel boundary:

```ts
interface AtlasSummaryTransport {
  node_count: number;
  story_preview_node_ids: string[];
}
```

Validation requirements:

- IDs are unique.
- Coverage against the Full Explorer node set is 100%.
- Story and Explorer release ID and projection ID match.
- Selection preserves the same node object identity, `anchor`, `display`, `radiusPx`, confidence, and encoding.
- Empty or missing IDs keep production Story in `DataUnavailable`.
- The frontend must not substitute top-mass, top-confidence, random, topic-label, or hard-coded IDs.

The current production `ChapterAnswersAtlas` correctly remains fail-closed. The existing `selectStoryAtlasNodes` helper is ready to consume the approved list after the transport and adapter layers expose it.

## 2. Evidence summary contract

Add approved nullable excerpts to the transport and ViewModel:

```ts
interface EvidenceSummaryViewModel {
  questionExcerpt: string | null;
  answerExcerpt: string | null;
}
```

Rules:

- Values must be backed by approved public evidence transport.
- Missing values remain `null`; components do not read raw evidence JSON.
- Node selection updates the summary and live announcement only.
- Evidence opening remains a separate CTA and is available only when `isPublicEvidenceAvailable` and the representative evidence ID are both valid.

## 3. Approved radius and confidence metadata

Before a real-data render Gate is evaluated, expose or derive from the complete approved node set:

- maximum approved `node_radius`
- confidence null count and approved confidence distribution summary
- release and projection identifiers used for the measurement

These values are required to validate projection padding and to replace the current provisional opacity floor. No final radius-density or confidence-distribution PASS is claimed by Agent 3.

## 4. Current verdict

```text
VIEWMODEL_REQUIREMENTS_READY
APPROVED_STORY_SUBSET_NOT_AVAILABLE
APPROVED_EVIDENCE_EXCERPTS_NOT_AVAILABLE
REAL_DATA_NODE_PRESENTATION_NOT_VERIFIABLE
```
