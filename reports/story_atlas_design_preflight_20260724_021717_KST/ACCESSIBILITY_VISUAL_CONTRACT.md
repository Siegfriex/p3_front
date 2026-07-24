# Accessibility Visual Contract

## Required semantics

- SVG has a unique accessible name and concise dynamic chart summary.
- The chart summary reports total, matched and excluded node counts and explains position, behavior, mass, confidence and status channels.
- Synchronized DOM navigation owns node focus. Names are unique and include topic/ID context, not only A#/family/status.
- Result count, filter changes, node focus/selection and evidence-unavailable changes are announced without replacing the whole page.

## Required visual affordances

- Effective pointer target is at least 44×44 CSS px at every viewport.
- Focus halo and selection ring are simultaneous but visually distinct.
- Focus halo cannot clip at plot edges; shared projection padding must include the largest radius plus both rings and safety margin.
- Family meaning survives without color through circle/diamond/square. A1–A8 survive through inner marks plus text labels. Status survives through dash pattern plus text.
- Signal red `#f01b2d` is not used for normal-size text on paper because measured contrast is 3.83:1. Use `signal-red-dark` for small text.
- Forced-colors mode preserves focus, selection and status as three distinguishable channels; text status remains available if stroke patterns collapse.

## Interaction parity

Keyboard and touch produce the same selected node, URL, inspector and evidence action. Hover-only information is prohibited. The map's overlapping targets require deterministic nearest-hit behavior and a DOM alternative; a 44px target alone is not sufficient when targets overlap.

## Manual gates

Axe critical/serious zero is necessary but not sufficient. Manually verify small node access, ring clipping, status/selection distinction, shape recognition without legend color, forced colors, reduced motion, 200% zoom, 44px targets, Bottom Sheet focus and Back/Forward restoration.

## Current blockers

- 120 of 140 DOM buttons duplicate an accessible name.
- All 140 Full Explorer nodes participate in hit-target overlap; 1,133 overlapping pairs were measured.
- The candidate Story subset has 20 hit-overlap pairs and is not approved.
- 200% zoom and forced-colors manual Visual QA were not executed in this preflight.

Gate: `ACCESSIBILITY_VISUAL_CONTRACT_LOCKED` is PASS for the contract. Runtime `ACCESSIBILITY_PASS` remains pending implementation and approved data.
