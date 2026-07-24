# Screenshot Index

All captures are current local DEV observations from `http://127.0.0.1:3032`. Atlas uses the ignored local DG761 release override. Story Atlas is DataUnavailable. Story `ev-101` evidence is an explicitly marked mock. These are baseline evidence, not production Visual QA.

| File | Route/state | Viewport | Classification |
|---|---|---:|---|
| `story_answers_unavailable_375x812.png` | `/#answers` DataUnavailable | 375×812 | CONFIRMED current state |
| `story_answers_unavailable_768x1024.png` | `/#answers` DataUnavailable | 768×1024 | CONFIRMED current state |
| `story_answers_unavailable_1440x1000.png` | `/#answers` DataUnavailable | 1440×1000 | CONFIRMED current state |
| `story_answers_unavailable_1920x1080.png` | `/#answers` DataUnavailable | 1920×1080 | CONFIRMED current state |
| `atlas_default_375x812.png` | `/atlas` default | 375×812 | LOCAL_ENV_DG761 |
| `atlas_default_768x1024.png` | `/atlas` default | 768×1024 | LOCAL_ENV_DG761 |
| `atlas_default_1440x1000.png` | `/atlas` default | 1440×1000 | LOCAL_ENV_DG761 |
| `atlas_default_1920x1080.png` | `/atlas` default | 1920×1080 | LOCAL_ENV_DG761 |
| `atlas_selected_valid_1440x1000.png` | `/atlas?node=<valid>` | 1440×1000 | LOCAL_ENV_DG761 |
| `atlas_empty_filter_1440x1000.png` | zero-result filter | 1440×1000 | LOCAL_ENV_DG761 |
| `atlas_invalid_node_1440x1000.png` | invalid node | 1440×1000 | LOCAL_ENV_DG761 |
| `evidence_direct_valid_release_id_1440x1000.png` | direct release-valid evidence ID | 1440×1000 | CONTRADICTED: DEV not found |
| `atlas_evidence_drawer_unavailable_1440x1000.png` | Atlas background evidence route | 1440×1000 | CONTRADICTED: generic invalid drawer |
| `atlas_evidence_drawer_unavailable_375x812.png` | Atlas background evidence route | 375×812 | CONTRADICTED: generic invalid sheet |
| `story_evidence_drawer_mock_1440x1000.png` | Story mock evidence drawer | 1440×1000 | MOCK PREVIEW |
| `story_evidence_drawer_mock_375x812.png` | Story mock evidence sheet | 375×812 | MOCK PREVIEW |
| `atlas_evidence_drawer_valid_release_id_1440x1000.png` | pre-navigation diagnostic attempt | 1440×1000 | EXCLUDED FROM ACCEPTANCE |
| `atlas_evidence_drawer_valid_release_id_375x812.png` | pre-navigation diagnostic attempt | 375×812 | EXCLUDED FROM ACCEPTANCE |

Post-implementation canonical names and required captures are defined in `SCREENSHOT_CAPTURE_PLAN.csv` and `VISUAL_REGRESSION_NAMING_CONTRACT.md`.
