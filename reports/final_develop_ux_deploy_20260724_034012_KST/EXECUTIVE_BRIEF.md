# P3_CULTURE Final Develop, UX QA, and Production Closure

## Executive verdict

`P3_STORY_ATLAS_PRODUCTION_READY` — 승인된 Story-enabled DG761 release를 기사, 16-node Story Preview, 140-node Full Explorer, Evidence direct route/Drawer가 동일 runtime resource로 소비하며 Vercel Preview와 Production에서 검증됐다.

Production: https://p3-culture-atlas.vercel.app

별도 publication governance 상태는 `PUBLICATION_RIGHTS_REVIEW_REQUIRED`다. 사용자 제공 PDF에서 파생된 기사 사진 7개는 화면에서 `PDF SOURCE / RIGHTS REVIEW`로 표시하며, 기술 배포 PASS가 제3자 이미지의 재사용 권리 승인을 대신하지 않는다.

## Runtime authority

- release: `ATLAS_DG761_STORY_20260724_024000_KST_D9DB2264`
- projection: `PROJ_DG761_20260723_213011_KST_4665FDF3E5CF`
- pointer SHA-256: `245e3899bfae47e9ad720cebe69c4cc932e273d1d91025c0ad29e6ce39151776`
- manifest SHA-256: `fb91d21a4171f1600835744a89138f762cad448c9dad4d9ef0eec91c45bd0fdc`
- precedence: `VITE_ATLAS_RELEASE_ID` → `/data/current-release.json` → fail closed

## Delivered experience

- 기사 본문은 도핑 정책, SPC 안전사고, 이행 현황 1,566/830/736, 회피성 답변 1,408건의 편집 서사를 제공한다. 이 기사 원고 수치는 DG761 집계와 명시적으로 분리해 표시한다.
- DG761 탐색층은 761 decision groups, 769 behavior labels, 140 aggregate nodes, 24 topic bins, 64 approved Evidence를 제공한다.
- Story는 승인 metadata의 deterministic 16-node subset만 렌더하고, Full Explorer는 140 nodes 전체를 렌더한다.
- Story Cluster Navigator는 16-node preview가 속한 승인 KMeans topic bins만 설명하며 브라우저에서 좌표·집계·UMAP을 재계산하지 않는다.
- CTA는 status/types를 보존해 `/atlas`로 이동하고 Story selection은 전달하지 않는다.
- Evidence direct route와 route-driven Drawer는 같은 approved `EvidenceRepository` detail을 소비한다.
- 기사 사진 원본은 보존하고 배포용 WebP 파생본 7개만 사용했다. Vite lazy Story chunk에 inline해 Vercel connector의 binary/4MB 제약을 피했다.

## QA evidence

- typecheck PASS
- lint PASS, warnings 0
- unit PASS: 22 files / 61 tests
- production build PASS: 2,186 modules
- production-preview suite: 19 pass / 6 intentional mode skips
- Story/Atlas responsive and Axe: 375, 768, 1440, 1920 widths PASS
- Vercel Preview and Production: Story 16/16, Atlas 140/140, filtered Explorer 2/2, article images 7/7 decoded
- all direct routes 200, overflow 0, Axe critical/serious 0, console/page/request failures 0
- pointer `no-cache`, immutable release asset `max-age=31536000`, HTML `no-cache`
- remote manifest SHA-256 equals pointer declaration

## Deployment evidence

- Preview READY/PASS: `dpl_FzBwJuAybTT3uekrzoBcRk8MerJ8`
- Production READY/PASS: `dpl_BQ2KQ8Y1dHAxzpoeawmoKvNiddod`
- canonical alias: `https://p3-culture-atlas.vercel.app`
- Vercel runtime errors in the post-deploy hour: none
- final dist size: 3,382,744 bytes
- final dist inventory SHA-256: `ddb79eac9deb02373a98c43bf88a3c4081f194b4deb56426218dfe92c334191a`

## Git boundary

The live checkout is on `P3_FRONT_DEPLOY` at `aa6c391da3514957005da46f5fd41010157bbd75`, one commit ahead of `origin/P3_FRONT_DEPLOY`. The shared checkout remains dirty because concurrent Agent 4 reports/screenshots and uncommitted Story/Atlas source closure coexist; the final snapshot had 59 porcelain entries. This run did not stage, commit, or push those shared changes.

Production corresponds to the sealed `DIST_SHA256_FINAL.txt` artifact and passed remote QA. After that artifact was built, a concurrent process edited `ChapterAnswersAtlas`, its tests, label policy, and Prologue again; those later edits were not rebuilt or deployed. A future build must first reconcile the 16-node Story contract and freeze the exact source boundary. Post-deploy worktree drift does not alter the already verified immutable Production artifact.
