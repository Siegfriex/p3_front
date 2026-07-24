# Editorial Story Renewal — Visual Polish Result

## Overall verdict

- Implementation and runtime QA: **PASS**.
- Publication/content clearance: **PARTIAL PASS**. PDF-derived photographs and document crops remain visibly marked `PDF SOURCE / RIGHTS REVIEW`; final publication still needs asset-rights and source clearance.
- Approved-data boundary: **PASS**. Article aggregates are editorial findings, while Atlas metrics and Evidence links remain release-backed and are explicitly presented as a separate layer.

## Article flow delivered

The Story route now reads as one continuous article:

1. `국정감사, 그저 쇼인가` — question, scope and method.
2. `1,566 / 830 / 736` — overall implementation finding and native yearly comparison.
3. Doping case — long-running `조치 중`, institutional consultation and the missing public outcome.
4. SPC case — `조치 완료` on paper versus repeated field risk.
5. Two-case synthesis — completion without verified effect versus progress without visible process.
6. `1,408 / 428` — evasive-answer definition, six-year sequence and 2024 quotation.
7. Conclusion — what should be verified after an audit, followed by the approved Atlas/Evidence continuation.

## Visual changes

| Area | Result |
|---|---|
| Information hierarchy | Explicit `story-hierarchy-1` through `story-hierarchy-5`; rank 5 is reserved for chapter headlines. |
| Python-style figures | Raster chart concepts were rebuilt as semantic HTML/CSS: grouped completion bars, five-step policy/case flows, SPC redline timeline, six-year evasive-answer bars and conclusion spark. |
| Long-form rhythm | Alternating 7/5, 8/4, full-width timeline, evidence band and contrast-card layouts preserve the existing paper/ink/redline language. |
| Mobile | Native figures collapse to one-column reading order; year and auxiliary labels were raised to about 11px; no horizontal page overflow. |
| Media provenance | Seven WebP derivatives are kept as reviewable editorial assets; every PDF-sourced figure carries a rights-review stamp and source caption. |
| Accessibility | Semantic figures/lists, visible focus, 44px interaction targets, footer clearance and high-contrast inverse labels. |

## PDF audit decisions

- `goal/page1.pdf` through `page7.pdf` were treated as editorial-direction composites, not finished production layouts.
- Page 4 values `159/317`, `354/147`, `317/272` and totals `830/736 = 1,566` were retained.
- Page 6 values `201, 176, 250, 104, 428, 249 = 1,408` were retained.
- The old Sankey values and the page 7 monotonic chart were not reused because they conflict with the supplied article totals.
- SPC article media and approved Atlas Evidence were not merged into one evidence record.

## Runtime and verification

| Gate | Result |
|---|---|
| TypeScript | `npm run typecheck` — PASS |
| ESLint | `npm run lint` — PASS, zero warnings |
| Unit tests | `npm run test` — PASS, 21 files / 58 tests |
| Production build | `npm run build` — PASS, 2,185 modules |
| Story runtime | Desktop 1440x900 and mobile 390x844 — 7/7 chapters, tracker order 7/7 |
| Layout | page horizontal overflow 0; fixed-footer interactive overlap 0 |
| Runtime errors | console 0; page errors 0 |
| Axe runtime | critical 0; serious 0 on both Story viewports |
| Atlas/Story integration E2E | `atlas-experience-design.spec.ts` — PASS, 6/6 across 375, 768, 1440 and 1920 widths |

Latest runtime evidence:

- `/tmp/story_visual_baseline/FINAL_STORY_RUNTIME_QA_20260724_0423_KST.md`
- `/tmp/story_visual_baseline/runtime-audit.json`
- `/tmp/story_visual_baseline/a11y-audit.json`
- `/tmp/story_visual_baseline/screenshots/desktop-1440x900-{scale,record,gap,cases,remains}.png`
- `/tmp/story_visual_baseline/screenshots/mobile-390x844-{scale,record,gap,cases,remains}.png`

## Remaining debt

1. Replace PDF/news-image proxies after rights and high-resolution source clearance.
2. The Vite configuration intentionally inlines editorial WebP assets, producing a Story chunk warning (`519.27 kB`, gzip `314.87 kB`). This is non-blocking but should be revisited if the deployment pipeline can safely upload binary assets separately.
3. The article aggregates must not be described as approved Atlas release metrics until their source package receives the same provenance and approval treatment as the Atlas bundle.

## Shared-worktree note

During this run another active session committed the main Story/Atlas presentation set as current `HEAD aa6c391`. The final mobile label and contrast corrections in `story-editorial.css` and `story-atlas-vid.css` remain working-tree changes. No unrelated dirty files were staged, reset or deleted by this workflow.
