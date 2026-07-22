# Chapter 1: Prologue — Four Scene States Specification

## Gate Status
**PROLOGUE_ART_DIRECTION_LOCKED**

---

## 1. Overview of Scene States
`ChapterPrologue` executes a 4-state narrative entrance sequence driven by scroll viewport intersection and motion transitions:

- **STATE P0 — ENTRY**: Empty canvas, chapter metadata, Evidence Band ready above viewport.
- **STATE P1 — EVIDENCE ENTRY**: Thick red band drops vertically, cutting Column 2 gutter.
- **STATE P2 — QUESTION REVEAL**: Band contracts into hairline, main quote and secondary title reveal, image slot appears.
- **STATE P3 — HANDOFF TO SCALE**: Line curves at section bottom to form handoff coordinates into Chapter 2 (Scale).

---

## 2. State Specification Matrix

### STATE P0 — ENTRY
- **Trigger**: Initial section mount or top of viewport scroll (`intersectionRatio < 0.1`).
- **Visual Presentation**:
  - Background: Clean paper canvas (`#f2f0ea`).
  - Top Metadata: Micro mono chapter tag (`CHAPTER 00 / PROLOGUE`) fades in at `opacity: 1`.
  - Headline: Hidden (`opacity: 0`, `translateY(16px)`).
  - Evidence Band: Positioned above top viewport (`translateY(-100%)`).
  - Hero Image Slot: Hidden (`opacity: 0`).
- **Interaction**: Scroll cue indicator visible at bottom right.

---

### STATE P1 — EVIDENCE ENTRY
- **Trigger**: Scroll intersection reaches `0.15` or timer sequence onset.
- **Visual Presentation**:
  - Evidence Band (`width: 16px`, `#8b342f`) drops vertically down Column 2 boundary.
  - Band visually intersects the top margin of the headline area, creating an intentional paper-cut grid collision.
  - Metadata remains fixed at top.
- **Motion Parameters**:
  - Duration: `550ms` (`var(--motion-duration-morph)`).
  - Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (`var(--motion-ease-editorial)`).

---

### STATE P2 — QUESTION REVEAL
- **Trigger**: Scroll intersection reaches `0.35`.
- **Visual Presentation**:
  - Evidence Band contracts from `16px` width down to a fine `2.5px` hairline.
  - Main Display Headline (“검토하겠습니다”) reveals with high serif contrast.
  - Secondary Title (“6년 뒤, 국정감사엔 무엇이 남았는가”) reveals below main quote.
  - Supporting paragraph (`col-span-4`) and primary source caption (`[2018–2023] 시정요구 2,842건 전체 이행 궤적 추적`) fade in.
  - Hero Image Slot (`prologue-hero-identity`) becomes visible at low saturation (`filter: grayscale(80%) opacity(0.6)`).
- **Motion Parameters**:
  - Staggered delay: `100ms` between headline, subtitle, and body paragraph.
  - Stagger duration: `800ms` total.

---

### STATE P3 — HANDOFF TO SCALE
- **Trigger**: Scroll intersection reaches `0.75` (bottom of Prologue section approaching Chapter 2: Scale).
- **Visual Presentation**:
  - Main headline opacity reduces slightly (`opacity: 0.75`) to shift focus downwards.
  - The 2.5px red Evidence Line forms an elbow curve at the bottom of the Prologue viewport (`Y: 100%`), terminating at Column 6 center.
  - Terminal coordinates `(X: 50%, Y: 100%)` serve as the anchor point where Chapter 2 (Scale)'s baseline timeline rail attaches.
- **Scroll Behavior**:
  - Unhijacked native vertical scroll allows seamless transition to `#scale` section without abrupt snap locks.

---

## 3. Motion & Transition Parameter Summary

```typescript
// Motion token bindings for Prologue states
export const PROLOGUE_MOTION_SPEC = {
  bandEntry: {
    duration: 0.55,
    ease: [0.16, 1, 0.3, 1],
  },
  bandContract: {
    duration: 0.4,
    ease: [0.16, 1, 0.3, 1],
  },
  textRevealStagger: {
    staggerChildren: 0.12,
    delayChildren: 0.15,
  },
  handoffElbow: {
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1],
  },
};
```
