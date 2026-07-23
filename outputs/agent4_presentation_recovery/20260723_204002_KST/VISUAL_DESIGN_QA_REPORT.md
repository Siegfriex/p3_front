# Visual Design QA Report

## 1. Overall Visual Verdict

- Verdict: `PARTIAL PASS / P0 PATCH REQUIRED`
- Direction: `REDLINE PUBLIC RECORD` is intact: warm paper, black ink, red annotation, grid-first hierarchy, thin rules, editorial typography, and fail-closed data presentation remain visible.
- Largest current risks: undersized global-header targets on small/tablet viewports, and the production Evidence unavailable ID collapsing into a vertical letter stack at 375px.
- Node-core status: Agent 3 owner-file hashes matched the published final handoff at freeze time. A later fixture run overlapped a new Agent 3 edit cycle and is therefore not accepted as final evidence; Agent 4 did not modify the core.

## 2. Screenshot Inventory

| screen | viewport | screenshot path | verdict |
|---|---:|---|---|
| Story Answers unavailable | 320 | `screenshots/320/story-answers-current.png` | PASS with global-header target defect |
| Story Answers unavailable | 375 | `screenshots/375/story-answers-current.png` | PASS with fixed footer capture caution |
| Story Answers unavailable | 768 | `screenshots/768/story-answers-current.png` | PASS with presentation-toggle target defect |
| Story Answers unavailable | 1440 | `screenshots/1440/story-answers-current.png` | PASS |
| Story Answers unavailable | 1920 | `screenshots/1920/story-answers-current.png` | PASS |
| Atlas unavailable shell | 320 | `screenshots/320/atlas-current.png` | PASS with global-header target defect |
| Atlas unavailable shell | 375 | `screenshots/375/atlas-current.png` | PASS with global-header target defect |
| Atlas unavailable shell | 768 | `screenshots/768/atlas-current.png` | PASS with presentation-toggle target defect |
| Atlas unavailable shell | 1440 | `screenshots/1440/atlas-current.png` | PASS |
| Atlas unavailable shell | 1920 | `screenshots/1920/atlas-current.png` | PASS |
| Evidence unavailable | 375 | `screenshots/375/evidence-current.png` | FAIL: record ID vertical stack |
| Evidence unavailable | 1440 | `screenshots/1440/evidence-current.png` | PASS |
| Evidence Drawer unavailable | 375 | `screenshots/375/evidence-drawer-current.png` | Interaction PASS; capture method needs viewport-only final image |
| forced colors | 375 | `screenshots/overrides/atlas-forced-colors.png` | PASS |
| reduced motion | 375 | `screenshots/overrides/atlas-reduced-motion.png` | PASS |
| text spacing | 375 | `screenshots/overrides/atlas-text-spacing.png` | QA HARNESS INVALID: captured lazy fallback before Atlas settled |
| 400% equivalent | 320 | `screenshots/overrides/atlas-zoom-400-equivalent.png` | PASS |
| focus visible | 320 | `screenshots/overrides/atlas-focus-visible.png` | PASS |

## 3. Visual Hierarchy Audit

| screen | issue | user impact | recommended fix | priority |
|---|---|---|---|---|
| Evidence unavailable mobile | `ev-101` is forced into a narrow first grid column and reads one fragment per line | record identity competes with and obscures the headline | switch the non-compact panel to a single-column editorial stack at mobile widths | P0 |
| Story Answers | hierarchy matches marker → headline → thesis → warning → metadata → unavailable state → recovery actions | clear fail-closed narrative | preserve | PASS |
| Atlas desktop | intro → metadata → state → locked controls → stage/inspector → DOM mirror → legend → warning is coherent | user can distinguish unavailable data from an empty filtered result | preserve | PASS |
| Atlas mobile | control rail, stage, inspector, DOM mirror, legend and warning reflow without page overflow | usable at 320/375 | preserve; recheck after Agent 3 final refresh | PASS |

## 4. Layout / Spacing Audit

| location | current issue | recommended spacing/grid | priority |
|---|---|---|---|
| global header, 320/375 | home link resolves to `10×44` because only the 10px red mark is visible | enforce a minimum inline target of 44px while retaining the square mark | P0 |
| global header, 768 | presentation-mode icon button resolves to `36×44` | enforce 44px minimum inline target | P0 |
| Evidence mobile | two-column record ID grid remains visually active | one-column stack with 12–16px gap and full-width headline | P0 |
| Atlas shell | no page horizontal overflow at 320/375/768/1440/1920 | preserve single-axis page reflow | PASS |
| Story fixed footer | screenshot can cross the chapter metadata at the viewport edge | verify focus and last-content clearance, do not remove the persistent editorial rail without a product decision | P1 QA |

## 5. Typography Audit

| location | current issue | recommended type token | priority |
|---|---|---|---|
| Evidence mobile ID | display signal has no usable word-breaking composition in the narrow column | mono/sans signal at 2.5–3rem in a full-width row | P0 |
| Atlas state headlines | Korean line wrapping remains legible down to 320px | preserve current serif display scale and `word-break: keep-all` | PASS |
| metadata | compact mono labels remain readable and structured | preserve current REDLINE metadata token | PASS |

## 6. Color / Contrast / WCAG Audit

| location | issue | measured evidence | recommendation | priority |
|---|---|---:|---|---|
| production audited routes | no Axe critical/serious violations | 0 across 12 route/viewport samples | preserve | PASS |
| forced colors | state, control, divider, and focus boundaries remain visible | screenshot verified | preserve system-color overrides | PASS |
| global targets | pointer size below project threshold | 10×44 and 36×44 | enforce 44×44 | P0 |
| production mock exposure | fixture markers and visual nodes absent | marker 0, node 0 | preserve fail-closed boundary | PASS |

## 7. Interaction Audit

| component | issue | test method | recommendation | priority |
|---|---|---|---|---|
| route-driven Drawer | app root is `inert` and `aria-hidden`, close gets initial focus, Escape returns focus | Playwright production route | preserve | PASS |
| skip links | focus ring is visible and route-specific Atlas targets exist | keyboard + computed outline | preserve | PASS |
| Node core | final handoff hashes initially matched; later run overlapped concurrent Agent 3 edits | SHA comparison + fixture E2E | rerun only after new Agent 3 stable handoff | BLOCKED_CONCURRENT |
| text-spacing audit | screenshot was taken before lazy route settled | Playwright artifact review | wait for explicit Atlas state before final capture | QA P0 |

## 8. Design Token Recommendations

- color: preserve paper/ink/signal-red/archive-ochre and forced-colors mappings.
- typography: preserve serif display, sans signal, mono provenance hierarchy.
- spacing: use the existing 44px control target as the minimum global-header inline size.
- radius: retain flat record surfaces; mobile inspector/sheet radius only.
- shadow: retain no desktop card shadows; mobile overlay elevation only.
- z-index: preserve navigation, sticky rail, modal separation.
- motion: preserve reduced-motion override and non-continuous state progress.

## 9. P0 Patch Plan

| file | change | reason |
|---|---|---|
| `src/app/styles/layout.css` | enforce 44px global-header interactive width and mobile Evidence single-column reflow | pointer target and Korean/ID legibility |
| Agent 4 WCAG tests | assert global header targets and Evidence mobile composition | prevent regression |
| current-state Playwright audit | wait for lazy Atlas state and capture Drawer viewport rather than full document | valid final evidence |
| Agent 3 core | no modification | owner boundary |

Application source was not modified before this report was created.
