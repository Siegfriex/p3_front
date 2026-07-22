# Screenshot Section Map — STATE1 Capture Alignment

## 1. Important Note on STATE1 Image Structure
- **Image Nature**: The STATE1 screenshot provided by the user is **NOT** a collection of 7 distinct sub-pages nor a native horizontal scroll interface.
- **True Structure**: It is a full-page vertical scroll audit of the single-page Main Landing (`StoryPage`). The vertical sections were captured from top to bottom as the user scrolled down, and then arranged left-to-right horizontally into a single reference strip.
- **Global Header**: The header observed at the top of each capture column is the same persistent `HeaderNav` (`sticky top-0`) captured at different scroll positions.

---

## 2. Screenshot-to-Section Mapping Matrix

### Capture 1 (Far Left Column)
- **Capture Order**: 1 (Top of Main Landing)
- **Current Section ID**: `prologue`
- **Current Component**: `ChapterPrologue` (`src/widgets/prologue-scene/ChapterPrologue.tsx`)
- **Current Purpose**: Intro statement presenting the core question of the 6-year National Assembly Culture Committee Audit.
- **Current Height**: `min-h-screen` (Full Viewport)
- **Current Content Density**: Expansive / Low (Hero title, subtitle, Evidence Line entry).
- **Interaction**: Animated drawing of Evidence Line, scroll cue click, presentation mode switch.
- **Current Visual Issue**: Requires richer typographic hierarchy contrast and high-impact hero visual slot.
- **Judgment**: **REFINE** (Keep DOM structure & section ID, refine typography and Evidence Line animation).

---

### Capture 2 (Second Column from Left)
- **Capture Order**: 2 (Second Scroll Chapter)
- **Current Section ID**: `scale`
- **Current Component**: `ChapterScale` (`src/widgets/scale-scene/ChapterScale.tsx`)
- **Current Purpose**: Scale & Timeline scene showing total audit request volume across 2018–2023.
- **Current Height**: `min-h-screen` (Full Viewport)
- **Current Content Density**: Medium (Big stat numbers, 6-year timeline cards).
- **Interaction**: Year node hover, metric counter update, filter by year.
- **Current Visual Issue**: Timeline nodes can be styled with sharper high-contrast editorial grid lines.
- **Judgment**: **REFINE** (Keep data bindings, refine grid alignment and metric typography).

---

### Capture 3 (Third Column from Left)
- **Capture Order**: 3 (Third Scroll Chapter)
- **Current Section ID**: `record`
- **Current Component**: `ChapterRecord` (`src/widgets/evidence-chain-scene/ChapterRecord.tsx`)
- **Current Purpose**: Evidence Chain visualization connecting Request -> Question -> Answer -> Outcome.
- **Current Height**: `min-h-screen` (Full Viewport)
- **Current Content Density**: High (Chain step nodes, status indicators, quote fragments).
- **Interaction**: Chain step click, Evidence Drawer trigger (`openEvidenceDrawer`).
- **Current Visual Issue**: Connector lines between steps need sharper vector styling and evidence line linkage.
- **Judgment**: **REFINE** (Preserve chain logic, refine visual connectors and status pills).

---

### Capture 4 (Fourth Column from Left)
- **Capture Order**: 4 (Fourth Scroll Chapter)
- **Current Section ID**: `gap`
- **Current Component**: `ChapterGap` (`src/widgets/gap-scene/ChapterGap.tsx`)
- **Current Purpose**: Disparity analysis between official "Completed" claims vs verified real-world gap across 3 status lanes.
- **Current Height**: `min-h-screen` (Full Viewport)
- **Current Content Density**: High (3 status lanes: Solid, Dashed, Dotted; verification badges).
- **Interaction**: Lane filter, verification item hover, open case drawer.
- **Current Visual Issue**: Lacks dramatic black inverse chapter transition for maximum editorial contrast.
- **Judgment**: **REFINE** (Apply black inverse theme styling while maintaining status lane data structures).

---

### Capture 5 (Fifth Column from Left)
- **Capture Order**: 5 (Fifth Scroll Chapter)
- **Current Section ID**: `answers`
- **Current Component**: `ChapterAnswersAtlas` (`src/widgets/atlas-scene/ChapterAnswersAtlas.tsx`)
- **Current Purpose**: Interactive SVG Topic Atlas displaying 8 agency response avoidance patterns (A1~A8).
- **Current Height**: `min-h-screen` (Full Viewport)
- **Current Content Density**: Very High (Interactive SVG node map, legend, agency cards).
- **Interaction**: SVG node hover/click, behavior quick filter, drawer slide-in trigger.
- **Current Visual Issue**: SVG node positioning needs strict grid bounds on varying device widths.
- **Judgment**: **REFINE** (Preserve 8 behavior types & topic data, refine SVG cluster layout & node contrast).

---

### Capture 6 (Sixth Column from Left)
- **Capture Order**: 6 (Sixth Scroll Chapter)
- **Current Section ID**: `cases`
- **Current Component**: `ChapterCases` (`src/widgets/case-sequence/ChapterCases.tsx`)
- **Current Purpose**: Deep-dive case study sequence highlighting 5 representative audit request cases.
- **Current Height**: `min-h-screen` (Full Viewport)
- **Current Content Density**: High (5 case study cards, tag chips, evidence links).
- **Interaction**: Case selector tabs, detail drawer trigger, evidence node jump.
- **Current Visual Issue**: Card grid spacing should adhere strictly to 12-column page margins.
- **Judgment**: **REFINE** (Keep 5 case data models, refine editorial card composition).

---

### Capture 7 (Seventh Column from Left / Far Right)
- **Capture Order**: 7 (Bottom of Main Landing)
- **Current Section ID**: `remains`
- **Current Component**: `ChapterRemains` (`src/widgets/remains-scene/ChapterRemains.tsx`)
- **Current Purpose**: Journalistic closing section ("Endless Questions") and navigation portal to Method/Data views.
- **Current Height**: `min-h-screen` (Full Viewport)
- **Current Content Density**: Medium (Branching line graphic, editorial closing text, route links).
- **Interaction**: Route navigation buttons (`/method`, `/data`), citation copy button.
- **Current Visual Issue**: Needs Midjourney visual residue image slot framing.
- **Judgment**: **REFINE** (Preserve navigation triggers, enhance branching line graphic and ending artwork slot).
