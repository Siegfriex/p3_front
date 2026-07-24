# Node Core Visual Design QA Baseline

## 1. Overall Visual Verdict

- Verdict: `PARTIAL PASS / CONTRACT_FIXTURE ONLY`
- Production `/#answers` and `/atlas` correctly remain fail-closed because no approved frontend bundle or approved `story_preview_node_ids` exists.
- The largest remaining risk is not a presentation defect: real-node density, approved maximum radius, confidence distribution, and Story subset parity cannot be measured without approved data.

## 2. Screenshot Inventory

| Screen | Viewports | Evidence | Verdict |
|---|---|---|---|
| Story Answers fail-closed | 320, 375, 768, 1440, 1920 | `screenshots/baseline/<width>/answers_*_unavailable.png` | PASS; no mock node exposure |
| Atlas fail-closed | 320, 375, 768, 1440, 1920 | `screenshots/baseline/<width>/atlas_*_unavailable.png` | PASS; no approved node claim |
| Atlas contract fixture | 320, 375, 768, 1440, 1920 | `screenshots/baseline/<width>/atlas_*_approved-default.png` | PARTIAL PASS; fixture only |
| Selected fixture node | 1440 | `screenshots/baseline/atlas_contract_fixture_selected_1440x1000.png` | PASS; selection ring visible |
| Forced colors / reduced motion / text spacing / zoom equivalent | 375 or 320 | `screenshots/baseline/{forced-colors,reduced-motion,text-spacing,zoom-400}/` | PASS within automated environment |

## 3. Visual Hierarchy Audit

| Screen | Finding | User impact | Priority |
|---|---|---|---|
| Production Story | DataUnavailable is explicit and dominant; Story does not imply real node results | prevents false data interpretation | PASS |
| Production Atlas | release state, fail-closed reason, empty field, and unavailable DOM mirror are ordered clearly | prevents mock/legacy fallback confusion | PASS |
| Fixture Atlas | fixture provenance precedes the release and node field | prevents fixture from being mistaken for approved data | PASS |
| Selected fixture node | node ring, label, inspector, and DOM mirror agree | selection is perceivable across visual and textual layers | PASS |

## 4. Layout / Spacing Audit

| Location | Finding | Priority |
|---|---|---|
| 320/375 Atlas stage | local horizontal stage scroll preserves the 44px hit geometry without page-level overflow | PASS |
| 768/1440/1920 | field and inspector reflow without coordinate mutation | PASS |
| Full Story screenshot | document is intentionally long; chapter composition is outside Agent 3 ownership | HANDOFF ONLY |

## 5. Typography Audit

Node labels, counts, filter labels, and DOM mirror text remain legible in the captured fixture. Global Story typography is outside Agent 3 ownership.

## 6. Color / Contrast / WCAG Audit

- Axe critical/serious: `0` across 320, 375, 768, 1440, and 1920 contract-fixture viewports.
- Selected state is not color-only: it is an outer ring and is mirrored by inspector and `aria-pressed` state.
- Focus and selection are independently renderable; a focused-selected automated test is required to preserve both.
- Actual screen-reader and approved-data conformance remain `NOT_VERIFIABLE`.

## 7. Interaction Audit

| Component | Current issue | Required patch | Priority |
|---|---|---|---|
| DOM navigator Home/End | current result depends on transport array order rather than canonical node ID | canonicalize Home/End endpoints | P0 contract |
| URL-selected node outside filter | direct URL can retain a selected node that Full Explorer excludes | clear selection without replacement | P0 contract |
| Glyph pointer ownership | behavior is currently enforced partly by presentation CSS | set `pointerEvents="none"` on glyph group in owner code | P0 contract |
| Opacity API | implementation uses `baseOpacity` while the final contract names `semanticOpacity` | align public function input name and tests | P0 contract |

## 8. Design Token Recommendations

No global token change is authorized. The existing selection-ring, focus-halo, hit-target, projection-padding, and provisional confidence tokens remain Agent 3 semantic tokens.

## 9. P0 Patch Plan

| File | Change | Reason |
|---|---|---|
| `atlasNodeNavigation.ts` and test | canonical comparator; diagonal, resize, filter-reduction coverage | deterministic spatial navigation |
| `AtlasExplorer.tsx` and test | clear selected node when it becomes excluded | filter contract |
| `atlasEncoding.ts`, test, `AtlasScene.tsx` | rename opacity input to `semanticOpacity`; expose filter state | exact semantic/interaction separation |
| `AtlasNodeGlyph.tsx` | code-level pointer exclusion | transparent hit layer remains sole pointer owner |
| `atlas-contract-shell.spec.ts` | direct filtered-selection and pointer-owner assertions | runtime contract evidence |

No Agent 4 presentation file will be modified by this patch.
