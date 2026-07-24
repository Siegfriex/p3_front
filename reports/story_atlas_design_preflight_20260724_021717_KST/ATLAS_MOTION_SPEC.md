# Atlas Motion Specification

Motion communicates interaction, never data transformation.

- Hover glyph scale: maximum 1.06 over 150ms, transform origin at the node center. It must not change node coordinates or collision resolution.
- Focus and selection rings appear without travel. Opacity may transition up to 150ms.
- Filter changes cross-fade matched glyphs up to 220ms; coordinates, radius and plot domain stay fixed. No morph, force motion or random jitter.
- Inspector content may fade 150–220ms with no lateral movement required.
- Drawer enters over 300ms on desktop; Bottom Sheet uses equivalent restrained motion. Background does not parallax.
- URL Back/Forward does not replay decorative chapter motion.
- Existing Story Evidence Line entry motion remains a Story S1 device and must not be attached to Atlas S2 node positions.
- Loading progress is restrained and never resembles moving data points.

Reduced motion removes scale, translate, animated scrolling and nonessential progress animation. State changes remain immediate and fully understandable.
