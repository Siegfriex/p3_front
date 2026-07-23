# Visual Regression Naming Contract

Use lowercase ASCII segments:

`<surface>__<state>__<viewport>__<release-short>__<projection-short>.png`

Examples:

- `story-answers__default__375x812__f7a35bc6__4665fdf3.png`
- `atlas__selected-anode-0b8d4f__1440x1000__f7a35bc6__4665fdf3.png`
- `evidence__drawer-evid-238914__1440x1000__f7a35bc6__4665fdf3.png`

The capture manifest stores the full release ID, projection ID, query, viewport, device scale factor, reduced-motion/forced-colors/zoom state, node/evidence ID and source commit. Do not overwrite baselines across releases. Fixture captures include `__fixture-contract__` and can never be named `approved` or `production`.
