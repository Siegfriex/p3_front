# Implementation Baseline & Audit Report — P3_CULTURE

## Gate Status
**CURRENT_STATE_REGISTERED**

---

## 1. Executive Summary & Audit Baseline
The P3_CULTURE codebase is a fully functioning, high-craft editorial data journalism web application built with React 18, TypeScript, Tailwind CSS, motion animations, and an FSD-lite architecture.

This baseline report captures the 19 core structural and technical checkpoints prior to incremental chapter refinement.

---

## 2. Comprehensive 19-Point Codebase Audit

### 1. Global Header Structure
- **Location**: `src/widgets/app-shell/HeaderNav.tsx`
- **Structure**: Brand logo/title ("문체위 국정감사 6년"), main view navigation tabs ("에세이", "방법론", "데이터", "소개"), and utility toggles (Presentation Mode, Motion Reduction).

### 2. Global Header Sticky/Fixed State
- **Implementation**: `header className="sticky top-0 z-[var(--z-navigation)] w-full bg-[var(--color-paper)]/90 backdrop-blur-md border-b border-[var(--color-neutral-200)]"`
- **Behavior**: Stays continuously mounted at the top of the viewport across all scroll positions and view switches. Does not re-render or reset on chapter scrolling.

### 3. Main Landing Route
- **View ID**: `story` (`StoryPage` component in `src/pages/story/StoryPage.tsx`)
- **Behavior**: Renders as the default active view in `AppRouter` (`src/app/router/AppRouter.tsx`).

### 4. Separate Detail Page Routes
- **`/method`**: `MethodPage` (`src/pages/method/MethodPage.tsx`) — Journalism methodology and limitations.
- **`/data`**: `DataPage` (`src/pages/data/DataPage.tsx`) — Data schema specifications and download contracts.
- **`/about`**: `AboutPage` (`src/pages/about/AboutPage.tsx`) — Team bio, background, citation generator.
- **Rule**: These routes are fully preserved and independently navigable.

### 5. Main Landing Internal Section Sequence
- **Sequence**:
  1. `Prologue` (#prologue)
  2. `Scale` (#scale)
  3. `Record` (#record)
  4. `Gap` (#gap)
  5. `Answers` (#answers)
  6. `Cases` (#cases)
  7. `Remains` (#remains)

### 6. Section ID and Component Mapping
| Section ID | Component | File Path |
|---|---|---|
| `prologue` | `ChapterPrologue` | `src/widgets/prologue-scene/ChapterPrologue.tsx` |
| `scale` | `ChapterScale` | `src/widgets/scale-scene/ChapterScale.tsx` |
| `record` | `ChapterRecord` | `src/widgets/evidence-chain-scene/ChapterRecord.tsx` |
| `gap` | `ChapterGap` | `src/widgets/gap-scene/ChapterGap.tsx` |
| `answers` | `ChapterAnswersAtlas` | `src/widgets/atlas-scene/ChapterAnswersAtlas.tsx` |
| `cases` | `ChapterCases` | `src/widgets/case-sequence/ChapterCases.tsx` |
| `remains` | `ChapterRemains` | `src/widgets/remains-scene/ChapterRemains.tsx` |

### 7. Section Height Specifications
- **Height Standard**: All 7 sections implement `min-h-screen` and `py-20` to guarantee adequate editorial vertical breathing room and proper viewport snapping.

### 8. Sticky/Pinned Section & Scroll Tracking
- **Scroll Observer**: `StoryPage.tsx` uses an `IntersectionObserver` listening on `section[data-chapter-id]` with threshold `0.3` to update `currentChapterId` in `OverlayProvider`.
- **Progress Tracking**: `ProgressTracker` (`src/widgets/app-shell/ProgressTracker.tsx`) and `FooterRail` (`src/widgets/app-shell/FooterRail.tsx`) display the active chapter and track horizontal scroll position via sticky progress indicator (`sticky-bottom-progress`).

### 9. Current Evidence Line Implementation
- **Visual Role**: Primary narrative connector thread spanning chapters.
- **Code implementation**: Rendered via SVG paths with stroke dashoffset transitions and red accent colors (`var(--color-behavior-red-deep)`).

### 10. Current Atlas Implementation
- **Component**: `ChapterAnswersAtlas` (`src/widgets/atlas-scene/ChapterAnswersAtlas.tsx`)
- **Logic**: Interactive SVG coordinate space rendering 8 agency avoidance behaviors (A1~A8) with node filtering, behavior quick-filters, and drawer triggers (`openEvidenceDrawer`).

### 11. Current Drawer/Modal Structure
- **Provider**: `OverlayProvider` (`src/app/providers/OverlayProvider.tsx`)
- **Container**: `GlobalOverlayRoot` (`src/widgets/overlay-root/GlobalOverlayRoot.tsx`)
- **Drawer**: `EvidenceDrawer` (`src/widgets/evidence-drawer/EvidenceDrawer.tsx`)
- **Rule**: Single centralized overlay root handling evidence inspection, citation copy, and case detail modals.

### 12. Current Color, Typography, & Spacing Tokens
- **Tokens File**: `src/app/styles/tokens.css` & `src/app/styles/layout.css`
- **Theme**: Artistic Flair (`--color-paper: #f2f0ea`, `--color-ink: #0a0a0a`, `--color-behavior-red-deep: #8b342f`).
- **Typography**: Serif italic display headlines paired with mono metadata/captions.

### 13. Raw CSS Hardcoding Audit
- **Status**: Clean. Theme values use CSS variables (`var(--color-*)`, `var(--layout-*)`). No raw hex values in JSX.

### 14. Common Layout Containers
- **Primitives**: `.page-frame`, `.content-grid` (12-column), `.chapter-frame`, `.editorial-column`, `.full-bleed-stage`.

### 15. Mobile Breakpoint Strategy
- **Grid Breakdown**: Desktop (12 columns), Tablet (8 columns), Mobile (4 columns).
- **Mobile Drawers**: Drawer root converts to bottom sheet on screen widths `< 640px`.

### 16. Image & Asset Usage
- **Icons**: `lucide-react` icons throughout.
- **Visual Slots**: Designed image slots for Midjourney assets and document fragment previews.

### 17. Animation Library
- **Libraries**: `motion` (`motion/react`), CSS keyframe animations, native CSS transitions with cubic-bezier easing.

### 18. State Management
- **Global State**: `OverlayProvider` (React Context) managing active view, current chapter ID, overlay drawer states, presentation mode, and reduced motion settings.
- **Mock Data**: `STORY_CHAPTERS`, `EVIDENCE_CHAIN_DATA`, `ATLAS_TOPICS`, `CASE_STUDIES` in `src/shared/mock/storyData.ts`.

### 19. Technical Debt & Risks During Refactoring
- **SVG Coordinate Scaling**: Atlas SVG node positions must maintain relative scaling across ultra-wide and mobile devices.
- **Section Contrast Shifts**: Transitioning `ChapterGap` into a black inverse chapter requires careful text contrast management for nested elements.
- **Drawer Overlay Interlocking**: ESC key handlers and body scroll locking must remain active during overlay transitions.

---

## 3. Preservation & Refinement Directives
- **Preserve**:
  - All existing routes (`story`, `method`, `data`, `about`).
  - All 7 main landing section IDs and components.
  - Centralized `OverlayProvider` and `EvidenceDrawer` single-architecture.
  - Data mock structures in `storyData.ts`.
- **Refine**:
  - Section-by-section visual hierarchy and typography.
  - Black inverse chapter contrast in `ChapterGap`.
  - Evidence Line continuity across section boundaries.
