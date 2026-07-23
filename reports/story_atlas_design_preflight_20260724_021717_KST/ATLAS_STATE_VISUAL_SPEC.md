# Atlas State Visual Specification

## Loading

Keep route title and release-check status. Use text and restrained progress; never skeleton/fake nodes. Controls are absent or disabled with reason. `aria-busy=true`.

## Error

Use inverse surface, `ERR`, alert semantics and retry only when the failure is retryable. Do not expose raw stack traces by default.

## DataUnavailable

Use the light fail-closed state with `00`, reason code and data/method navigation. It means no approved runtime source is selectable. It is not an empty filter result.

## Empty filter result

Keep valid release, controls, projection frame and reset. Show an immediate `0개 node` cue above the scene and a full no-result panel. Do not alter the domain.

## Invalid node

Use a compact inverse inspector state. Keep filters and clear only `node=`. It is not a release or evidence failure.

## Evidence unavailable

Keep the selected node and inspector metrics. Replace the evidence action with explanatory text; do not dim or disable the node itself.

## Contract/projection mismatch and stale release

Use ochre contract treatment for schema/projection issues, with release/projection IDs in secondary metadata. Never fall back to mock data.

## Disabled

Controls remain legible, retain at least 3:1 non-text boundary contrast and expose a textual reason. Disabled controls are never used to represent filtered-out data nodes.
