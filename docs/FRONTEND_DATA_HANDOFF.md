# Frontend Data Handoff — P3_CULTURE

## 1. 개요 & UI Data Contract
본 프로젝트는 백엔드나 파이프라인 연동 없이 독립된 프론트엔드 에세이 프로토타입으로 제작되었습니다. 추후 실제 국정감사 파이프라인 데이터베이스 연동 시 본 명세서에 수록된 UI View Model 인터페이스(`src/shared/types/story.ts`)를 준수하여 데이터를 주입합니다.

## 2. Data Bundles & ViewModel Interface
### EvidenceItem (`src/shared/types/story.ts`)
```typescript
export interface EvidenceItem {
  id: string; // e.g. 'ev-01'
  auditYear: number; // e.g. 2018
  committee: string; // '국회 문화체육관광위원회'
  targetOrg: string; // '한국예술인복지재단'
  issue: string; // 시정요구 제목 및 주요 내용
  reportedStatus: 'complete' | 'active' | 'unresolved' | 'ambiguous';
  reportedStatusLabel: string; // '추진완료', '추진중', '처리불가'
  behaviorType: 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7' | 'A8';
  behaviorLabel: string;
  lineStyle: 'solid' | 'dashed' | 'dotted' | 'break' | 'loop';
  questioner: string;
  questionExcerpt: string;
  answerExcerpt: string;
  verificationLabel: string;
  verificationDetail: string;
  sourceLabel: string;
  sourcePage: string;
  atlasX?: number;
  atlasY?: number;
  weightRadius?: number;
}
```

## 3. Mock Fixture Replacement Map
- `src/shared/mock/storyData.ts`:
  - `STORY_METRICS` -> 실제 파이프라인 통계 API (`/api/v1/metrics`)
  - `MOCK_EVIDENCES` -> 시정요구 및 처리결과 인덱스 API (`/api/v1/evidences`)
  - `EDITORIAL_CASES` -> 심층 사례 API (`/api/v1/cases`)

## 4. No-Go Boundary (프론트엔드 금지 사항)
- 프론트엔드는 텍스트 임베딩, 차원 축소(t-SNE/UMAP), 자연어 감정 분석, 법적 상태 추론을 직접 수행하지 않습니다.
- 모든 좌표(Atlas X, Y) 및 답변 패턴 분류(A1~A8)는 백엔드 사전 파이프라인에서 확정된 값만 렌더링합니다.
