# Chapter 1: Prologue — Hero Image Slot Specification

## Gate Status
**PROLOGUE_ART_DIRECTION_LOCKED**

---

## 1. Slot Overview & Metadata
- **Slot ID**: `prologue-hero-identity`
- **Role**: Hero Identity & Editorial Texture Accent
- **Asset Status**: `ASSET_PENDING` (Pending Midjourney asset generation/delivery)
- **Preferred Aspect Ratio**: `3:4` or `4:5`
- **Container Class**: `.editorial-image-slot.prologue-slot`

---

## 2. Desktop Behavior (12-Column Grid)
- **Grid Placement**: Columns 9–12 (`col-start-9 col-end-13`).
- **Vertical Placement**: Positioned in upper right quadrant, partially overlapping the horizontal baseline of the secondary title ("6년 뒤...").
- **Visual Styling**:
  - Border: 1px subtle hairline rule (`border-[var(--color-neutral-300)]`).
  - Blend & Tone: `filter: grayscale(80%) sepia(10%) contrast(1.1)`.
  - Opacity: `0.85` on default, fading to `1.0` on hover.
  - Border Radius: Sharp paper edge (`rounded-none` or `rounded-[2px]`).
  - Overlay Badge: Micro mono stamp badge at top left of image: `[ARCHIVE / DOC-01]`.

---

## 3. Mobile Behavior (4-Column Layout)
- **Grid Placement**: Columns 1–4 (`col-span-4`).
- **Positioning**: Rendered as an inline figure directly between the secondary headline and the supporting text paragraph.
- **Aspect Ratio**: Re-cropped to `16:9` or `3:2` banner format to minimize vertical layout strain on mobile viewports.
- **Fallback**: If screen height is constrained (`< 600px`), image slot auto-collapses cleanly without affecting text legibility.

---

## 4. CSS Placeholder & Fallback Implementation
While `ASSET_PENDING`, the slot renders a high-craft CSS paper fragment placeholder:

```html
<!-- Prologue Hero Image Slot Placeholder -->
<figure 
  className="editorial-image-slot prologue-slot relative overflow-hidden bg-[var(--color-neutral-100)] border border-[var(--color-neutral-200)] aspect-[3/4]"
  data-asset-status="ASSET_PENDING"
>
  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-paper)] to-[var(--color-neutral-200)] opacity-60" />
  <div className="absolute top-3 left-3 font-mono text-[10px] tracking-widest text-[var(--color-neutral-700)] uppercase border border-[var(--color-neutral-300)] px-1.5 py-0.5 bg-[var(--color-paper)]">
    ARCHIVE / DOC-01
  </div>
  <div className="absolute bottom-3 left-3 right-3 font-mono text-[10px] text-[var(--color-neutral-500)] leading-tight">
    [Midjourney Hero Asset Slot: National Assembly Audit Document 2018]
  </div>
</figure>
```
