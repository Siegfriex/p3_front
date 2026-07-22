# AI Studio Context — 문체위 국정감사 6년

## 프로젝트 목적
2018–2023년 국회 문화체육관광위원회 국정감사에서 제기된 시정요구(Question/Demand), 피감기관 답변(Answer), 그리고 최종 정부 처리결과(Reported Outcome) 사이의 간극과 패턴을 저널리틱 에세이 형식(Editorial Scrollytelling)으로 시각화·탐색하는 프론트엔드 인터랙티브 스페셜.

## 절대 범위
- UI/UX 설계, 인터랙티브 에세이 화면, 반응형 레이아웃, 저널리즘 타포그래피, Evidence Line 및 Topic Atlas 프로토타입.
- 데이터 수집/파싱/DB/백엔드는 수행하지 않으며, 고정된 무결성 mock fixture(`src/shared/mock/storyData.ts`)로 동작.
- MOCK / PLACEHOLDER / DATA_PENDING 경계 유지.

## 현재 IA 및 챕터 구성
1. Chapter 00: Prologue (질문은 남았다)
2. Chapter 01: Scale (요구는 얼마나 쌓였나)
3. Chapter 02: Record (요구에서 결과까지 - Evidence Chain)
4. Chapter 03: Gap (완료와 진행의 경계)
5. Chapter 04: Answers (어떻게 답했나 - Topic Atlas & Behavior Nodes)
6. Chapter 05: Cases (완료라고 쓰였지만 - 5대 대표 사례)
7. Chapter 06: Remains (끝나지 않은 문장)
8. Chapter 07: Method & Supplemental (/method, /data, /about)

## 핵심 시각 오브젝트
- Evidence Line: 서사 관통 선 (solid/dashed/dotted/break/loop)
- Topic Atlas + Behavior Nodes: 답변 방식(A1~A8) 및 처리상태 분포
- Evidence Drawer: 단일 전역 오버레이 기반 원문/검증 증거 드로어

## 잠긴 결정
- 단일 전역 OverlayProvider/DrawerRoot 사용.
- 디자인 토큰 기반 (raw pixel/hex 사용 금지).
- 한국어 공공 저널리즘 톤앤매너 준수.
