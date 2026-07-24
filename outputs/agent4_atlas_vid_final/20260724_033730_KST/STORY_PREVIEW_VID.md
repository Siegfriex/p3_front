# Story Preview VID

Route `/#answers` is the editorial entry named “어떻게 답했나”. It shares the complete 140-node canonical field with Explorer and identifies 16 approved nodes as editorial anchors. This keeps spatial continuity while preserving a shallower Story reading depth.

## Implemented composition

1. Chapter marker, headline, thesis, and projection warning.
2. Eight-type A1–A8 primer using the accepted red-to-blue sequence.
3. Compact status, answer-type, legend, and reset controls.
4. Canonical 2D field with all 140 approved nodes and 16 editorial anchors.
5. Sparse deterministic labels selected without coordinate movement.
6. Topic-bin navigator derived from governed `topicBinId` values.
7. Featured context dossier before explicit selection; selected dossier after user action.
8. Explicit evidence action; selection never auto-opens the drawer.
9. Full Explorer CTA carrying current filters but not Story selection.
10. Synchronized DOM navigator for keyboard and assistive-technology access.

At 64rem and below, the scene and dossier stack. On small screens the visual field remains a bounded horizontal exploration surface so effective node/touch scale is retained; the page itself has no horizontal overflow. Missing approved release data renders DataUnavailable and never a mock.

The type primer is an editorial explanation and quick filter. The compact controls remain the durable query-state interface. Their roles are distinct and were verified through URL-state E2E.

Gate: `STORY_PREVIEW_VID_PASS`.
