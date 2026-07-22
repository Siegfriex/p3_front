# Chapter Redesign Matrix — P3_CULTURE Main Landing

## Gate Status
- **CHAPTER_REDESIGN_SCOPE_LOCKED**: Verified
- **PRE_IMPLEMENTATION_SSOT_PASS**: Verified

---

## 1. Chapter-by-Chapter Redesign Matrix

| Field | Chapter 1: Prologue | Chapter 2: Scale | Chapter 3: Record |
|---|---|---|---|
| **Chapter** | `prologue` (`ChapterPrologue`) | `scale` (`ChapterScale`) | `record` (`ChapterRecord`) |
| **Current State** | Clean intro hero with title "6년간 누적된 시정요구", subtitle, and initial SVG line. | 2018–2023 year cards with metric numbers and simple timeline grid. | Multi-step horizontal chain (Request -> Question -> Answer -> Outcome) with status pills. |
| **Target State** | Giant display editorial statement with asymmetric paper-cut framing and high-impact Evidence Line entry. | Rigid 12-column timeline matrix with micro-mono year tags, statistical callout bands, and image slots. | Archival evidence trail chain with vector connector lines, paper-cut document badges, and quote callouts. |
| **Gap** | Heading size too small; lacks extreme typographic scale contrast and high-impact hero image slot. | Year cards look uniform; needs asymmetric column spans and dark/light grid guidelines. | Connector lines overlap on smaller screens; needs vector precision and high-contrast status badges. |
| **Preserve** | Core 10-second question text; presentation mode trigger; section ID `#prologue`. | 6-year audit dataset (2018–2023); year selection filtering logic; metric counter logic. | Evidence chain data structure; step node sequence; `openEvidenceDrawer` callback. |
| **Refine** | Increase headline font size to `clamp(4.5rem, 9vw, 8rem)`; align with 12-column grid. | Apply rigid 12-column grid (`col-span-2` per year); add micro mono metadata (`0.625rem`). | Sharpen vector connector lines; format quote snippets with serif italic styling. |
| **Rebuild** | N/A | N/A | N/A |
| **Visual Motif** | Giant serif display title, single bold vertical red line entry (`#8b342f`), raw paper background. | 6-column vertical line grid, micro year badges (`2018`–`2023`), big statistic numerals (`6,412`). | Horizontal vector rail, status step nodes (Solid, Dashed, Dotted), stamped quote tags (`REVIEWED`). |
| **Motion Motif** | Smooth path drawing of Evidence Line on scroll viewport intersection. | Staggered counter reveal (`0` to target) on viewport intersection. | Sequential node highlight on viewport intersection; line path extension. |
| **Image Role** | Hero Identity Image Slot (Archival document texture with high-contrast paper edges). | Chapter Transition Image Slot (2018–2023 audit document thumbnail collage). | Document Fragment Image Slot (Primary audit question sheet scan cutout). |
| **Technical Impact** | CSS token updates (`--font-display-hero`); Framer Motion path animation tuning. | Grid utility classes (`grid-cols-12`); metric counter hook optimization. | SVG vector coordinate mapping; responsive step wrapping for small viewports. |
| **Risk** | Text wrapping on narrow mobile screens if clamp parameters are misconfigured. | Overcrowding of 6 year columns on mobile viewports without responsive stacking. | Line overlap on intermediate tablet breakpoints. |

---

| Field | Chapter 4: Gap | Chapter 5: Answers (Atlas) | Chapter 6: Cases | Chapter 7: Remains |
|---|---|---|---|---|
| **Chapter** | `gap` (`ChapterGap`) | `answers` (`ChapterAnswersAtlas`) | `cases` (`ChapterCases`) | `remains` (`ChapterRemains`) |
| **Current State** | Light-theme 3 status lanes (Solid, Dashed, Dotted) displaying reported vs verified status. | Interactive SVG topic cluster representing 8 answer behavior categories (A1–A8). | Grid of 5 case study cards with detail buttons and tag chips. | Editorial closing statement with branching line SVG and route CTA buttons. |
| **Target State** | **Full Black Inverse Chapter** (`data-theme="inverse"`) with extreme dark contrast (`#0a0a0a`), vivid red evidence line (`#ff3333`), and 3 stark status lanes. | Response pattern topic matrix (A1–A8) with coordinate crosshairs, behavior filters, in a light chapter wrapping a localized black SVG field. | Asymmetric investigative dossier cards with primary evidence quotes, photo slots, and paper stamp badges. | Poignant journalistic aftermath with branching evidence threads dissolving into micro-dots and route portals. |
| **Gap** | Currently uses light theme; lacks dramatic contrast drop and high-tension dark canvas. | Needs localized black SVG field framing and crosshair coordinates within a light paper wrapper. | Cards look like standard web UI; needs newspaper dossier layout with asymmetric column spans. | Branching lines need higher vector fidelity and smooth transition to Method/Data links. |
| **Preserve** | 3 status lanes data structure; verification percentages; case drawer triggers. | 8 response pattern categories (A1–A8); SVG node cluster dataset; drawer callback. | 5 flagship case studies dataset; tag filters; detail modal/drawer callbacks. | Journalistic closing statement ("Endless Questions"); route buttons (`/method`, `/data`). |
| **Refine** | Reframe content onto inverse dark theme; enhance contrast of status badges. | Add matrix crosshair overlays, grid indices, and localized black SVG field styling inside light section. | Re-layout case cards into 2-column asymmetric dossiers (`col-span-7` narrative, `col-span-5` evidence). | Polish SVG branching line artwork; format route transition CTA cards. |
| **Rebuild** | **Rebuild canvas theme to Black Inverse Chapter** (`chapter-inverse`) for maximum editorial impact. | N/A | N/A | N/A |
| **Visual Motif** | Dark inverse canvas (`#0a0a0a`), glowing red evidence thread (`#ff3333`), 3 stark horizontal lanes. | Response pattern matrix, crosshair icons (`+`), behavior badge pills (`A1`–`A8`), localized dark SVG field. | Newspaper dossier layout, stamped badges (`ARCHIVE`, `VERIFIED`), full-bleed image slots. | Branching vector roots fading to micro-dots, dark-to-light gradient transition to footer. |
| **Motion Motif** | Pulse glow on discrepancy metric; smooth lane highlight on scroll. | SVG node hover scale up (`1.0` to `1.25`); smooth path connection draw on hover. | Card hover lift (`translateY(-4px)`); paper badge fade-in. | Micro-dot fade-out along branching lines on viewport exit. |
| **Image Role** | Inverse Section Visual Slot (High-contrast negative space document mask). | Atlas Field Image Slot (Background agency network density mask). | Case Object Image Slot (5 flagship case evidence photo/document scans). | Ending Residue Image Slot (Dissolving paper texture and archival stamp). |
| **Technical Impact** | CSS `data-theme="inverse"` token override; contrast WCAG compliance check. | SVG responsive viewport calculations; localized black field styling inside light wrapper. | Asymmetric grid CSS spans; modal/drawer state binding. | SVG path animation with `stroke-dasharray` dissolve effect. |
| **Risk** | Low contrast text on dark background if token fallbacks are missing. | Performance degradation if too many SVG node calculations run on scroll. | Layout breakage on mobile if 2-column dossier does not stack vertically. | Route navigation flicker during transition to `/method` or `/data`. |

