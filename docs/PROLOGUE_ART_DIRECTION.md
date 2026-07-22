# Chapter 1: Prologue — Art Direction & Layout Blueprint

## Gate Status
**PROLOGUE_ART_DIRECTION_LOCKED**

---

## 1. Editorial Vision & Purpose
The Prologue is the gateway chapter of **P3_CULTURE**. Its sole mission is to establish the core journalistic tension within 10 seconds:

> **“검토하겠습니다”**  
> *6년 뒤, 국정감사엔 무엇이 남았는가*

### Editorial Discipline:
- **High-Impact Simplicity**: No KPI cards, multi-button toolbars, filter chips, or raw data tables in the hero scene.
- **Hierarchical Clarity**: The primary question dominates visually; secondary explanatory text and source citations sit below in lower optical density.
- **Living Narrative Vector**: The Evidence Band/Line is introduced not as a decorative divider, but as the living red thread (`#8b342f`) that cuts into the headline text and carries the reader into Chapter 2 (Scale).

---

## 2. Desktop Grid Layout (12-Column Magazine Grid)

```
[COL 1]   [COL 2]   [COL 3]   [COL 4]   [COL 5]   [COL 6]   [COL 7]   [COL 8]   [COL 9]   [COL 10]  [COL 11]  [COL 12]
|--META--|  ||                                                                               ||  |--HERO IMAGE SLOT--|
            ||                       “검토하겠습니다”                                         ||     (3:4 Crop)
            ||                                                                               ||  
            ||                 6년 뒤, 국정감사엔 무엇이 남았는가                            ||  
            ||                                                         |--SUPPORTING BODY---|
         EVIDENCE
           BAND
```

### Column Assignments:
- **Chapter Metadata & Index**: Columns 1–2 (Micro mono typography: `CHAPTER 00 / PROLOGUE`).
- **Main Headline ("검토하겠습니다")**: Columns 2–10 (Serif Display XL, overlapping grid guidelines).
- **Secondary Title ("6년 뒤, 국정감사엔 무엇이 남았나")**: Columns 2–9 (Serif Display L).
- **Supporting Paragraph**: Columns 7–10 (Sans-serif body, offset to right for asymmetric balance).
- **Hero Image Slot (`prologue-hero-identity`)**: Columns 9–12 (Archival document fragment, low-saturation crop).
- **Evidence Band / Line**: Positioned along the left boundary of Column 2 (or gutter between Cols 1–2), dropping vertically.
- **Scroll Cue**: Columns 11–12 (Bottom right margin alignment).

---

## 3. Mobile Grid Layout (4-Column Layout)

```
[COL 1]       [COL 2]       [COL 3]       [COL 4]
|----CHAPTER METADATA & INDEX (Cols 1-2)---|
|=================================================|
|| (EVIDENCE LINE AT COL 1 GUTTER)
||  “검토하겠습니다” (Cols 1-4, Display XL)
||  6년 뒤, 국정감사엔 무엇이 남았는가 (Cols 1-4)
||
||  |--- HERO IMAGE SLOT (Cols 1-4 Inline) ---|
||
||  |--- SUPPORTING TEXT (Cols 2-4) --------|
||
|=================================================|
                             [SCROLL CUE - COL 4]
```

### Mobile Breakdown:
- **Metadata**: Columns 1–2.
- **Headline**: Columns 1–4 (`word-break: keep-all` to prevent orphan single Korean characters).
- **Evidence Line**: Anchored to Column 1 left gutter as a 2px red accent guide.
- **Image Slot**: Rendered inline below the secondary headline across Columns 1–4.
- **Supporting Body**: Columns 2–4.
- **Scroll Cue**: Bottom-right aligned across Column 4.

---

## 4. Typography Scale & Token Specifications

| Role | CSS Token | Size Calculation | Font Family | Character Rules |
|---|---|---|---|---|
| **Hero Quote Headline** | `--type-hero-quote` | `clamp(3.5rem, 8.2vw, 8.5rem)` | `Noto Serif KR` (Serif) | `tracking-tight`, `leading-[1.05]`, `word-break: keep-all` |
| **Hero Conclusion** | `--type-hero-conclusion` | `clamp(2.25rem, 5.2vw, 5.5rem)` | `Noto Serif KR` (Serif) | `font-normal`, `tracking-tight`, `text-[var(--color-neutral-700)]` |
| **Supporting Paragraph** | `--type-body-l` | `clamp(1.0625rem, 1.25vw, 1.25rem)` | `Pretendard Variable` (Sans) | `leading-relaxed`, max-width `38ch` |
| **Chapter Eyebrow / Meta** | `--type-meta-micro` | `clamp(0.625rem, 0.7vw, 0.75rem)` | `Monospace` | `uppercase`, `tracking-[0.2em]`, `text-[var(--color-neutral-700)]` |
| **Source / Caption** | `--type-caption` | `0.8125rem` | `Monospace` | `text-[var(--color-neutral-500)]` |

---

## 5. Evidence Band & Line Geometry Specification

### 1. Visual Forms:
1. **Band Form (Entry)**: Width `16px`, Color `#8b342f`, Opacity `0.85`. Enters from top of viewport, cutting into Column 2 gutter.
2. **Hairline Form (Revealed Question)**: Width `2.5px`, Color `#8b342f`, Opacity `1.0`. Contracts dynamically as headline is revealed.
3. **Handoff Elbow (Exit to Scale)**: Curves smoothly at bottom of viewport (`M col2_x, h-80 C col2_x, h-20, col6_x, h-10, col6_x, h`) to deliver entry coordinates `(X: Col 6, Y: Section Bottom)` for Chapter 2 (Scale).

### 2. Technical Implementation Model:
- Rendered using a localized SVG container (`<svg className="absolute inset-0 pointer-events-none">`) inside `ChapterPrologue`.
- Coordinates are calculated relative to percentage width of the 12-column grid (`calc(100% / 12 * 2)`), ensuring seamless responsive scaling without global fixed pixel offsets.

---

## 6. Global Header Integration
- **Header Theme**: Over-paper (`bg-[var(--color-paper)]/90 backdrop-blur-md border-b border-[var(--color-neutral-200)]`).
- **Layering & Z-Index**:
  - `HeaderNav`: `z-[var(--z-navigation)]` (`z-40`).
  - `Evidence Band`: `z-10` (passes underneath the header clean blur backdrop).
- **Interactions**:
  - Presentation Mode toggle remains active in `HeaderNav`.
  - Active view state stays set to `story`.

---

## 7. Reduced Motion Fallback Plan
When `isReducedMotion` is `true`:
1. Evidence Band renders immediately as a static 2.5px hairline (`#8b342f`).
2. Headline, supporting text, and metadata render at `opacity: 1` instantly without staggered delay.
3. Scroll cue animation (`animate-bounce`) is disabled; static chevron icon is shown.
4. Scale handoff elbow curve is rendered statically at full opacity.
