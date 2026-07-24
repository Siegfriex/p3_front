# Visual Design QA Report — Prologue Evidence Line

## 1. Overall Visual Verdict

- Verdict: **FAIL**.
- Biggest risk: the evidence-line SVG occupies the full 957px prologue stage but is clipped to the inner `page-frame` content width. Its `r=4` entry circle is stretched by `preserveAspectRatio="none"`, producing a large red bowl rather than an intentional line anchor.

## 2. Screenshot Inventory

| Screen | viewport | screenshot path | verdict |
|---|---:|---|---|
| Prologue before | 1280x577 | `/tmp/prologue-line-before.png` | FAIL — oversized anchor, line terminates inside the frame |

## 3. Visual Hierarchy Audit

| Screen | problem | user impact | correction | priority |
|---|---|---|---|---|
| Prologue | Large red semicircle competes with the headline | decorative geometry reads as an unexplained content object | reduce the anchor and make the evidence thread an unmistakable full-bleed rule | P0 |

## 4. Layout / Spacing Audit

| Location | current problem | recommended grid / spacing | priority |
|---|---|---|---|
| `#prologue > .page-frame > div` | SVG width is 1,169px inside a 1,265px section and clipped by `overflow-hidden` | let the absolute SVG span `100vw`; keep article content in `page-frame` | P0 |

## 5. Typography Audit

| Location | current problem | recommended type token | priority |
|---|---|---|---|
| Prologue type | No typography defect caused by this element | preserve current hierarchy 1–5 | none |

## 6. Color / Contrast / WCAG Audit

| Location | problem | assessment | correction | priority |
|---|---|---:|---|---|
| Evidence thread | Red shape is decorative but visually dominant | color contrast is not the issue | preserve semantic red; reduce anchor mass and keep `aria-hidden` | P0 |

## 7. Interaction Audit

| Component | problem | test method | correction | priority |
|---|---|---|---|---|
| Evidence SVG | none; pointer events already disabled | DOM hit test | preserve `pointer-events: none` | P0 |

## 8. Design Token Recommendations

- color: keep `--color-behavior-red-deep`.
- typography: unchanged.
- spacing: full viewport bleed outside `page-frame` gutters.
- radius: replace the stretched 4-unit circle with sub-1-unit editorial anchors.
- shadow: none.
- z-index: remain behind content at z0.
- motion: keep the two-stage draw and reduced-motion branch.

## 9. P0 Patch Plan

| File | change | reason |
|---|---|---|
| `src/widgets/prologue-scene/ChapterPrologue.tsx` | make the SVG layer full-bleed, remove inner clipping, redraw the path edge-to-edge and shrink anchors | turn an ambiguous large object into an intentional chapter-spanning editorial thread |
