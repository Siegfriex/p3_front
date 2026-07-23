# Keyboard Interaction Specification

- Tab enters controls in visual order: status, answer types, legend, reset, map scroll region, selected summary/action, DOM navigator, method/provenance.
- The SVG itself is described as an image; synchronized DOM buttons own node focus.
- Exactly one filtered node button has `tabIndex=0`. Arrow keys choose the nearest node in the requested screen-space direction. Home/End select the first/last canonical node ID. Boundaries do not wrap.
- Enter and Space select the focused node and update `node=`. Focus remains on the same DOM button.
- Escape clears selection without clearing filters. In Evidence Drawer it closes the overlay first and returns focus to the invoking evidence action.
- Filter changes move focus only when the activated control remains mounted. If the active node is removed, focus goes to result count, then the first matched node on explicit navigator entry.
- Reset returns focus to reset and announces the restored count.
- Back/Forward restores controls and selection from URL. Do not force focus into an inspector on history navigation; announce restored state politely.
- Each node accessible name must be unique: `<topic or 주제 미지정>, <A#>, <behavior family>, <status>, <answer count>, <short node ID>`.
- Story Preview uses the same keys for its 16 filtered nodes. Its navigator may be visually compact but not semantically reduced.

Current live evidence confirmed ArrowRight spatial movement, Enter selection, Escape clear and focus return. Unique names are currently contradicted and must be fixed before Accessibility PASS.
