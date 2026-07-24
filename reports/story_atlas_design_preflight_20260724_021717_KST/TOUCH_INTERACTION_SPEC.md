# Touch Interaction Specification

- Every actionable control and node target is at least 44×44 CSS px after responsive scaling.
- A single tap selects a node; it does not require hover. The selected summary updates in flow.
- Tapping another node replaces selection. Tapping empty plot space may clear preview but must not silently clear a committed selection; provide an explicit clear action or Escape-equivalent control.
- Horizontal stage scrolling is permitted on 375px only when required to retain 44px targets. Show a pan instruction and do not hijack vertical page scroll.
- Pointer resolution is deterministic nearest-center with stable node-ID tie break. If hit targets overlap, the DOM/list alternative is mandatory. Frontend must not jitter nodes.
- Touch selection and DOM selection produce the same URL, ring, inspector and announcement.
- Evidence opens a Bottom Sheet on mobile. It traps focus, locks background scroll, supports close button/backdrop/Escape where a hardware keyboard exists, and returns focus to the invoker.
- No pinch-zoom or map pan mode is required for v1. Browser zoom remains available.
- Long press has no exclusive behavior; tooltips cannot be the only source of information.
