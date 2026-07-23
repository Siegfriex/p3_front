# Responsive Layout Specification

The canonical SVG viewBox is 720×520 and the immutable projection domain is shared. CSS layout may scale or scroll the canvas; it may not recompute a Story-only domain or change node display coordinates.

At 375px, the content viewport is approximately 328px after gutters. Current runtime avoids body overflow and preserves a 720px scroll canvas, so 44px SVG targets remain 44px. The contract retains this only with a visible pan instruction and a synchronized list. The page footer must reserve space and may not cover CTA, inspector or announcements.

At 768px, controls and inspector stack. The 720px canvas is nearly contained in the 705px content width. Do not squeeze controls into an unreadable row.

At 1440px, Explorer uses a 2:1 scene/inspector split; Story uses a capped 72rem stage followed by a shallower summary. At 1920px, do not enlarge the Story plot to the full 120rem frame. Readability and coordinate legibility take precedence over filling space.

Breakpoint behavior is component-scoped. It must not redesign unrelated Story chapters. Visual QA records actual bounding boxes, body overflow, scroll region width and target sizes at all four viewports.
