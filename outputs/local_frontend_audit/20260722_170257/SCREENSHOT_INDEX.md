# Screenshot Index

Audit ID: `20260722_170257`

## Result

No application screenshot could be captured without violating the audit constraints.

| requested state | viewport | path | result | reason |
|---|---:|---|---|---|
| Prologue default | 1440x900 | — | NOT_VERIFIABLE | `npm run dev` failed before binding a port |
| Prologue mobile | 375x812 | — | NOT_VERIFIABLE | local `node_modules` absent; `@tailwindcss/vite` unresolved |
| Scale default | 1440x900 | — | NOT_VERIFIABLE | no runnable application |
| Prologue→Scale boundary | 1440x900 | — | NOT_VERIFIABLE | no runnable application |
| Gap / Answers | 1440x900 | — | NOT_VERIFIABLE | no runnable application |
| Evidence drawer open | 1440x900 | — | NOT_VERIFIABLE | no runnable application |
| Mobile drawer/menu | 375x812 | — | NOT_VERIFIABLE | no runnable application; mobile menu is also absent in source |

The installed `agent-browser` binary was detected (`0.27.0`), but there was no dev-server URL to open. No placeholder, reconstructed, or stale screenshot was presented as runtime evidence.
