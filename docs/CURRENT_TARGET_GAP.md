# Current vs Target Visual & Interaction Gap Analysis — P3_CULTURE

## Gate Status
- **VISUAL_GAP_DEFINED**: Verified
- **CHAPTER_REDESIGN_SCOPE_LOCKED**: Verified
- **PRE_IMPLEMENTATION_SSOT_PASS**: Verified

---

## 1. Context & Architectural Premise
Both current state (STATE1 capture) and target state (18.burocratik editorial vision) represent a single continuous vertical editorial scroll document laid out horizontally for visual auditing. The global header (`HeaderNav`, `sticky top-0`) and separate routes (`/method`, `/data`, `/about`) remain intact.

The gap analysis translates abstract visual desires into concrete, actionable CSS/HTML design decisions across 20 editorial dimensions.

---

## 2. 20-Axis Gap Analysis (Concrete Design Decision Translation)

### 1. Overall First Impression
- **Current**: Neat, structured research report with clean cards and standard data containers.
- **Target**: High-impact interactive editorial masterpiece combining exhibition catalog aesthetic, experimental publishing, and data art.
- **Concrete Decision**: Replace standard card borders with raw paper-cut edge lines, high-contrast display headlines (`clamp(3.5rem, 8vw, 7rem)`), and raw document fragment overlaps.

### 2. Type Scale
- **Current**: Standard 1.25 type ratio (Headings `2rem`–`3rem`, Body `1rem`, Mono `0.75rem`).
- **Target**: Extreme contrast juxtaposition between giant display serif (`clamp(4rem, 9vw, 8rem)`) and ultra-tiny tracked mono captions (`0.625rem` / `10px`, `tracking-[0.25em]`).
- **Concrete Decision**: Define `--font-display-hero: clamp(4.5rem, 10vw, 9rem)` and `--font-caption-micro: 0.625rem` with uppercase letter spacing `0.2em`.

### 3. Information Density
- **Current**: Evenly distributed data cards with uniform padding (`p-6` / `p-8`).
- **Target**: Pulsing density rhythm — alternating between expansive zero-text breathing spaces and ultra-dense data collages with overlapping annotations.
- **Concrete Decision**: Implement alternating `--space-ratio-expansive` (`clamp(5rem, 12vh, 10rem)`) and `--space-ratio-dense` (`clamp(1rem, 2vh, 2rem)`) section padding.

### 4. Margin & Whitespace
- **Current**: Symmetric horizontal container padding (`max-w-7xl mx-auto px-4 sm:px-8`).
- **Target**: Asymmetric magazine margins with 65% negative space on left or right, allowing display titles to bleed into empty gutters.
- **Concrete Decision**: Utilize `.offset-left` (cols 1–4 empty) and `.offset-right` (cols 9–12 empty) grid utilities on a global 12-column grid.

### 5. Grid System
- **Current**: Flexible CSS Flex/Grid layout with centered max-width containers.
- **Target**: Rigid, unyielding 12-column editorial grid visible through subtle 1px hairline rules (`var(--color-neutral-300)`).
- **Concrete Decision**: Lock `--layout-columns: 12` with `--layout-column-gap: clamp(1rem, 2vw, 2rem)` and render grid guidelines in background canvas.

### 6. Asymmetry
- **Current**: Predominantly symmetric card grids (1:1, 1:1:1, or 2:2).
- **Target**: Controlled asymmetry where 8-column main content text is offset against 3-column micro data marginalia and overlapping evidence tags.
- **Concrete Decision**: Map primary narrative blocks to `col-span-8` (cols 1–8) and secondary evidence notes to `col-span-3` (cols 10–12).

### 7. Color Contrast
- **Current**: Warm paper background (`#f2f0ea`) with dark ink text (`#0a0a0a`) and soft red accents (`#8b342f`).
- **Target**: Stark, polar contrast with sudden full-bleed black inverse chapters (`#0a0a0a` canvas) that drop the room temperature.
- **Concrete Decision**: Introduce `.chapter-inverse` mode using `#0a0a0a` paper, `#f2f0ea` ink, and vivid `#ff3333` evidence red.

### 8. Image Usage & Framing
- **Current**: Functional inline thumbnail graphics and icon chips.
- **Target**: Editorial image slots with Midjourney artwork, archival document cutouts, paper textures, and parallax background layers.
- **Concrete Decision**: Add dedicated `<figure className="editorial-image-slot">` containers with CSS mask-image paper-edge effects and image blend modes.

### 9. Data Visualization
- **Current**: Clean SVG charts and interactive topic clusters with standard node points.
- **Target**: High-craft data art featuring mathematical node lines, cross-section crosshairs, and data callout lines pointing to exact textual quotes.
- **Concrete Decision**: Overlay vector crosshairs (`+`) and dynamic leader lines connecting SVG nodes directly to editorial quote blocks.

### 10. Document Texture & Fragments
- **Current**: Clean digital card backgrounds with rounded corners (`rounded-xl`).
- **Target**: Archival paper aesthetics with 1px border lines, subtle noise overlays, stamp badges ("REVIEWED / Audit 2018", "VERIFIED"), and ripped document fragment edges.
- **Concrete Decision**: Enforce sharp border radii (`rounded-none` or `rounded-sm`, max `4px`), background noise SVG filter, and stamp overlay badges.

### 11. Bright vs. Dark Inverse Scenes
- **Current**: Monolithic light background throughout all 7 chapters.
- **Target**: Precise light/dark scene contrast rhythm — Prologue (Paper/Light) -> Scale (Paper/Light) -> Record (Paper/Light with partial dark inserts) -> Gap (Full Black Inverse) -> Answers (Paper/Light Chapter with localized Black Atlas Field container) -> Cases (Paper/Light) -> Remains (Light to Dark Residue transition).
- **Concrete Decision**: Toggle `data-theme="light"` and `data-theme="inverse"` at chapter section root elements (`<section className="chapter-frame">`), ensuring Gap and Answers are NOT consecutive full-black chapters.

