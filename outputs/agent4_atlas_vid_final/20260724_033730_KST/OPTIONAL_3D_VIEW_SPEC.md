# Optional 3D View Specification

3D is opt-in and never the default Story or Explorer entry.

- Fixed camera presets: front, side, top, reset.
- Optional controls: slice, centroid, selected-only, spotlight; activate only with approved payload fields.
- No auto rotation, free-orbit-only flow, particle decoration, fog, neon-space styling, or constant animation.
- The current shell intentionally renders no data node because approved 3D coordinates are absent.
- A canonical 2D link, accessible name, textual node table, coordinate summary, and keyboard controls are mandatory.
- Reduced motion removes transform transition; mobile keeps 3D optional and unavailable by default.

Gate: `OPTIONAL_3D_VIEW_SPEC_READY`. `PROJECTION_INSTANCE_PASS` is not claimed.
