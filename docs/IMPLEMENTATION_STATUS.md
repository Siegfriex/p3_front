# Implementation Status — 구현 현황

## 시스템 토큰 및 기반 (CSS & Tokens)
- [x] tokens.css (color, type, space, layout, z-index, motion, viz)
- [x] reset.css & typography.css & layout.css & motion.css & globals.css
- [x] TypeScript Data Contracts (`src/shared/types/story.ts`)
- [x] Deterministic Mock Fixtures (`src/shared/mock/storyData.ts`)

## FSD-lite 레이어 구현
- [x] `app/`: Router, Providers (OverlayProvider), Main Entrypoint
- [x] `widgets/`: AppShell Header, Navigation Rail, Prologue, Scale, Record Chain, Gap, Answers Atlas, Cases, Remains, Evidence Drawer, Overlay Root
- [x] `pages/`: StoryPage (Full Scrollytelling), MethodPage, DataPage, AboutPage
- [x] `shared/ui/`: PageFrame, ContentGrid, ChapterFrame, EditorialColumn, Badge, LineSymbol, Tooltip

## 스크롤리텔링 & 접근성
- [x] IntersectionObserver 챕터 동기화
- [x] 키보드 단축키 지원 (J/K 챕터 이동, ESC 드로어 닫기)
- [x] Reduced Motion 토글
- [x] Presentation Mode (프레젠테이션/가독성 집중 모드)
