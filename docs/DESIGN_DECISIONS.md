# Design Decisions — 디자인 결정 기록

## 1. 팔레트 & 색상 체계 (Paper & Ink)
- 기본 바탕: `--color-paper` (`#f2f0ea`), 서피스: `--color-surface` (`#f8f8f5`)
- 텍스트/선: `--color-ink` (`#0a0a0a`), 은은한 보조: `--color-neutral-700` (`#4e4e4a`), 분리선: `--color-neutral-200` (`#d8d5cd`)
- 행태 분류(Behavior Family):
  - Red Family (`A1`, `A6`, `A8` - 검토 표명, 수용 불가, 자체 조사): `#8b342f` / `#d5968e`
  - Amber Family (`A2`, `A3`, `A4` - 법령/예산, 타기관 미루기, 현황 대치): `#9b6b25` / `#d8b273`
  - Blue Family (`A5`, `A7` - 추진 완료, 수치/실적 답변): `#2d6089` / `#86abc7`

## 2. 타이포그래피 (Editorial Journalism)
- 본문 및 UI: Pretendard Variable / sans-serif
- 헤드라인 및 저널리즘 에세이 강조: Noto Serif KR / serif
- 코드/ID/출처/페이지: Monospace (`ui-monospace`)
- Fluid type system via `clamp()` to support desktop, tablet, mobile seamlessly.

## 3. 레이아웃 & 그리드
- Desktop: 12 Columns, max canvas width 100rem, editorial max text width 45rem
- Tablet: 8 Columns
- Mobile: 4 Columns
- Magazine Whitespace & Column Priority: 서사적 호흡에 따라 변화하는 dynamic whitespace tokens (`--whitespace-ratio-expansive`, `wide`, `standard`, `compact`, `dense`), `.offset-left`/`.offset-right` 비대칭 여백, 12컬럼 위치를 유연하게 제어하는 `--layout-column-start`/`--layout-column-end` 토큰, 그리고 `FullBleedStage`와 `EditorialColumn` 간 레이아웃 위계와 비대칭 4~9번 컬럼 배치를 제어하는 precedence 토큰(`--stage-precedence`, `--editorial-precedence`, `--stage-grid-placement`, `--editorial-grid-placement`) 및 오버랩 유틸리티 적용
- 공통 Layout Primitives: `PageFrame`, `ContentGrid`, `ChapterFrame`, `EditorialColumn`, `FullBleedStage`

## 4. 오버레이 & 드로어 (Single Architecture)
- 앱 전체에 하나의 `OverlayProvider` 및 `DrawerRoot`를 두고, Evidence ID나 Case ID 선택 시 오버레이로 슬라이드인
- ESC 키, 백드롭 클릭, 포커스 트랩, reduced motion, ARIA live region 완벽 지원

## 5. Atlas 원칙
- Atlas 좌표는 고정 deterministic fixture로 관리하며 상태 변경 시 좌표 재계산/흔들림 없이 opacity/ring/dim만 연출
- 노드 클릭 시 Evidence Drawer로 직접 연동되어 원문 확인 가능
