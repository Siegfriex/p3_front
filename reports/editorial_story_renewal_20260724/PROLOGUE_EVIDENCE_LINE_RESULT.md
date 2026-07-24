# Visual Polish Result — Prologue Evidence Line

## 1. Overall Verdict

- **PASS**.
- The ambiguous oversized SVG anchor is gone. The evidence thread is now an intentional full-bleed scene rail: it enters from the left viewport edge, drops beside the article column, curves across the chapter footer and exits at the right edge.

## 2. What Changed

| File | Change | Reason |
|---|---|---|
| `src/widgets/prologue-scene/ChapterPrologue.tsx` | expanded the decorative SVG layer from inner `page-frame` width to `100vw` | make the large line belong to the whole scene |
| same | replaced `r=4/5` stretched circles with compact `r=.65` anchors | remove the oversized red bowl |
| same | replaced path-length drawing with staged opacity reveal | prevent the finished line from rendering as repeated dashes under non-uniform SVG scaling |
| same | desktop line uses the 12% editorial axis; mobile uses a 4% edge axis | keep the line out of compact body copy |
| same | added 24px desktop padding to the headline and body columns | separate the type from the vertical rail |

## 3. Visual Improvements

- visual hierarchy: the line frames the headline instead of competing with it.
- layout/margins: the decorative layer reaches both viewport edges while article content remains inside `page-frame`.
- typography: no glyph is crossed; the desktop type column has a clear 24px rail gap.
- contrast/WCAG: unchanged semantic deep red; decorative SVG remains `aria-hidden` and non-interactive.
- interaction: `pointer-events: none` preserved.
- mobile safe area: the rail sits about 8px from the 390px viewport edge; measured horizontal overflow remains 0.
- motion: two-stage reveal remains; reduced-motion users receive the settled line immediately.

## 4. Screenshots

| Screen | Path | Verdict |
|---|---|---|
| Before, 1280 | `/tmp/prologue-line-before.png` | FAIL — oversized anchor and inner-frame geometry |
| After, desktop 1440 | `/tmp/prologue-line-desktop-final-v2.png` | PASS |
| After, mobile 390 top | `/tmp/prologue-line-mobile-final-top.png` | PASS |
| After, mobile 390 bottom handoff | `/tmp/prologue-line-mobile-final-bottom.png` | PASS |

## 5. Verification

- `npm run typecheck`: PASS.
- `npm run lint`: PASS, zero warnings.
- `npm run build`: PASS, 2,186 modules.
- browser: Vite overlay absent; console errors 0; page errors 0.
- DOM: desktop and mobile visible-path variants confirmed; page horizontal overflow 0 at 390 and 1440.
- full E2E: first pass had two unrelated timing failures; second pass reduced this to one navigation-context timing failure. The remaining 320px overflow test passed immediately in isolated rerun (`1/1`). No persistent prologue regression was reproduced.

## 6. Remaining Visual Debt

| Item | Severity | Follow-up |
|---|---|---|
| Story bundle is still above Vite's 500kB raw chunk warning | P2 | revisit binary inlining/code splitting separately |
| Atlas E2E contains navigation/click timing flakes under the full one-worker suite | P2 | stabilize route settlement and node hit-target selection independently of the prologue |
