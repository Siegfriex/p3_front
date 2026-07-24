# Prologue CTA and first-page UX detail plan

Date: 2026-07-24 KST
Route: `http://localhost:3001/`

## 1. Overall visual verdict

**PARTIAL PASS**

The editorial identity is strong and the CTA technically works, but the first-page handoff does not communicate its action clearly. The largest risks are the hidden transition CTA, focus remaining in the previous chapter, excessive whitespace at the hash destination, and the decorative evidence line crossing readable text.

## 2. Screenshot inventory

| State | Viewport | Screenshot | Verdict |
|---|---:|---|---|
| First fold | 1440×1000 | `prologue-first-fold-1440.png` | Partial |
| Full Prologue | 1440 | `prologue-full-section-1440.png` | Partial |
| CTA annotated | 1440×1000 | `prologue-scroll-cta-annotated-1440.png` | Partial |
| After CTA | 1440×1000 | `after-prologue-cta-1440.png` | Functional |
| First fold | 390×844 | `prologue-first-fold-390.png` | Partial |
| CTA annotated | 390×844 | `prologue-scroll-cta-annotated-390.png` | Partial |
| After CTA | 390×844 | `after-prologue-cta-390.png` | Functional |

## 3. What the current CTA does

Selector: `#prologue > div.page-frame > div > footer > button`

- Component handler: `navigate({ pathname: '/', hash: '#scale' })`.
- Hash controller: resolves `scale` and calls `scrollIntoView`.
- Desktop observed: URL `/` → `/#scale`; scrollY `687` → `1252`; `#scale` top `128px`.
- Mobile observed: URL `/` → `/#scale`; scrollY `933` → `1393`; `#scale` top `128px`.
- Click target: `250.86×54px`, passing the recommended 44×44px target.
- The click is not obstructed. `elementFromPoint` resolves to the button or its child SVG.
- Defect: focus remains on the Prologue button after the viewport moves.

## 4. WCAG and interaction audit

| Item | Current evidence | Verdict | Required change |
|---|---|---|---|
| Text contrast | neutral-500 on paper `5.14:1` | WCAG AA pass | Preserve ≥4.5:1 |
| Red icon contrast | red-deep on paper `7.03:1` | Pass | Preserve ≥3:1 non-text |
| Touch target | `250.86×54px` | Pass | Keep ≥44×44px |
| Focus contrast | computed gray outline `5.14:1` | Pass but token mismatch | Apply explicit `--color-focus` and 3px visible ring |
| Focus destination | focus stays on old button | Fail | Focus Chapter 01 heading/section after navigation |
| Link semantics | same-document destination implemented as button | Weak | Use anchor/React Router Link to `/#scale` |
| Motion | infinite bouncing chevron | Risk | Replace with one-time or hover motion; respect reduced motion |
| Action label | “스크롤하여 … 추적하십시오” | Ambiguous | Name destination and action |
| Automated Axe | zero critical/serious on key routes | Pass | Add focused keyboard/hash tests; Axe alone is insufficient |

## 5. Visual hierarchy defects

| Problem | User impact | Priority |
|---|---|---:|
| Transition CTA is below the initial desktop and mobile fold | Reader does not know how to begin the article | P0 |
| Mobile orders the large identity image before the explanatory copy and CTA | Decorative identity displaces the editorial premise | P0 |
| Decorative red evidence line crosses headline/body glyphs | Reduces legibility and resembles an edit/strike mark | P0 |
| CTA is transparent 12px gray text | Looks like a caption rather than a control | P0 |
| Hash lands on ChapterFrame padding, leaving blank space before the next heading | Makes a successful click feel inactive | P0 |
| Large low-resolution ministry identity block dominates the right column | Weakens evidence-led credibility | P1 |
| English/internal release metadata competes with story copy | Increases cognitive load before the thesis is understood | P1 |
| Fixed bottom rail occupies 44px without reserving a global safe area | Can cover final content or controls on short screens | P1 |

## 6. Recommended interaction

Replace the ambiguous footer-only control with a visible article-start action in the main action row:

```text
[첫 승인 증거 보기]  [기사 시작하기 →]
                      CHAPTER 01 · 요구한 것 중 얼마나 조치됐나
```

The footer can retain the evidence-line handoff as a non-interactive transition marker. If it remains interactive, use the same destination label rather than “scroll하십시오”.

Navigation contract:

1. Activate `기사 시작하기` by pointer, Enter, or Space.
2. URL becomes `/#scale`.
3. Reduced motion: immediate movement; otherwise 220–320ms smooth movement.
4. Land on the Chapter 01 heading, not the chapter's empty top padding.
5. Move programmatic focus to the heading (`tabIndex=-1`, `focus({preventScroll:true})`).
6. Visible chapter indicator and footer rail update to `SCALE`.
7. Browser Back returns to the Prologue action without losing reading context.

## 7. P0 implementation plan

| File | Change | Acceptance criterion |
|---|---|---|
| `ChapterPrologue.tsx` | Change the same-document button to a semantic `Link`/anchor; label it `기사 시작하기` with Chapter 01 title | Destination is understandable without the aria-label |
| `ChapterPrologue.tsx` | Place the start CTA beside the evidence CTA in the main content area | Visible in the desktop first fold; appears before the identity image on mobile |
| `ChapterPrologue.tsx` | Remove infinite bounce; use hover/one-time motion only | No perpetual motion; reduced-motion has zero displacement |
| `ChapterHashController.tsx` | Scroll and focus the destination heading/section | Focus and viewport both move to Chapter 01 |
| `ChapterFrame.tsx` | Provide a stable focus target and accessible heading association | Hash target has a named destination |
| `story-editorial.css` | Reorder mobile content: headline → lede → CTA → identity/source image | Thesis and action appear before decoration at 390px |
| `story-editorial.css` | Keep the evidence line in a dedicated gutter; never cross text bounding boxes | Zero line/glyph intersection at 320–1920px |
| `layout.css` | Reduce Prologue/target dead space and define `scroll-margin-top` | Chapter title begins directly below the sticky header |
| `layout.css` | Reserve `44px + env(safe-area-inset-bottom)` for FooterRail | No content or CTA occlusion |
| Story E2E | Add URL, scroll, focus, Back, 44px, reduced-motion tests | All assertions pass at 390 and 1440 |

## 8. P1 editorial polish

- Replace the pixelated ministry identity image with an official high-resolution asset or a meaningful source-PDF excerpt.
- Change core Korean metadata from 10px to at least 11–12px; keep release IDs in a secondary provenance disclosure.
- Correct source-period copy to `2020·2022·2024년 시정·처리결과 자료` rather than the ambiguous `2020~2024 전수`.
- Consider the grammatically clearer headline `국정감사는 단순한 쇼인가?` after editorial approval.
- Preserve warm off-white, near-black ink, and deep red. Do not add more accent colors.

## 9. QA matrix

- Viewports: 320×800, 390×844, 768×1024, 1440×1000, 1920×1080.
- Input: pointer, Enter, Space, Tab/Shift+Tab, browser Back/Forward.
- Preferences: `prefers-reduced-motion`, in-app motion reduction, forced colors, 200% zoom, text spacing override.
- Checks: Axe serious/critical 0; body text ≥4.5:1; non-text/focus ≥3:1; target ≥44×44; horizontal overflow 0.
- Visual assertions: primary thesis and start CTA before decoration; evidence line never intersects text; fixed rail never covers actionable content.

## 10. Definition of done

The handoff is complete only when a reader can answer, before clicking, **where the control goes and what they will read next**, and after clicking, both viewport and keyboard/screen-reader focus are visibly located in Chapter 01.
