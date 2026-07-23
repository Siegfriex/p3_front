# Screenshot Index

All public-route screenshots were captured from production preview `http://127.0.0.1:4173` at 1440×1000 unless noted. Foundation was captured from development `http://127.0.0.1:3000`.

| File | Route/state | Finding |
|---|---|---|
| `screenshots/route_story.png` | `/` | Story preserved; real global navigation visible |
| `screenshots/route_method.png` | `/method` | Method direct route; FoundationGallery absent |
| `screenshots/route_data.png` | `/data` | Data direct route |
| `screenshots/route_about.png` | `/about` | About direct route |
| `screenshots/route_404.png` | `/not-a-route` | application 404 |
| `screenshots/route_evidence_direct.png` | `/evidence/ev-101` direct | complete full-page detail |
| `screenshots/route_evidence_drawer.png` | Story background + `/evidence/ev-101` | desktop modal Drawer, dimmed isolated background |
| `screenshots/route_evidence_mobile.png` | same, 375×812 | mobile full-width sheet and tab row |
| `screenshots/route_hash_scale.png` | `/#scale` reduced motion | `scaleTop=56`, active chapter SCALE |
| `screenshots/route_browser_back.png` | Drawer browser Back | Story restored, dialog closed, scroll lock cleared |
| `screenshots/foundation_dev.png` | dev `/dev/foundations` | gallery available only in development |

Production `/dev/foundations` was inspected separately and returned `notFound=true`, `foundations=false`.
