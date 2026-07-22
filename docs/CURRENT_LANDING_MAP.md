# Current Landing Map — P3_CULTURE Main Landing Sequence

## 1. Overview & Architectural Principle
- **Landing Architecture**: Main Landing Page (`StoryPage`) is a unified, continuous vertical editorial scroll document.
- **Image Interpretation**: User-provided capture sequence (STATE1) is **NOT** 7 independent routes nor a native horizontal scroll page; it is a stitched series of vertical scroll chapters captured from top to bottom and laid out left-to-right.
- **Global Header Relationship**: The global header (`HeaderNav`) stays stickied at `top-0` (`z-[var(--z-navigation)]`), independent of chapter transitions, serving global view switches (`story`, `method`, `data`, `about`) and presentation toggles.
- **Preserved Separate Routes**: `/method` (`MethodPage`), `/data` (`DataPage`), and `/about` (`AboutPage`) remain distinct, separate views accessible via header navigation and footer buttons.

---

## 2. Main Landing Section Sequence (Top to Bottom)

### Section 1: Prologue [LOCKED — CHAPTER 01]
- **Section ID**: `prologue`
- **Component**: `ChapterPrologue` (`src/widgets/prologue-scene/ChapterPrologue.tsx`)
- **Purpose**: Establishes 10-second core editorial question: "“검토하겠습니다” / 6년 뒤, 국정감사엔 무엇이 남았는가"
- **Height**: Full viewport height (`min-h-[var(--layout-hero-min-height)]`, `py-[var(--chapter-prologue-padding-block)]`)
- **Content Density**: High-contrast editorial typography, 12-column grid placement, asymmetric layout, paper canvas with SVG Evidence Line & Scale handoff elbow curve.
- **Interaction**: Animated drawing of Evidence Line (2.5px red thread), Scale handoff elbow at section bottom, first evidence trigger (`ev-101`), scroll cue button, presentation mode responsive scaling.
- **Visual Design**: High-contrast serif quote (`type-display-hero-quote`), micro mono metadata bar (`type-meta-micro`), pending Midjourney image slot (`prologue-hero-identity`).
- **Verdict**: **LOCKED** (Fully implemented, QA verified, gate `CHAPTER_01_LOCKED` passed).

### Section 2: Scale
- **Section ID**: `scale`
- **Component**: `ChapterScale` (`src/widgets/scale-scene/ChapterScale.tsx`)
- **Purpose**: Demonstrates the 6-year volume of audit requests (2018–2023), year-by-year distribution, and total metric counters.
- **Height**: Natural editorial height (`min-h-screen`, `py-20`)
- **Content Density**: Medium density (6-year timeline nodes, big metric numbers).
- **Interaction**: Timeline node hover, metric counter animation, node filtering trigger.
- **Visual Issue**: Year blocks feel slightly uniform without dark/light chapter contrast.
- **Verdict**: **REFINE** (Apply strict grid, controlled asymmetry, and image slot integration).

### Section 3: Record
- **Section ID**: `record`
- **Component**: `ChapterRecord` (`src/widgets/evidence-chain-scene/ChapterRecord.tsx`)
- **Purpose**: Visualizes the complete audit trail chain (Audit Request -> Assembly Question -> Agency Answer -> Result/Verification).
- **Height**: Extended height (`min-h-screen`, `py-20`)
- **Content Density**: High density (multi-step chain nodes, status pills, citation text).
- **Interaction**: Step node hover, chain path highlight, Evidence Drawer trigger.
- **Visual Issue**: Status connector lines can overlap on compact screen widths.
- **Verdict**: **REFINE** (Strengthen Evidence Line visual continuity and step badge typography).

### Section 4: Gap
- **Section ID**: `gap`
- **Component**: `ChapterGap` (`src/widgets/gap-scene/ChapterGap.tsx`)
- **Purpose**: Highlights the disparity between official "Completed" claims and verified actual outcomes across 3 status lanes (Solid, Dashed, Dotted).
- **Height**: Standard editorial height (`min-h-screen`, `py-20`)
- **Content Density**: High density (3 status lanes, verification badges, contrast metrics).
- **Interaction**: Status lane filtering, verification badge hover, case drawer trigger.
- **Visual Issue**: Background remains light; needs black inverse chapter visual weight for dramatic tension.
- **Verdict**: **REFINE** (Transform into high-contrast black inverse chapter as specified in editorial vision).

### Section 5: Answers
- **Section ID**: `answers`
- **Component**: `ChapterAnswersAtlas` (`src/widgets/atlas-scene/ChapterAnswersAtlas.tsx`)
- **Purpose**: Interactive SVG Topic Atlas displaying 8 agency response avoidance/compliance patterns (A1~A8).
- **Height**: Large interactive viewport (`min-h-screen`, `py-20`)
- **Content Density**: Extremely high density (SVG node cluster, legend, filters, agency cards).
- **Interaction**: SVG node hover/click, behavior quick filter, drawer slide-in trigger.
- **Visual Issue**: SVG coordinates need precise responsiveness on tablet viewports.
- **Verdict**: **REFINE** (Preserve topic cluster logic, elevate visual styling and node contrast).

### Section 6: Cases
- **Section ID**: `cases`
- **Component**: `ChapterCases` (`src/widgets/case-sequence/ChapterCases.tsx`)
- **Purpose**: Deep-dive into 5 flagship audit request case studies with full background evidence.
- **Height**: Multi-card sequence (`min-h-screen`, `py-20`)
- **Content Density**: High density (5 detailed case cards, tags, evidence links).
- **Interaction**: Case card selector, modal/drawer trigger, evidence node jump.
- **Visual Issue**: Horizontal reel vs vertical grid behavior needs strict outer margin alignment.
- **Verdict**: **REFINE** (Enhance card typography, image slots, and evidence line anchor points).

### Section 7: Remains
- **Section ID**: `remains`
- **Component**: `ChapterRemains` (`src/widgets/remains-scene/ChapterRemains.tsx`)
- **Purpose**: Journalistic conclusion ("Endless Questions"), branching evidence lines, and navigational bridge to Method/Data pages.
- **Height**: Full viewport ending stage (`min-h-screen`, `py-20`)
- **Content Density**: Medium density (conclusion statement, branching line graphic, CTA buttons).
- **Interaction**: Route switch triggers (`/method`, `/data`), citation copy.
- **Visual Issue**: Visual residue artwork placeholder needs Midjourney slot framing.
- **Verdict**: **REFINE** (Polish branching line graphic and transition to method/data routes).

---

## 3. Global Route & Shell Structure
1. `HeaderNav` (Sticky Top) -> Global brand, views (`story`, `method`, `data`, `about`), toggles (`isPresentationMode`, `isReducedMotion`).
2. `StoryPage` (Main Landing) -> ChapterPrologue, ChapterScale, ChapterRecord, ChapterGap, ChapterAnswersAtlas, ChapterCases, ChapterRemains.
3. `MethodPage` (`/method`) -> Methodology, limitations, audit rules.
4. `DataPage` (`/data`) -> Data schema, download contracts, mock datasets.
5. `AboutPage` (`/about`) -> Editorial team bio, project context, citation generator.
6. `GlobalOverlayRoot` -> Single `EvidenceDrawer` instance for all node/case/evidence inspection.
7. `FooterRail` (Sticky Bottom) -> Sticky bottom progress bar, current chapter label, status badges.
