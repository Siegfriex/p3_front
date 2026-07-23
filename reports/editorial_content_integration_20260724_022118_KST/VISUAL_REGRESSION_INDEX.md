# Visual Regression Index

Run ID: `20260724_022118_KST`
Screenshot roots (relative to this report dir):
- Before: `screenshots/before/`
- After: `screenshots/after/`

## Capture asymmetry (read before comparing)

The **before** set was captured once per full-page viewport size on route `/` (whole scroll of
all chapters together), *before* any copy/JSX edits in this run. Per `RESPONSIVE_BASELINE.md`, the
dev server already rendered `ChapterScale`/`ChapterRecord`/`ChapterGap`/`ChapterCases`
unconditionally (the `import.meta.env.DEV` branch), so **the "before" screenshots show the
pre-existing MOCK copy, not the production `StoryChapterUnavailable` gate state** — they are a
content baseline, not a gate-state baseline.

The **after** set was captured per chapter section (`section[data-chapter-id=<id>]`), two
viewports each (desktop `1440x900`, mobile `375x812`), scoped to the six in-scope chapters. There is
no exact frame-for-frame match between the two sets; comparison below is by content region, not
pixel diff.

## Before (full-page, all chapters, pre-edit)

| File | Viewport |
|---|---|
| `screenshots/before/1440x900.png` | Desktop |
| `screenshots/before/1920x1080.png` | Wide desktop |
| `screenshots/before/768x1024.png` | Tablet portrait |
| `screenshots/before/375x812.png` | Mobile |

## After (per-chapter, post-edit, in-scope chapters only)

| Chapter | Desktop (`1440x900`) | Mobile (`375x812`) |
|---|---|---|
| prologue | `screenshots/after/prologue.png` | `screenshots/after/prologue_mobile.png` |
| scale | `screenshots/after/scale.png` | `screenshots/after/scale_mobile.png` |
| record | `screenshots/after/record.png` | `screenshots/after/record_mobile.png` |
| gap | `screenshots/after/gap.png` | `screenshots/after/gap_mobile.png` |
| cases | `screenshots/after/cases.png` | `screenshots/after/cases_mobile.png` |
| remains | `screenshots/after/remains.png` | `screenshots/after/remains_mobile.png` |

`answers` (page5/`ChapterAnswersAtlas`) has **no after screenshot pair** — out of scope, see
`EDITORIAL_IMPLEMENTATION_PLAN.md` §4. `method` likewise has no pair (no PDF page supplied).

## Chapter-by-chapter comparison summary

Sourced from `chapter_reports/*.json`, `PAGE_0*_VISUAL_QA.csv`, `RESPONSIVE_CONTENT_QA.csv`,
`ACCESSIBILITY_QA.csv`.

### prologue
- Copy: hero `<h1>` quote changed (`"검토하겠습니다"` → `"국정감사 단순히 쇼인가?"`); CTA label
  changed. Everything else visually identical to before.
- Layout/typography: unchanged, no clipping at 375px (`PAGE_01_VISUAL_QA.csv`
  `mobile_text_clipping=PASS`); minor pre-existing cosmetic overlap of a decorative vertical line
  with one glyph in the h2 (not a clipping bug).
- **Defect carried into "after" screenshots:** `mock_placeholder_residual` = **FAIL**. Hero image
  slot still shows placeholder caption `"[Midjourney Hero Asset Slot: National Assembly Audit
  Document 2018]"` (no real asset connected — see `MISSING_ASSET_REQUEST.csv`), and the dev-server
  capture additionally shows the DEV-only source line `"출처: 개발용 결정론적 fixture · 공개 자료
  아님"` (this line is replaced by `"PUBLIC DATA STATUS: APPROVAL PENDING"` in an actual production
  build, so only the placeholder-caption part is a true production-visible defect).

### scale
- Copy: chapter title/thesis/summary in `storyData.ts` replaced with page2 doping-case content;
  `ChapterScale.tsx` JSX itself unchanged (its hardcoded strings don't correspond to any PDF block).
- **New defects visible in `scale.png`/`scale_mobile.png`:**
  - `jsx_hardcoded_mock_label_residual` = **FAIL** — unconditional `<span>[MOCK Data Reference]</span>`
    (line 216) still renders regardless of `metric.mock` now being `false` for all 4 metrics.
  - `fixed_footer_overlay_obscures_content` = **FAIL** — app-shell `FooterRail` (position:fixed)
    overlaps the timeline chart on desktop and the 82.4% metric card on mobile. App-shell-wide, not
    scale-specific, but visible in both after screenshots.

### record
- Copy: `STORY_CHAPTERS[record]` replaced with page3 SPC-case content; `ChapterRecord.tsx` JSX
  unchanged (generic 5-step tool labels apply to all 5 `MOCK_EVIDENCES`, not just SPC).
- `record.png`: STEP01–05 grid renders correctly; same app-shell fixed-footer overlap noted as a
  capture artifact common to all chapters, not record-specific.
- `record_mobile.png`: no text clipping; case-selector tab bar intentionally horizontally scrollable.

### gap
- Copy: `STORY_CHAPTERS[gap]` title/summary replaced with page4 content; **`ChapterGap.tsx` JSX
  headline + lead paragraph also replaced** (this component doesn't consume `storyData.ts`, so its
  hardcoded strings were stale duplicates of the pre-update values).
- **Defects visible in `gap.png`/`gap_mobile.png`:**
  - `sankey_data_consistency` = **FAIL** — `SankeyFlowDiagram` still shows hardcoded legacy figures
    (5,000/1,800/3,200/600) that don't reconcile with the new headline numbers (1,566/830/736).
  - `mobile_sankey_scroll_affordance` / `mobile_sankey_horizontal_overflow` = **FAIL** — Sankey is
    fixed at `min-w-[880px]` with a hidden scrollbar; at 375px only stage 1 is visible with no
    visual cue that stages 2–3 exist off-screen.

### cases
- Copy: `STORY_CHAPTERS[cases]` replaced with page6 (회피성 답변/잼버리) content;
  `EDITORIAL_CASES[case-01..05]` deliberately preserved (topic mismatch); `ChapterCases.tsx` JSX
  unchanged (no matching blocks).
- `cases.png`/`cases_mobile.png`: all 5 case cards render cleanly, no clipping, no mock/placeholder
  residual (`mock_data_residual=true`), fixed footer only overlaps inter-card whitespace (no text
  obscured).

### remains
- Copy: title preserved verbatim (identical to PDF); thesis/summary/timeframe replaced with page7
  content; `ChapterRemains.tsx` JSX already matched PDF blocks 1:1 pre-edit, so **no JSX text
  changed**.
- `remains.png`/`remains_mobile.png`: single h2, no clipping, no mock residual. Several page7 blocks
  (metric cards, 47%/1,408건/연도별 추이 stats) have no corresponding UI element at all and are not
  reflected in either screenshot — flagged as a future content/layout gap, not a regression.

## Known cross-chapter visual issues (not attributable to a single chapter)

- **App-shell fixed `FooterRail` overlap** — appears over content in `scale.png`, `scale_mobile.png`,
  and to a lesser extent `record.png`/`cases.png` (whitespace only). Pre-existing app-shell issue,
  not introduced by this content pass.
- **Dev-server vs. production divergence in prologue** — the `mock_placeholder_residual` finding was
  captured against `npm run dev`; the DEV-only source-line half of that finding does not reproduce
  in a production build, but the hero-image placeholder-caption half does (no real asset exists
  either way).
