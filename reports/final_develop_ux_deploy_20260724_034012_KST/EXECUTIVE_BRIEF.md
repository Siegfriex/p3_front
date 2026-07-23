# P3_CULTURE Final Develop, UX QA, and Deployment Closure

## Executive verdict

`P3_STORY_ATLAS_PRODUCTION_READY` — 승인된 Story-enabled DG761 release를 기본 pointer로 소비하는 기사·Story Preview·Full Explorer·Evidence runtime을 구현하고, Local Production → Vercel Preview → Vercel Production 순서로 검증했다.

Production: https://p3-culture-atlas.vercel.app

## Runtime authority

- release: `ATLAS_DG761_STORY_20260724_024000_KST_D9DB2264`
- projection: `PROJ_DG761_20260723_213011_KST_4665FDF3E5CF`
- pointer SHA-256: `245e3899bfae47e9ad720cebe69c4cc932e273d1d91025c0ad29e6ce39151776`
- manifest SHA-256: `fb91d21a4171f1600835744a89138f762cad448c9dad4d9ef0eec91c45bd0fdc`
- precedence: `VITE_ATLAS_RELEASE_ID` → `/data/current-release.json` → fail closed

## Delivered experience

- Prologue와 CHAPTER 01/02/03/05가 개발 fixture·unconditional DataUnavailable 대신 승인 `atlas-summary.json`과 `EvidenceRepository`를 소비한다.
- 기사 수치는 upstream summary의 761 decision groups, 769 behavior labels, 140 aggregate nodes, 24 topic bins, 64 approved Evidence와 status 31/17/713만 사용한다.
- Story Preview는 승인 metadata의 16 nodes를 사용하고 Full Explorer와 좌표·radius·release·projection을 공유한다.
- Story CTA는 status/types를 보존해 `/atlas`로 이동하며 Story selection은 넘기지 않는다.
- Evidence direct route와 route-driven Drawer가 같은 approved repository detail을 소비한다.
- 기간 표기는 canonical corpus 범위인 2020–2025로 정렬했다.

## QA evidence

- typecheck PASS
- lint PASS, warnings 0
- unit PASS: 20 files / 56 tests
- production build PASS
- production-preview suite: 19 pass / 6 intentional mode skips
- UX, responsive, Axe, methodology: 13 pass / 1 intentional mode skip
- routing and Atlas VID: 15 pass
- explicit contract fixture: 5 pass / 2 intentional mode skips
- Vercel Preview and Production: Story 16/16, Atlas 140/140, filtered Explorer 1/1, route 200, overflow 0 at 375/768/1440/1920, Axe critical/serious 0, console/page/request failures 0

## Deployment evidence

- Preview READY: `dpl_AL8SFbZ1nsMdfTLV2yQJYfZ1hyV9`
- Production READY: `dpl_5CKmLNV4ojieeo1xfLezorYcwig9`
- canonical alias: `p3-culture-atlas.vercel.app`
- pointer cache: `no-cache`
- immutable release cache: `public, max-age=31536000, immutable`
- HTML cache: `no-cache`
- Vercel runtime errors in the post-deploy window: none

## Git boundary

Branch `agent/frontend-routing-atlas-foundation-20260723` remains at `20835ecadcce0a57067231806c4cfde9dd5b8f41`, upstream ahead/behind `0/0`. The shared checkout remains broadly dirty (1,041 porcelain entries at final snapshot); no commit or push was performed. The deployed artifact is sealed by `DIST_SHA256.txt` rather than represented by a clean commit.

One failed Preview attempt, `dpl_ASyQsE8L3kRBRg1vnydXjBDBwHCn`, is retained as deployment evidence. It failed before serving traffic because source-build `npm ci` was applied to a prebuilt-only upload. The successful Preview and Production used the same `dist` plus static headers/rewrites metadata; tracked `vercel.json` was not changed by that deployment adaptation.
