# Content Guardrails & Single Source of Truth (SSOT) — P3_CULTURE

## Gate Status
**PRE_IMPLEMENTATION_SSOT_PASS**

---

## 1. Data Scope & Provenance Calibration
- **Data Status Marker**: `CONTENT_STATUS: DATA_PENDING`
- **Display Source**: `DISPLAY_SOURCE: MOCK_FIXTURE`
- **Timeframe Policy**:
  - The `2018–2023` timeframe and numerical metrics (e.g., 2,842 total requests, 82.4% reported completion) present in the mock fixtures (`src/shared/mock/storyData.ts`) serve as **editorial mock representations**.
  - They must **NOT** be treated as final verified empirical truths or real-time database outputs until formal ETL pipeline ingestion is established.
  - Existing mock strings must remain intact in code, but their source status is officially registered as `DISPLAY_SOURCE: MOCK_FIXTURE`.

---

## 2. A1–A8 Answer Behavior Terminology Standard
All 8 response categories (A1–A8) in the Topic Atlas must be referenced using standard editorial terms:
- **Approved Terms**: `answer behavior`, `response pattern`, `답변행태`, `응답유형`
- **Prohibited Terms**: `avoidance behavior` (or `회피 유형` when applied generically to all categories).

### Standard Taxonomy Breakdown:
- **A1–A4 (비직접·정보부재 계열)**: Non-direct / Absence of information patterns (e.g., 원론적 검토, 타기관 이송, 현황 설명 대치).
- **A5–A6 (유보·절차 계열)**: Deferred / Procedural delay patterns (e.g., 절차 진행 중, 유보/검토 중).
- **A7–A8 (조치·근거 계열)**: Action / Evidence-based patterns (e.g., 실질 이행 완료, 정량 수치 중심 답변, 자체 감사 진행).

---

## 3. Gap Analysis Terminology & Meaning Policy
To maintain objective journalistic accuracy and avoid sensationalism:

### Forbidden Expressions (Prohibited):
- `실제 결과` / `real-world outcome`
- `허위 완료`
- `완료 주장과 진실의 차이`

### Allowed Expressions (Approved):
- `보고된 처리상태`
- `추가 검증상태`
- `확인 가능한 근거`
- `근거 충분성`
- `보고상태와 검증상태의 간극`

---

## 4. Editorial Visual Metaphors & Labeling Rules
Borrow high-craft editorial design aesthetics from reference works without creating misleading false metadata or classified intelligence tropes:

### Prohibited UI Labels & Badges:
- `CONFIDENTIAL`
- `CLASSIFIED`
- `SECRET`
- `intelligence agency matrix`

### Approved Archival & Editorial Labels:
- `ARCHIVE`
- `SOURCE`
- `REPORTED`
- `REVIEWED`
- `VERIFIED`
- `EVIDENCE`
- `UNRESOLVED`
- `DOCUMENT ID`
- `PAGE`
