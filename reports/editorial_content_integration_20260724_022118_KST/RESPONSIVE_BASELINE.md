# Responsive Baseline

Captured before content integration, dev server (`npm run dev`, port 3000), route `/`.

## Viewports
- 1440x900 (desktop)
- 1920x1080 (wide desktop)
- 768x1024 (tablet portrait)
- 375x812 (mobile)

## Notes
- Dev server renders ChapterScale/ChapterRecord/ChapterGap/ChapterCases unconditionally (import.meta.env.DEV branch), so "before" screenshots show current MOCK content, not the production StoryChapterUnavailable placeholder state.
- Screenshots stored in `screenshots/before/<viewport>.png`.
- Grid/breakpoint source of truth: `src/app/styles/layout.css` (not overwritten by this audit; referenced only).
