# Atlas Experience Design Development Report

## 1. Executive Intelligence Brief

1. `REDLINE PUBLIC RECORD`를 Story, Atlas shell, dev calibration의 단일 시각 방향으로 확정했다.
2. production Story의 8-node mock SVG를 제거하고 승인 데이터 부재를 editorial `DataUnavailable`로 표시한다.
3. `/atlas`는 fake node 없이 intro, metadata, locked controls, stage, inspector, legend, projection note를 제공한다.
4. Story의 `status/types`는 Agent 3 query contract를 통해 `/atlas` URL로 전달되고 Back으로 복원된다.
5. aggregate SVG는 family shape, A1–A8 inner mark, status stroke, red selection/focus를 사용한다.
6. SVG는 pointer presentation이며 DOM mirror가 keyboard interaction의 단일 owner다.
7. 375/768/1440/1920에서 Story·Atlas·Foundation horizontal overflow 0, blocking Axe 0이다.
8. production build에서 `/dev/foundations`는 404이며 fixture provenance는 노출되지 않는다.
9. Approved bundle과 approved EvidenceRepository가 없어 실제 node/Evidence tuning은 `BLOCKED`다.
10. 전체 판정은 `PARTIAL PASS`; release/cutover PASS는 선언하지 않는다.

## 2. Confirmed Baseline

- repository: `/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front`
- branch: `refactor/routing-technical-foundation`
- HEAD: `6f4835292abe9bc0cbbed81469b21c25c4e95777`
- worktree: 시작 전부터 dirty; baseline을 `git status --porcelain=v1 -uall`로 고정했다.
- Agent 3 boundary: `loadAtlasBundle`, `loadAtlasManifest`, `toAtlasViewModel`, `atlasQueryState`, `Atlas types` mtime 불변. `CONCURRENT_SOURCE_DRIFT_BLOCKED` 미발생.
- current route: `/#answers` Story Preview, lazy `/atlas`, `/evidence/:evidenceId`, dev-only `/dev/foundations`.
- data mode: approved frontend release 없음; production fail-closed.
- current Story state: production mock plot 제거, approved Story ViewModel 연결 전 DataUnavailable.
- reference: 로컬 `ref1.pdf`는 없었고 사용자 제공 `design/Untitled.png`를 사용했다.

## 3. Design Problems Confirmed

| 영역 | 시작 결함 | 처리 | 상태 |
|---|---|---|---|
| data trust | Story 8-node MOCK이 실제 분석처럼 보임 | production plot 제거 | `CONFIRMED_FIXED` |
| visual hierarchy | unavailable card만 존재 | record surface와 stage/inspector shell | `CONFIRMED_FIXED` |
| navigation | Story→Explorer CTA 부재 | filter-carry CTA | `CONFIRMED_FIXED` |
| interaction | SVG/DOM keyboard ownership 중복 위험 | DOM mirror 단일 owner | `CONFIRMED_FIXED` |
| responsive | 375 year filter가 page overflow 유발 | contained focusable scroller | `CONFIRMED_FIXED` |
| accessibility | CTA cascade, micro contrast, fixed rail | cascade layer/focus/contrast/rail repair | `CONFIRMED_FIXED` |
| Evidence trust | production Evidence가 MOCK source에 결합 | 임의 대체 금지; dev anatomy만 구현 | `P0 BLOCKED_AGENT3` |

## 4. Preserved Structure

- Story는 하방 문서 스크롤이 의도된 주 흐름이다. 가로 page scroll은 사용하지 않는다.
- 가로 탐색이 필요한 표·연도 필터만 명시적 `overflow-x:auto`, `role=region`, keyboard focus로 격리했다.
- `/atlas` lazy route, BrowserRouter, AppRouter, AppShell, background-location overlay를 유지했다.
- Agent 3 manifest/hash/size/row/schema/repository/adapter/ViewModel/query/scaler를 수정하지 않았다.
- Atlas node 좌표, projection domain, node aggregation, status/behavior inference를 변경하지 않았다.
- Canvas, Pixi, Three.js, WebGL, UMAP fit, collision, force, jitter를 추가하지 않았다.
- loading은 REDLINE 등록선과 text skeleton을 사용하는 presentation이며 legacy mock/skeleton 데이터를 참조하지 않는다.

## 5. Design System Changes

- palette: paper canvas/surface/muted, ink hierarchy, line hierarchy, signal red, archive ochre, inverse surface.
- master grid: mobile 4, tablet 8, desktop 12, wide 16 columns; outer margins 16/24/48/72px.
- typography: large sans signal, editorial serif headline, neutral sans body, mono provenance.
- surface: desktop flat 0–2px, hairline/strong rule 중심, shadow 제거; mobile sheet만 top 16px와 제한적 elevation.
- red usage: selection, focus, annotation, error, editorial emphasis만 담당한다.
- behavior: circle/diamond/square와 A1–A8 inner mark; status는 solid/long-dash/dot stroke.
- calibration: `FoundationGallery`에 `CONTRACT_FIXTURE / DEVELOPMENT ONLY` surface를 추가했다.

## 6. Story Preview Development

- `ChapterAnswersAtlas`는 `AtlasSectionHeader`, `AtlasMetadataRail`, `AtlasProjectionNote`, `AtlasDataUnavailable`를 공유한다.
- 승인 manifest/ViewModel 연결 전 node·좌표·수치가 없다.
- CTA `전체 답변행태 지도 보기`는 현재 `status/types`를 `/atlas`에 보존한다.
- Method/Data recovery link와 projection warning을 제공한다.
- Global Header Atlas entry는 Decision Log 승인 전 추가하지 않았다.

