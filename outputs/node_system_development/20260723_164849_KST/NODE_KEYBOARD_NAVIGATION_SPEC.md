# Node Keyboard Navigation Specification

The DOM mirror is the sole keyboard owner. SVG marks are `aria-hidden` and have no tab stop.

## Keys

- Tab: enter the single roving-tabindex navigator stop.
- ArrowLeft/Right/Up/Down: directional half-plane, angular deviation, projected distance, canonical ID.
- Home/End: first/last node in the provided stable ViewModel order.
- Enter/Space: native button selection.
- Escape: clear selection without automatic replacement.

Focus updates SVG halo and preview/tooltip parity without URL writes. Selection updates the ring, inspector, live region, and canonical node query action. Explicit filter actions clear selection before applying the filter and retain focus on the filter control.
