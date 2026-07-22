# UX Blueprint — P3_CULTURE

## 1. Experience Statement
"문체위 국정감사 6년"은 2018년부터 2023년까지 국회 문화체육관광위원회 국정감사에서 제기된 시정요구(Demand), 질의(Question), 피감기관 답변(Answer), 그리고 정부의 공식 처리결과(Reported Outcome) 사이의 간극과 패턴을 저널리틱 관점에서 검증하고 탐색하는 Editorial Scrollytelling 스페셜입니다.

## 2. Audience Model
- **일반 관객**: 스크롤 기반의 저널리틱 에세이로 핵심 서사(Prologue -> Scale -> Gap -> Cases)를 직관적으로 파악.
- **데이터 저널리즘 & 연구 관객**: 8가지 답변 패턴(A1~A8) 및 Topic Atlas, 데이터 스키마(/data), 방법론(/method)을 심층 탐색.
- **의회/감사 관객**: Evidence Chain 및 Evidence Drawer를 통해 개별 시정요구서의 원문 및 회의 속기록, 저널리즘 검증 결과를 직접 대조.
- **모바일 관객**: 하단 시트(Bottom Sheet) 형태의 드로어와 세로 반응형 그리드로 320px~768px 환경에서 동일한 서사 경험.

## 3. Narrative Map & 8 Chapter Scenes
1. **Chapter 00: Prologue** — 질문은 남았다 (Evidence Line 서사 예고)
2. **Chapter 01: Scale** — 요구는 얼마나 쌓였나 (6년간 2,842건 데이터 누적)
3. **Chapter 02: Record** — 요구에서 결과까지 (Evidence Chain 5단계 연결)
4. **Chapter 03: Gap** — 완료와 진행의 경계 (공식 완료 표기 뒤에 가려진 실질 간극)
5. **Chapter 04: Answers** — 어떻게 답했나 (Topic Atlas & 8가지 답변 행태 A1~A8)
6. **Chapter 05: Cases** — 완료라고 쓰였지만 (5대 대표 심층 추적 사례)
7. **Chapter 06: Remains** — 끝나지 않은 문장 (결언 및 후속 검증 과제)
8. **Chapter 07: Method & Supplemental** — /method, /data, /about 보조 페이지

## 4. IA (Information Architecture - 6 Levels)
- **I0 작품 명제**: 문체위 국정감사 6년의 기록과 답변 행태 추적
- **I1 챕터 명제**: Chapter 00~06별 서사적 질문 및 결론
- **I2 데이터 장면**: Evidence Line, Metric Sentences, Status Lanes, SVG Topic Atlas
- **I3 상태·노드·지표**: A1~A8 답변 행태 노드, 4가지 처리상태(Solid, Dashed, Dotted, Break)
- **I4 대표 원문**: Evidence Drawer 내 시정요구 전문, 회의록 속기, 공식 처리답변, 저널리즘 검증
- **I5 전체 Provenance & 방법**: /method (방법론), /data (데이터 스키마), /about (팀 및 원칙)

## 5. Sitemap & Route Map
- `/` — 메인 스크롤리텔링 에세이 (Chapter 00~06 스크롤 & 해시 내비게이션 `#prologue`, `#scale`, `#record`, `#gap`, `#answers`, `#cases`, `#remains`)
- `/method` — 저널리즘 분석 방법론 및 출처 약관
- `/data` — 데이터 스키마 명세 및 Mock Fixtures 테이블
- `/about` — 프로젝트 정체성 및 저널리틱 윤리

## 6. User Flows
- **Reading Flow**: Header Navigation / Progress Tracker / J/K 키보드를 통해 챕터 간 자유로운 이동 및 스크롤 경험.
- **Atlas Exploration Flow**: Chapter 04 Answers에서 답변 유형 Quick Filter 및 노드 선택 -> Evidence Drawer 연동.
- **Evidence Verification Flow**: 노드 또는 케이스 클릭 -> 단일 전역 Evidence Drawer 오픈 -> 원문, 속기록, 검증, 출처 탭 확인 -> 인용문 복사.
