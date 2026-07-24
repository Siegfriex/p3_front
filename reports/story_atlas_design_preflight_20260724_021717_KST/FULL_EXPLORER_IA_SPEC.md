# Full Explorer Information Architecture

## Product role

`/atlas`, publicly named **답변행태 지도**, is an aggregate-node analysis surface. The map is the primary object. It is not a dashboard card collection, not a raw-answer browser and not a replacement for the Story.

## Reading order

1. Title and one-sentence context
2. Release/projection status and both projection warnings
3. Result count
4. Status and answer-type controls, legend and reset
5. Atlas scene
6. Selected-node inspector
7. Evidence action or evidence-unavailable explanation
8. Synchronized keyboard DOM navigator
9. Method/provenance access

The legend moves before the scene. A no-match message appears immediately beside the result count and again as a full state after the scene; users must not have to scan an empty map to discover that the filter is empty.

## Desktop hierarchy

- At 1440 and 1920, map/inspector uses a 2:1 split. The map receives at least two thirds of the content width.
- Inspector is sticky below the global header. It is one coherent rail, not a grid of unrelated cards.
- Controls remain a single horizontal rail when space permits.
- Release metadata is secondary and must not push the map entirely below a typical 1000px-high first viewport.

## Tablet and mobile hierarchy

- Below 1024px, map then in-flow inspector. The node inspector is not modal.
- The Evidence record, not the node inspector, uses Drawer/Bottom Sheet semantics.
- At 375px, controls stack, answer types use a disclosure, and the canonical map may horizontally scroll to preserve effective targets. A clear `좌우로 이동하여 지도 보기` instruction precedes it.
- The DOM navigator may be collapsed by default visually but remains reachable from a skip link and contains all filtered nodes.

## State hierarchy

- Loading: title and release-check status remain; controls and nodes are absent/disabled.
- DataUnavailable: explicit fail-closed copy, data/method actions, no fake nodes.
- Error/contract/projection mismatch: alert treatment, retry only when meaningful.
- Empty result: valid data plus filter intersection of zero; preserve controls and reset.
- Invalid node: valid data plus bad node query; keep filters and clear node only.
- Evidence unavailable: selected node remains valid; only the evidence action is unavailable.

## Query visibility

The URL is the canonical state; the interface need not print the query string. Controls, count, selection and inspector make the state visible. Unknown parameters produce one concise normalization notice. Back/Forward and reload restore the same visual state and focus target.

## Method and provenance

Expose release ID, projection ID and link to `/method` or a method/provenance disclosure. Do not display internal pipeline diagnostics in the main map header.
