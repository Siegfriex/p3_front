# Editorial Content Integration — Implementation Plan / Record

Run ID: `20260724_022118_KST`
Report dir: `reports/editorial_content_integration_20260724_022118_KST`
Base commit: `20835ecadcce0a57067231806c4cfde9dd5b8f41` (branch `agent/frontend-routing-atlas-foundation-20260723`)

This document explains **what was actually replaced per chapter**, **why/how the DEV-only
production gate was removed**, and **why `page5`/`answers` was excluded** from this pass. It is
compiled from `START_SNAPSHOT.json`, `chapter_reports/*.json`, `COPY_REPLACEMENT_MAP.csv`,
`COPY_INTEGRITY_QA.csv`, `MOCK_COPY_RESIDUAL_AUDIT.csv`, `FRONTEND_FILE_CHANGE_MAP.csv`,
`FRONTEND_COMPONENT_MAP.csv`, and `UNRESOLVED_EDITORIAL_BLOCKS.csv`.

## 1. Source material

PDF pages found under `goal/`: `page1.pdf, page2.pdf, page3.pdf, page4.pdf, page6.pdf, page7.pdf`.
`page5.pdf` is **absent** from the input set. Each available page was rendered/cropped
(`pdf_renders/`) and decomposed into labeled editorial blocks (HEADLINE / SUBHEAD / LEAD / LABEL /
SOURCE / IMAGE / METRIC …) in `PDF_EDITORIAL_BLOCKS_<chapter>.json` / `.csv`.

Page → chapter → component mapping (`FRONTEND_COMPONENT_MAP.csv`):

| page | chapter | component |
|---|---|---|
| 1 | prologue | `ChapterPrologue.tsx` |
| 2 | scale | `ChapterScale.tsx` |
| 3 | record | `ChapterRecord.tsx` (`evidence-chain-scene`) |
| 4 | gap | `ChapterGap.tsx` |
| 5 | answers | `ChapterAnswersAtlas.tsx` — **out of scope, see §4** |
| 6 | cases | `ChapterCases.tsx` (`case-sequence`) |
| 7 | remains | `ChapterRemains.tsx` |
| — | method | not in scope (no PDF page supplied) |

## 2. What was replaced, per chapter

The data layer (`src/shared/mock/storyData.ts` — `STORY_CHAPTERS`, `STORY_METRICS`,
`MOCK_EVIDENCES`, `EDITORIAL_CASES`) and the JSX layer (hardcoded Korean strings inside the widget
`.tsx` files) were treated as two separate replacement targets, because several widgets do **not**
consume `storyData.ts` at all (`ChapterScale`, `ChapterRecord`, `ChapterGap`, `ChapterCases` render
their own hardcoded copy independent of the `STORY_CHAPTERS` array bound elsewhere by
`StoryPage.tsx`/other consumers). Full field-level mapping is in `COPY_REPLACEMENT_MAP.csv`;
integrity checks (no invented numbers/dates/names, no arbitrary summarization) are in
`COPY_INTEGRITY_QA.csv` — all 26 checks recorded `pass=true`.

### prologue (page1 → `ChapterPrologue.tsx`)
- `storyData.ts` `STORY_CHAPTERS[prologue]`: title/thesis/summary/timeframe all `REPLACE`d with
  page1 HEADLINE(b5)/SUBHEAD(b7)/LEAD(b8)/SOURCE(b6) text verbatim.
- JSX: 2 replacements — hero `<h1>` quote → PDF final headline `"국정감사 단순히 쇼인가?"` (b5);
  dev-preview CTA label/aria-label → PDF CTA copy `"첫 증거 원문 확인하기 (ev-101)"` (b9).
- 7 other PDF blocks (b1, b2, b3, b4, b6, b7, b8) were left unchanged because they already matched
  the current JSX verbatim, were explicitly marked "existing, keep" in the source notes, or (b3, b6)
  had no corresponding JSX slot to place them in — see §3/`MISSING_ASSET_REQUEST.csv`.
- Typography: no changes; existing bespoke hero classes (`type-display-hero-quote`,
  `type-display-hero-conclusion`) judged appropriate for their hierarchy tier.

### scale (page2 → `ChapterScale.tsx` + `STORY_METRICS`)
- `storyData.ts` `STORY_CHAPTERS[scale]`: title/thesis/summary `REPLACE`d with page2's doping-case
  headline/subhead/lead (`scale_p2_b02/b09/b03`). `timeframe` had no matching PDF block →
  `NOT_IN_PDF`, preserved.
- `STORY_METRICS[m1..m4]`: no PDF METRIC block exists on page2, so **values/labels/comparisons were
  left untouched** (no invented numbers). Only the `[MOCK]` marker in each `sourceLabel` was
  resolved to `[UNVERIFIED - PDF에 출처 미기재]` and `mock: true → false`, per the residual-mock
  fallback rule (`MOCK_COPY_RESIDUAL_AUDIT.csv`).
