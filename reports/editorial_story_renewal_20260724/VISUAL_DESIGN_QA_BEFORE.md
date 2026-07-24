# Visual Design QA Report — Editorial Story Renewal

## 1. Overall Visual Verdict

- Verdict: **FAIL — PDF editorial direction is not yet represented by the active approved Story chapters.**
- Biggest risk: the active production route renders generic approved-release summaries for Chapters 01, 02, 03 and 05, while the six `goal/page*.pdf` files define six distinct article narratives, visual anchors and headline hierarchies.
- Contract boundary: approved Atlas metrics and Evidence navigation must remain release-backed. PDF-authored article copy and supplied editorial figures may frame the story, but must not be substituted for the approved Atlas transport.

## 2. Screenshot Inventory

| Screen | Viewport / source | Evidence path | Verdict |
|---|---:|---|---|
| Prologue direction | PDF artboard | `goal/page1.pdf` / `pdf_renders/page1.png` | hierarchy present, implementation incomplete |
| Doping case | PDF artboard | `goal/page2.pdf` / `pdf_renders/page2.png` | content-rich, active chapter absent |
| SPC evidence chain | PDF artboard | `goal/page3.pdf` / `pdf_renders/page3_overview.png` | strong timeline concept, active chapter absent |
| Completion gap | PDF artboard | `goal/page4.pdf` / `pdf_renders/page4_overview.png` | key 1,566 / 830 / 736 story absent |
| Evasive answers | PDF artboard | `goal/page6.pdf` / `pdf_renders/page6.png` | key 1,408 / 428 story absent |
| Conclusion | PDF artboard | `goal/page7.pdf` / `pdf_renders/page7_overview.png` | current conclusion omits the principal finding card |
| Current Story desktop/mobile | runtime capture pending | `screenshots/before/` | browser capture to be completed before final verdict |

## 3. Visual Hierarchy Audit

| Screen | Problem | User impact | Proposed correction | Priority |
|---|---|---|---|---|
| All Story chapters | No explicit 1–5 editorial hierarchy contract | headings, leads, metrics and captions compete | introduce role-based hierarchy tokens: 5 headline, 4 standfirst, 3 metric/subhead, 2 body/quote, 1 source/meta | P0 |
| Prologue | placeholder hero field remains; method/source line is visually missing | opening lacks authorship and documentary credibility | use supplied source visual, preserve dominant question headline, add compact method line | P0 |
| Scale | active component shows only release inventory metrics | PDF's doping policy story disappears | build asymmetric case layout with headline, standfirst, report excerpt and supplied figures | P0 |
| Record | active component is a generic four-cell trace | the administrative-completion versus field-safety contrast is lost | create five-stage redline timeline and memorial/SPC evidence pair | P0 |
| Gap | active component shows release distribution only | PDF's 53%/47% finding has no narrative anchor | lead with editorial finding, add supplied field photo, retain approved distribution as a separate release-backed module | P0 |
| Cases | active component shows first three generic Evidence cards | evasive-answer definition, 1,408 total and 2024 spike are absent | add quote-led case page and six-year micro-bar sequence, then approved Evidence links | P0 |
| Remains | conclusion is centered and sparse | synthesis is weaker than preceding chapters | add finding summary, 1,408/428 card and stronger final thesis before CTAs | P0 |

## 4. Layout / Spacing Audit

| Location | Current problem | Recommended grid / spacing | Priority |
|---|---|---|---|
| Chapter headers | similar 5/7 split repeats across chapters | vary 7/5, 8/4 and full-bleed evidence bands while preserving a 12-column base | P1 |
| Image evidence | PDF assets have no stable figure/caption primitive in active chapters | image + caption + source should remain one semantic `figure` block | P0 |
| Mobile | large numbers and fixed FooterRail require explicit bottom clearance | one-column flow below 720px; minimum 4rem final safe area | P0 |
| Long Korean copy | narrow columns can over-fragment lines | body measure 38–54rem; `word-break: keep-all` with safe overflow fallback | P1 |

## 5. Typography Audit

| Location | Current problem | Recommended token | Priority |
|---|---|---|---|
| Primary article headline | multiple display classes with no documented editorial rank | hierarchy 5, serif, `clamp(2.7rem, 6vw, 6.8rem)` | P0 |
| Lead / standfirst | body and lead roles are visually close | hierarchy 4, sans/serif mix, `clamp(1.25rem, 2vw, 2rem)` | P0 |
| Key metrics | generic card figures do not carry article emphasis | hierarchy 3 metric, tabular nums, `clamp(2.5rem, 6vw, 5.75rem)` | P0 |
| Body / quotations | source excerpts lack a consistent readable measure | hierarchy 2, 1–1.125rem, 1.7 line-height | P0 |
| Sources / labels | metadata tracking is sometimes too wide for Korean | hierarchy 1, 0.7–0.8rem, reduced Korean letter-spacing | P1 |

## 6. Color / Contrast / WCAG Audit

| Location | Problem | Assessment | Correction | Priority |
|---|---|---:|---|---|
| Article states | current palette has appropriate paper/ink tokens but weak hierarchy usage | likely AA for primary text | use ink for body, dark signal red for evidence lines and emphasis, never red alone for meaning | P0 |
| Image captions | overlays risk low contrast on photographs | unverified | captions live below image on paper surface; no text over photos | P0 |
| Focus states | new figure actions and Evidence buttons must preserve focus visibility | required | 2px signal-red outline with 3px offset | P0 |
| Mobile affordance | horizontally overflowing content must expose a cue | required | avoid hidden-scrollbar-only patterns in renewed chapters | P0 |

## 7. Interaction Audit

| Component | Problem | Test method | Correction | Priority |
|---|---|---|---|---|
| Evidence links | active release navigation must survive layout rewrite | keyboard + pointer + route assertion | reuse `openEvidence()` and approved Evidence IDs only | P0 |
| Chapter navigation | fixed rail may cover final content | 390x844 scroll and `elementFromPoint` | preserve FooterRail and add chapter-end clearance | P0 |
| Reduced motion | reveal effects exist in prologue only | emulate reduced-motion | keep renewed content legible without motion; decorative motion optional | P1 |

## 8. Design Token Recommendations

- color: paper canvas, raised paper, ink, muted ink, signal red, evidence blue, archive amber.
- typography: explicit `story-hierarchy-5` through `story-hierarchy-1` roles.
- spacing: 4 / 8 / 12 / 16 / 24 / 32 plus chapter-scale 64 / 96 / 144.
- radius: square archival blocks; limited 2px controls only.
- shadow: use borders and offset rules before shadow; image plates may use one restrained shadow.
- z-index: content below sticky navigation and FooterRail; no chapter-local overlay above navigation.
- motion: 150–600ms, opacity/translation only, reduced-motion safe.

## 9. P0 Patch Plan

| File | Planned change | Reason |
|---|---|---|
| `src/widgets/approved-story-scenes/ApprovedStoryChapters.tsx` | rebuild active Scale/Record/Gap/Cases chapters around the six PDF narratives while retaining release-backed modules | this is the actual production Story path |
| `src/widgets/prologue-scene/ChapterPrologue.tsx` | replace placeholder treatment with supplied editorial visual and method/source hierarchy | complete page1 direction |
| `src/widgets/remains-scene/ChapterRemains.tsx` | add synthesis copy and evasive-answer finding card | complete page7 direction |
| `src/app/styles/story-editorial.css` | add 1–5 hierarchy, editorial grids, figure, timeline and responsive primitives | consistent information architecture |
| `src/app/styles/globals.css` | import the focused Story stylesheet | avoid scattering one-off utility combinations |

