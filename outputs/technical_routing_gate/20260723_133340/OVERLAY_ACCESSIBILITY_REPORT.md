# Overlay Accessibility Report

Verdict: `OVERLAY_PORTAL_PASS`, `FOCUS_TRAP_PASS`, `FOCUS_RETURN_PASS`, `BODY_SCROLL_LOCK_PASS`.

| Contract | Static implementation | Runtime evidence |
|---|---|---|
| Single portal root | `#overlay-root`, `OverlayPortal` | Drawer is a sibling of isolated `#root` |
| Modal semantics | `role=dialog`, `aria-modal`, labelledby, describedby | Playwright assertion PASS |
| Initial focus | close-button ref | focused on open PASS |
| Focus trap | Tab/Shift+Tab loop | focus remains inside dialog PASS |
| Focus return | pre-open active element captured | opener focused after Back/Escape PASS |
| Escape | document key handler with cleanup | unit test PASS |
| Background isolation | root `inert` and `aria-hidden` | `aria-hidden=true` while open PASS |
| Scroll lock | html/body overflow lock and scrollbar compensation | unit/E2E PASS |
| Backdrop | closes only when event target is backdrop | implementation verified |
| Browser Back | route history pop | URL `/`, dialog false, overflow restored |
| Mobile | full-width bottom/full sheet and scrollable tab row | 375×812 scenario PASS |
| Reduced motion | shared preference and data attribute | reduced-motion hash/Axe execution PASS |
| Axe | critical/serious rules | zero across route-modal state |

The prior provider-owned overlay state was removed. EvidenceDrawer remains the content component; Dialog/Drawer own modal mechanics.