### 12. Chapter-to-Chapter Visual Continuity
- **Current**: Distinct section dividers or simple vertical margin gaps.
- **Target**: Continuous visual objects (primarily the Evidence Line) that cut through chapter boundaries, changing thickness, color, and line pattern (solid -> dashed -> dotted) across scenes.
- **Concrete Decision**: Pass Evidence Line SVG vector coordinates across chapter boundaries with dynamic `stroke-dasharray` and `stroke-width` triggers.

### 13. Scroll Rhythm
- **Current**: Standard smooth scroll with uniform speed.
- **Target**: Natural, unhijacked native vertical scroll cadence with IntersectionObserver chapter tracking and motion/react scene entrance transitions.
- **Concrete Decision**: Enforce native vertical scrolling (`overflow-y: auto`), removing all wheel hijacking, mandatory scroll snaps, and decorative particle animations.

### 14. Interaction Intensity
- **Current**: Hover tooltips and card click drawer triggers.
- **Target**: Focused, local interactive depth — cursor hover crosshairs, active quote highlighting, node connection inspection, and slide-in evidence comparison drawers.
- **Concrete Decision**: Maintain active hover state contexts within local component state, avoiding cross-chapter global interaction loops.

### 15. UI Exposure Level
- **Current**: Visible controls, tabs, and buttons on every component.
- **Target**: Minimalist UI exposure — chrome auto-hides or stays tucked into borders until hovered, letting editorial imagery and typography dominate.
- **Concrete Decision**: Style control buttons as subtle border-attached micro-tabs with mono micro-typography.

### 16. Evidence Line Presence
- **Current**: A subtle red accent line in Prologue and Record scenes.
- **Target**: The dominant narrative protagonist — a persistent, living red thread (`#8b342f` / `#ff3333`) that carries the reader from 2018 audit questions to 2023 unresolved outcomes.
- **Concrete Decision**: Render Evidence Line in absolute SVG layer with `z-index: 20`, animating stroke length on scroll intersection.

### 17. Atlas Editorial Expression
- **Current**: Functional SVG node cluster representing agency response behaviors.
- **Target**: Archival response pattern matrix (`답변행태 / 응답유형`), mapping 8 response categories (A1–A8 across Non-direct, Procedural, and Action groups) with coordinate crosshairs and node connections.
- **Concrete Decision**: Frame Atlas with coordinate crosshairs, grid indices (X: 2018–2023, Y: Answer Pattern Type), and localized black SVG canvas field styling within a light chapter wrapper.

### 18. Case Narrativity
- **Current**: Grid of 5 case study cards with detail buttons.
- **Target**: Editorial investigative reportage — each case unfolds like a newspaper dossier with full-bleed photographic evidence, primary quote excerpts, and timeline callouts.
- **Concrete Decision**: Reframe Case components into asymmetric 2-column dossier layouts (Col 1: Primary Evidence & Photo, Col 2: Audit Trail Narrative).

### 19. Ending Residue
- **Current**: Closing callout text with buttons linking to Method and Data pages.
- **Target**: Poignant journalistic aftermath — branching red evidence lines dissolving into infinite dots, leaving an indelible impression of "Endless Questions".
- **Concrete Decision**: Animate Evidence Line branching into sub-threads that fade into micro-dots over an archival image mask.

### 20. Mobile Transition Viability
- **Current**: Stacked single-column layouts on small screens.
- **Target**: Fluid, mobile-first responsive re-composition — maintaining giant typography scale through CSS `clamp()`, collapsing 12 columns to 4 columns without losing evidence line continuity.
- **Concrete Decision**: Define `@media (max-width: 640px)` fallbacks that convert horizontal node chains into vertical timeline tracks and bottom-sheet drawers.

---

## 3. Global Categorization: PRESERVE / REFINE / REBUILD

### PRESERVE (Must Keep Intact)
1. **Global Shell & Header**: `HeaderNav` persistent sticky mounting, brand title, view routing tabs (`/story`, `/method`, `/data`, `/about`).
2. **FSD-lite Architecture**: FSD directory structure (`app`, `pages`, `widgets`, `shared`), `OverlayProvider`, and `GlobalOverlayRoot`.
3. **Data Models**: All 6-year audit records, 8 response pattern categories (`A1`–`A8`), 5 case studies (`CASE_STUDIES`), and evidence nodes in `storyData.ts`.
4. **Single-Drawer System**: `EvidenceDrawer` centralized slide-in architecture.

### REFINE (Enhance Visual & Interaction Language)
1. **Prologue Scene**: Scale typography to Display XL (`clamp(4.5rem, 9vw, 8rem)`), heighten Evidence Line stroke animation.
2. **Scale Scene**: Convert timeline cards to rigid 12-column grid layout with micro-mono year markers.
3. **Record Scene**: Sharpen chain connector vectors, add paper-cut badge styling to status nodes.
4. **Answers Atlas Scene**: Enhance SVG coordinate styling, add response pattern matrix crosshairs and localized dark field styling.
5. **Cases Scene**: Refine case cards into asymmetric dossier layouts with high-contrast typography.
6. **Remains Scene**: Elevate branching line vector graphics and navigational CTA buttons.

### REBUILD (Scene-Level Visual Re-construction)
1. **Gap Scene**: Rebuild visual canvas into a **Black Inverse Chapter** (`data-theme="inverse"`) featuring 3 stark status lanes (Solid, Dashed, Dotted) with extreme color contrast (`#0a0a0a` canvas, `#ff3333` evidence line) to create dramatic narrative tension.
