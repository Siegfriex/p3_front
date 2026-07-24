# Relation ViewModel contract

The frontend adapter may map validated transport fields to rendering tokens, but may not calculate topology, similarity, rank, weight, or Evidence eligibility.

```ts
interface AtlasRelationViewModel {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  type: AtlasRelationType;
  directed: boolean;
  weight: number;
  confidence: number | null;
  rankWithinSource: number;
  evidenceCount: number;
  label: string;
  explanation: string | null;
  source: { x: number; y: number };
  target: { x: number; y: number };
  encoding: {
    lineToken: string;
    widthToken: string;
    dashToken: string;
    opacity: number;
    markerToken: string | null;
  };
}

interface AtlasRelationSummaryViewModel {
  selectedNodeId: string;
  directRelationCount: number;
  semanticNeighborCount: number;
  sharedTargetCount: number;
  crossBehaviorCount: number;
  sharedEvidenceCount: number;
  temporalContinuityCount: number;
}
```

Current implementation exposes the type boundary but sets `relations: null`, causing the Relations view to fail closed.
