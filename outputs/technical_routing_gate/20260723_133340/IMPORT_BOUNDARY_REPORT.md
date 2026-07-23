# Import Boundary Report

## Verdict

- `pages/widgets/shared → app`: 0 matches
- `shared → pages/widgets/app`: 0 matches
- Relative imports climbing three or more levels: 0 matches
- Former `OverlayProvider` consumers: 0 matches
- Detected circular import: none in the changed routing/provider/overlay graph

## Ownership

| Concern | Owner |
|---|---|
| URL and history | React Router |
| Evidence/Case modal state | Route and background location |
| Presentation/reduced motion | `shared/providers/PreferencesProvider` |
| Chapter hash contract | `shared/config/chapterNavigation` |
| Chapter observer | StoryPage/AppShell outlet state |
| Atlas and Gap filters | Widget-local state |

`ChapterHashController` and chapter IDs were moved out of app-level modules so StoryPage does not import upward into `app`.