- JSX: 0 replacements — none of the 13 PDF blocks correspond to the hardcoded overview/timeline/
  legend strings in `ChapterScale.tsx`, which describe aggregate stats, not the specific doping-case
  narrative now bound into `STORY_CHAPTERS[scale]`.

### record (page3 → `ChapterRecord.tsx` / evidence-chain-scene, + `MOCK_EVIDENCES`)
- `storyData.ts` `STORY_CHAPTERS[record]`: title/thesis/summary/timeframe `REPLACE`d with page3's
  SPC case headline/subhead/lead/label.
- `MOCK_EVIDENCES[ev-101..105]`: question/answer/verification text preserved as-is (topic mismatch
  with the SPC case); only `[MOCK]` → `[UNVERIFIED]` marker resolved in `sourceLabel`.
- JSX: 0 replacements. The generic 5-step tool headline (`"요구에서 결과까지의 사슬"`) and step
  labels apply across all 5 `MOCK_EVIDENCES` cases (none of which is the SPC case), so overwriting
  them with SPC-specific text would misrepresent the interactive tool; left unchanged deliberately.

### gap (page4 → `ChapterGap.tsx`)
- `storyData.ts` `STORY_CHAPTERS[gap]`: title/summary `REPLACE`d with page4 HEADLINE/LEAD
  (`"2년이 넘었는데 아직도 조치중?"`, 1,566건/830건(53.0%)/736건(47.0%) statistic). thesis/
  timeframe had no matching block → `NOT_IN_PDF`, preserved.
- JSX: 2 replacements — hardcoded `<h2>` headline and lead `<p>` were stale literals duplicating the
  *pre-update* `STORY_CHAPTERS[gap]` values (this component does not read from `storyData.ts` at
  all), so they were updated to the same block_01/block_02 text now bound in the data layer, keeping
  the two sources of truth consistent.
- Known residual: the `SankeyFlowDiagram` component under this chapter still renders hardcoded
  legacy figures (5,000/1,800/3,200/600) that do not reconcile with the new 1,566/830/736 headline
  numbers — flagged in `PAGE_04_VISUAL_QA.csv` (`sankey_data_consistency=false`); not corrected in
  this pass (chart data wiring is out of scope for a copy/typography pass).

### cases (page6 → `ChapterCases.tsx` + `EDITORIAL_CASES`)
- `storyData.ts` `STORY_CHAPTERS[cases]`: title/thesis/summary/timeframe `REPLACE`d with page6's
  회피성 답변(모르겠습니다/기억이 안 납니다)/1,408건 statistic content.
- `EDITORIAL_CASES[case-01..05]` (블랙리스트/고용보험/수장률/등급분류/기금): **left untouched** —
  page6 content is topically the 잼버리/회피성 답변 case, unrelated to the existing 5 cases;
  substituting would have been an arbitrary/incorrect mapping, so it was deliberately not done.
- JSX: 0 replacements — no PDF block corresponds to any hardcoded string in `ChapterCases.tsx`.

### remains (page7 → `ChapterRemains.tsx`)
- `storyData.ts` `STORY_CHAPTERS[remains]`: title `PRESERVE`d (identical to page7 headline);
  thesis/summary/timeframe `REPLACE`d with page7 SUBHEAD/LEAD/LABEL text.
- JSX: 0 replacements — every hardcoded string in `ChapterRemains.tsx` already matched the
  corresponding PDF block 1:1 (minor en-dash vs hyphen formatting difference treated as an
  extraction artifact, not a content diff).
- Several substantive page7 blocks (metric cards, 47% 이행 미완료, 연도별 추이, 42/18/40% 분류)
  have no JSX counterpart at all in `ChapterRemains.tsx` — flagged as a follow-up
  content/layout task, not implemented here (would require new JSX structure, out of scope for a
  text-swap pass).

## 3. Images

No new image assets were available (`START_SNAPSHOT.json`:
`existing_real_assets_in_public_or_src_assets: false`, `user_provided_image_asset_input: false`).
Only one image slot exists across all six chapters (`ChapterPrologue.tsx`'s
`EditorialImageField`, hero portrait) — every other chapter has no image slot at all
(`EXISTING_IMAGE_INVENTORY.csv`). No image was inserted or swapped:
- The existing hero placeholder was left in its pending state (no `src`).
- The Ministry of Culture, Sports and Tourism emblem logo indicated by PDF block `b3` has no
  corresponding slot in the component and the extracted embed (`page1_embedded_4.jpeg`,
  960×272px, ~1.22× upscaled, JPEG artifacts) is not production-ready — logged as a request in
  `MISSING_ASSET_REQUEST.csv` (`slot=prologue-mcst-emblem-logo`) rather than fabricated/inserted.
- Follow-up QA (`PAGE_01_VISUAL_QA.csv`, `mock_placeholder_residual`) found that the hero slot's
  placeholder caption text (`"[Midjourney Hero Asset Slot: National Assembly Audit Document 2018]"`)
  is still visibly rendered to real users pending a real asset — see manifest `IMAGE_ASSET_PASS`.