## 7. Full Explorer Shell Development

- `AtlasSectionHeader`: PUBLIC RECORD / QUESTION–ANSWER FIELD / EVIDENCE TRACE 계층을 설명한다.
- `AtlasMetadataRail`: renderer와 데이터 상태를 고정된 metadata rail로 제공한다.
- `AtlasUnavailableShell`: disabled controls, empty registration stage, selection inspector, collapsed legend를 제공한다.
- fake nodes/evidence/document image는 없다.
- invalid node는 전체 Atlas를 대체하지 않고 stage를 유지한 채 inspector에서 해제 동작을 제공한다.

## 8. Evidence Experience

- dev calibration에 `EvidenceHeader`, `EvidenceStatusPair`, `EvidenceChain`, `EvidenceQuote`, `EvidenceVerificationPanel`, `EvidenceProvenanceRail`을 props-only component로 구현했다.
- meeting/page/PDF/pipeline/review/publication 위계를 시각화했다.
- 실제 `/evidence/:evidenceId`는 approved EvidenceRepository가 연결되지 않아 production REDLINE 적용을 보류했다.
- 기존 MOCK detail을 승인 evidence처럼 재포장하지 않았다.

## 9. Responsive Results

| viewport | grid | Story overflow | Atlas overflow | Calibration overflow | composition |
|---:|---:|---:|---:|---:|---|
| 375×812 | 4 | 0 | 0 | 0 | vertical controls, stage-first, lower sheet |
| 768×1024 | 8 | 0 | 0 | 0 | wrapped controls, lower inspector rail |
| 1440×900 | 12 | 0 | 0 | 0 | 8-column stage + 4-column inspector |
| 1920×1080 | 16 | 0 | 0 | 0 | max-width retained, negative space preserved |

## 10. Accessibility Results

자동:

- Story/Atlas/Foundation 4 viewport Axe critical/serious: `0`
- contract fixture Axe critical/serious: `0`
- console error: `0`; page error: `0`; unexpected failed request: `0`

수동·interaction contract:

- DOM mirror Enter selection, Escape clear, URL update: `CONFIRMED`
- mirror effective target ≥44px: `CONFIRMED`
- SVG `role=img`, title, desc, visible summary: `CONFIRMED`
- focus outline: 2px `signal.red.dark`, 3px offset: `CONFIRMED`
- focus/hover stage highlight와 inspector preview sync: `CONFIRMED_BY_CODE_AND_FIXTURE`
- 200% zoom 및 실제 screen reader session: `NOT_VERIFIABLE`

## 11. Visual QA

- 최종 index: [VISUAL_QA_INDEX.md](VISUAL_QA_INDEX.md)
- raw measurements: [VISUAL_QA_RAW.json](VISUAL_QA_RAW.json)
- pre-change defect report: [VISUAL_DEFECT_BASELINE.md](VISUAL_DEFECT_BASELINE.md)
- desktop `/atlas`는 large A signal, 12-column metadata, 8:4 stage/inspector를 유지한다.
- mobile `/atlas`는 page horizontal overflow 없이 controls→stage→sheet→legend 순서를 유지한다.

## 12. Remaining Blockers

| blocker | severity | owner | required evidence |
|---|---|---|---|
| Approved frontend bundle 부재 | P0 | upstream/Agent 3 | approved manifest/body/hash/schema |
| Approved EvidenceRepository 미연결 | P0 | Agent 3 | publicVisibility 검증된 detail ViewModel |
| production Evidence MOCK 노출 | P0 | Agent 3 + product | fail-closed evidence route 또는 approved repository |
| Story shared ready ViewModel 미연결 | P1 | Agent 3 | Story/Explorer common VM state |
| typed ContractMismatch route mapping 부재 | P1 | Agent 3 | typed load failure classification |
| actual node density/performance | P1 | upstream + Agent 3/4 | approved node count, latency, overlap measurement |
| 200% zoom/assistive technology manual run | P2 | Agent 4 QA | manual session evidence |

## 13. ViewModel Change Requests

1. `AtlasLoadFailure.kind`를 `network | hash | byte_size | row_count | schema | version | contract_mismatch`처럼 UI-safe enum으로 제공해 Error와 ContractMismatch를 구분한다.
2. Story Preview가 Explorer와 동일한 approved `AtlasViewModelBundle` availability를 소비할 orchestration contract를 제공한다.
3. Evidence direct/overlay가 동일한 approved Evidence Detail ViewModel과 repository를 소비하도록 연결한다.
4. node tooltip/inspector용 optional label이 필요하면 transport raw column이 아니라 ViewModel field로 제공한다.
5. 좌표, radius, status, family, evidence visibility는 현재와 같이 upstream/adapter 소유를 유지한다.

## 14. Gate Decision

```text
REDLINE_PUBLIC_RECORD_DIRECTION_LOCKED
AGENT_4_DESIGN_VERTICAL_SLICE_COMPLETE
STORY_PREVIEW_FAIL_CLOSED_CONFIRMED
ATLAS_NO_DATA_EXPERIENCE_PASS
CONTRACT_FIXTURE_INTERACTION_PASS
RESPONSIVE_DESIGN_QA_PASS
ACCESSIBILITY_AUTOMATED_QA_PASS
APPROVED_DATA_VISUAL_TUNING_BLOCKED
EVIDENCE_PRODUCTION_EXPERIENCE_BLOCKED
RELEASE_CUTOVER_NOT_DECLARED
```

Overall verdict: `PARTIAL PASS`. Agent 4 범위의 디자인 vertical slice는 완료됐으나 실제 승인 데이터와 Evidence 계약이 없어 제품 release PASS가 아니다.
