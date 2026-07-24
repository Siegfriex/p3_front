# Full Explorer VID

Route `/atlas` is the aggregate analysis surface named “답변행태 지도”. The stage is primary and the inspector is a dossier on the same record plane, not a floating dashboard card.

## Implemented hierarchy

- Title, scope, approved release and projection metadata.
- Compact status/answer-type filters with result count, legend, reset, and warning.
- Canonical aggregate SVG stage.
- 24–27.5rem inspector at wide desktop; stacked lower rail at tablet/mobile.
- Bounded synchronized DOM navigator with the existing single keyboard interaction ownership.
- Missing evidence, invalid node, empty result, and DataUnavailable remain distinct states.

The stage minimum is 34rem on wide screens and 28rem below 64rem. The DOM navigator is capped at 30rem desktop and 22rem mobile so it does not displace the map’s primacy.

Gate: `FULL_EXPLORER_VID_PASS`.