## 4. Why `page5` / `answers` was excluded

`goal/page5.pdf` does not exist in the provided PDF set (`pdf_files_missing: ["page5.pdf"]` in
`START_SNAPSHOT.json`). Page 5 was expected to map to the `answers` chapter
(`ChapterAnswersAtlas.tsx` / `/atlas` route) per the page-order convention used for every other
chapter. This is recorded as a `PAGE_COMPONENT_CONTRADICTION` in `START_SNAPSHOT.json` and in
`UNRESOLVED_EDITORIAL_BLOCKS.csv` (`editorial_block_id=page5-entire`, `mapping_confidence=LOW`,
`implementation_action=UNRESOLVED`).

**Resolution (user-confirmed 2026-07-24):** proceed without page5. `ChapterAnswersAtlas.tsx` and
the `/atlas` route are left completely untouched (`PRESERVE_EXISTING`) — no mock content there was
edited or removed, and no fabricated substitute copy was written in place of the missing PDF. This
is why `PAGE_COMPONENT_MAPPING_PASS` is recorded as `PASS_WITH_EXCLUSION` rather than a plain
`PASS`/`FAIL` in the manifest: 6 of 7 story-page mappings are fully resolved; the 7th (`answers`) is
intentionally out of scope for this run pending a supplied `page5.pdf`.

## 5. DEV-only production gate — why and how it was removed

`FRONTEND_FILE_CHANGE_MAP.csv` and `START_SNAPSHOT.json` (`production_gate_finding`) record the
following: prior to this pass, `src/pages/story/StoryPage.tsx` gated `ChapterScale`, `ChapterRecord`,
`ChapterGap`, and `ChapterCases` behind `import.meta.env.DEV`, rendering a
`StoryChapterUnavailable` fail-closed placeholder in production builds (reasons
`APPROVED_STORY_METRICS_ABSENT` / `APPROVED_EVIDENCE_CHAIN_ABSENT` / `APPROVED_STATUS_FLOW_ABSENT` /
`APPROVED_EDITORIAL_CASES_ABSENT`). That gate existed because the content behind those four
chapters was mock/fixture data that had not been approved for public display.

**Why removed:** this integration pass replaces that mock data with editorial content sourced
directly from the approved PDFs (see §2), so the original justification for fail-closed gating no
longer applies to the four affected chapters. Per user confirmation (2026-07-24, recorded in
`START_SNAPSHOT.json`), the DEV-only gate for these 4 chapters was removed as part of this pass so
the newly-integrated editorial content actually renders in production.

**How:** `FRONTEND_FILE_CHANGE_MAP.csv` records `src/pages/story/StoryPage.tsx` as
`GATE_REMOVED` — the `import.meta.env.DEV` conditional branch was deleted so `ChapterScale`,
`ChapterRecord`, `ChapterGap`, `ChapterCases` render unconditionally, the same way
`ChapterPrologue`, `ChapterAnswersAtlas`, and `ChapterRemains` already did. `BUILD_TEST_RESULTS.json`
records `npm run build` succeeding (`success: true`, `errors: []`) against that state.

**⚠️ Important caveat found during this review:** the working-tree copy of
`src/pages/story/StoryPage.tsx` inspected while compiling this report (mtime `2026-07-24 03:04`,
i.e. *after* `BUILD_TEST_RESULTS.json` was written at `02:58`) has since had a **different**
conditional gate re-introduced —
`const fixtureChaptersEnabled = import.meta.env.DEV && import.meta.env.VITE_ATLAS_FIXTURE_PROVENANCE === 'CONTRACT_FIXTURE'`
— wrapping `ChapterScale`/`ChapterRecord`/`ChapterGap`/`ChapterCases` again in
`StoryChapterUnavailable` fallbacks. `git diff HEAD` confirms the committed HEAD
(`20835ec`) has the ungated version this workflow produced, but the current uncommitted file does
not. This repo's working tree shows evidence of other concurrent/parallel agent activity (the
broader `git status --porcelain` output below touches many unrelated Atlas/evidence files never
referenced by this workflow), so this is very likely a **race with another concurrent session**,
not an artifact of this integration run. It means: **as of right now, re-running `npm run build` /
loading the production route may reproduce the fail-closed placeholder for scale/record/gap/cases
again**, even though this workflow's own build check passed. This should be re-verified (and the
gate re-removed if still present) before treating `PRODUCTION_BUILD_PASS` as durable evidence that
the integrated copy is live in production.

## 6. Out-of-scope confirmation

`chapters_out_of_scope: ["answers", "method"]` (`START_SNAPSHOT.json`). `method` was excluded
because no PDF page was supplied for it (`STORY_CHAPTERS[7]`, not in `chapter_component_map`).
`answers` was excluded per §4.
