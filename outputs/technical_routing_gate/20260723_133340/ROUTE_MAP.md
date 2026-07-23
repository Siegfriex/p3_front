# Route Map

| URL | Component | Direct entry | Story background overlay | Invalid ID |
|---|---|---:|---:|---|
| `/` | `StoryPage` | Yes | n/a | n/a |
| `/method` | `MethodPage` | Yes | n/a | n/a |
| `/data` | `DataPage` | Yes | n/a | n/a |
| `/about` | `AboutPage` | Yes | n/a | n/a |
| `/evidence/:evidenceId` | `DetailPage` / `EvidenceRouteOverlay` | Full page | Drawer | Explicit detail not found |
| `/case/:caseId` | `DetailPage` / `EvidenceRouteOverlay` | Full page | Drawer | Explicit detail not found |
| `/dev/foundations` | `FoundationsPage` | Development only | n/a | Production application 404 |
| `*` | `NotFoundPage` | Yes | n/a | Application 404 |

## Entry chain

`index.html → main.tsx → BrowserRouter → App → AppProviders → AppRouter → AppShell → Outlet`

## Story hashes

`/#prologue`, `/#scale`, `/#record`, `/#gap`, `/#answers`, `/#cases`, `/#remains`

`ChapterHashController` scrolls after render, respects reduced motion, and relies on `scroll-margin-top: var(--header-height)`. Observer updates the active UI state without replacing the URL or creating history entries. Explicit chapter actions use `navigate({ pathname: '/', hash })`, so browser Back restores prior hash state.
