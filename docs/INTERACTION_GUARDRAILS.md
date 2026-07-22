# Interaction & Light/Dark Rhythm Guardrails — P3_CULTURE

## Gate Status
**PRE_IMPLEMENTATION_SSOT_PASS**

---

## 1. Interaction Rules & Repealed Decisions

### Discarded / Repealed Interaction Mechanics:
- ❌ **Mandatory Scroll Snap / Horizontal Scroll Snap**: Repealed. Standard native vertical scrolling is enforced for optimal user control and accessibility.
- ❌ **Wheel Hijacking**: Strictly forbidden. Mouse wheel scrolling behavior must follow native browser defaults.
- ❌ **Decorative Particle Animations**: Removed. Decorative floating particles or background canvas noise animations are prohibited to avoid visual clutter and performance overhead.
- ❌ **Cross-Chapter Global Hover Synchronization**: Repealed. Hover states remain localized within individual component/scene viewports to prevent unintended global UI flickering.
- ❌ **Persistent Cross-Chapter Global Interaction States**: Removed. Complex persistent hover/focus states across separate sections are replaced by focused, local state handlers.

### Enforced Interaction Architecture:
- ✅ **Native Vertical Scroll**: The main landing page is a standard vertical scroll document.
- ✅ **IntersectionObserver for Chapter Detection**: Used strictly to track the active section ID (`prologue`, `scale`, `record`, `gap`, `answers`, `cases`, `remains`) and update active chapter context in `OverlayProvider` and `FooterRail`.
- ✅ **Motion/React Scope**: Used exclusively for scene entrance/exit transitions, path drawing of the Evidence Line, and drawer slide-ins.

---

## 2. Light / Dark Scene Contrast Rhythm

To prevent visual fatigue and establish deliberate narrative pacing, the light/dark contrast rhythm across chapters is locked as follows:

| Chapter | Scene / Component | Light/Dark Theme | Visual Characteristics |
|---|---|---|---|
| **Prologue** | `ChapterPrologue` | **Paper / Light** | Clean warm paper background (`#f2f0ea`), dark typography, single red line entry. |
| **Scale** | `ChapterScale` | **Paper / Light** | Light background with 12-column hairline grid rules and dark statistic numerals. |
| **Record** | `ChapterRecord` | **Paper / Light** (Partial Dark Insert) | Light section canvas with embedded dark document fragment inserts for step callouts. |
| **Gap** | `ChapterGap` | **Full Black Inverse** | Full-bleed dark inverse canvas (`#0a0a0a`) with vivid red evidence line (`#ff3333`) for high dramatic tension. |
| **Answers** | `ChapterAnswersAtlas` | **Paper / Light Chapter + Black Atlas Field** | Light paper section wrapper with an embedded dark canvas field specifically for the interactive Atlas SVG matrix. |
| **Cases** | `ChapterCases` | **Paper / Light** | Light background featuring asymmetric 2-column editorial dossier cards. |
| **Remains** | `ChapterRemains` | **Light -> Dark Residue Transition** | Starts on light paper canvas, with branching Evidence Lines dissolving into a dark footer rail. |

### Key Rule on Consecutive Dark Chapters:
- **Gap** and **Answers** must **NOT** be consecutive full-black chapters.
- While `Gap` is a full black inverse chapter, `Answers` uses a light paper chapter container hosting a localized black SVG Atlas field container inside it.
