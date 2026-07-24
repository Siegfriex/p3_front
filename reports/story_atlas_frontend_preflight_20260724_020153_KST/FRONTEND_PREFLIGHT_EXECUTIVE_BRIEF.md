# Frontend Story–Atlas Integration Preflight Executive Brief

## Executive verdict

프론트 사전점검 자체는 완료되어 Integration Director가 구현 프롬프트를 작성할 수 있는 수준이다. 로컬 DG761 Explorer 경로는 실제 데이터로 확인됐지만 Story, approved Evidence, release pointer, deployable Vercel 상태는 아직 closure 전 blocker다. 따라서 `FRONTEND_RELEASE_PREFLIGHT_READY`이며, Preview/Production 배포 승인은 아니다.

## Baseline

- Branch: `agent/frontend-routing-atlas-foundation-20260723`
- HEAD: `20835ecadcce0a57067231806c4cfde9dd5b8f41`
- Upstream: `origin/agent/frontend-routing-atlas-foundation-20260723`; ahead 0 / behind 0
- Dirty: true. source/config/test/public data에 광범위한 기존 변경이 있다.
- START→END source/public inventory delta: 없음. 이번 run은 reports와 표준 build/test artifact만 생성했다.

## F12 questions

1. DG761 env override: YES. `/atlas`에서 manifest 200, 5개 bundle 200, schema/SHA 통과, release/projection 표시, 140 ViewModel = 140 SVG = 140 DOM.
2. 기본 `/atlas`의 DataUnavailable 원인: clean/production build에 `VITE_ATLAS_RELEASE_ID`가 없고 pointer fallback도 없기 때문이다. 현재 로컬 ignored `.env`만 DG761을 주입한다.
3. pointer 추가 지점: `src/shared/api/atlas/loadAtlasManifest.ts`; pointer schema는 `atlasTransportSchema.ts`; BASE_URL-aware URL과 테스트도 함께 필요하다.
4. 최소 공유 loader 경계: framework-independent `atlasReleaseResource.ts` + thin `useAtlasRelease.ts`. 기존 manifest/bundle/schema/adapter를 합성하고 cache/dedupe/abort/state/repository를 한 경로로 제공한다.
5. ChapterAnswersAtlas 핵심 변경: `src/widgets/atlas-scene/ChapterAnswersAtlas.tsx`, shared resource/hook, `atlasNodeParity.ts` selector, transport/types의 approved preview metadata, Story tests.
6. AtlasScene 재사용: 가능. Scene/Controls/Legend/DomMirror primitive를 재사용하되 Full `AtlasExplorer`와 Inspector 전체를 Story에 복제하지 않는다.
7. Story Preview 최소 schema: manifest의 release_id/projection_id에 결속된 nonempty unique `story_preview_node_ids`; 감사 가능성을 위해 selection_version/selection_hash도 Data contract에서 확정 권고.
8. selector input: Explorer `AtlasNodeViewModel[]`, approved ID list, 그리고 Story/Explorer release ID 및 projection ID 쌍. 누락·중복·ID 부재·projection mismatch는 throw/fail-closed.
9. CTA filter carry: 현재 serializer로 status/types carry 가능하며 브라우저로 확인했다. node는 CTA에서 의도적으로 제거된다.
10. Evidence route end-to-end: NO. route shell/history는 있으나 repository가 adapter 내부에서 버려지고 direct/drawer가 approved detail을 소비하지 않는다.
11. 결함 기대값 고정 테스트: `tests/e2e/atlas-experience-design.spec.ts`의 `Story Answers fails closed, carries URL filters to Explorer, and restores with Back`; Story unavailable, node 0, CTA 이후 Atlas unavailable을 기대한다. Story DOM 0은 현재 explicit assertion이 없어 missing case다.
12. Vercel Preview 전 blocker: project link, tracked SPA config/runtime release, pointer policy, Story/Evidence wiring, legacy public release 제거, cache headers, env-scenario 테스트 격리, green QA.
13. 안전한 commit 경계: 현재 전체 dirty tree를 commit하지 않는다. clean clone/isolated staging에서 resolver/resource, Story, Evidence, runtime data/pointer, Vercel config를 별도 reviewed commit으로 나눈다.
14. Data Agent 필수 값: authoritative derived release ID, manifest file SHA-256, approved story_preview_node_ids, projection ID/hash, preview selection version/hash, Evidence detail/PDF public routing contract.

## QA interpretation

Typecheck, lint, two production builds passed. Unit is 45/46 with ambient DG env and 46/46 with explicit no-release. Default Playwright is 10 pass / 8 fail / 9 skip. Manual DG runtime and Axe on `/atlas` are good, but that does not make Story or Evidence real-data PASS.

## Final gate

`DG761_EXPLORER_RUNTIME_CONFIRMED=PASS`; resolver/shared-loader plans are ready; Story wiring is ready only after Data Agent selection metadata; Evidence and Vercel change plans are ready but current runtime/deployment remains blocked.
