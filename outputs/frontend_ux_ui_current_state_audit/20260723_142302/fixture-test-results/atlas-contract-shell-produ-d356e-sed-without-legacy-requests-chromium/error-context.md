# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: atlas-contract-shell.spec.ts >> production-style no-approved-manifest route fails closed without legacy requests
- Location: tests/e2e/atlas-contract-shell.spec.ts:98:1

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "Failed to load resource: the server responded with a status of 404 (Not Found)",
+ ]
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - link "메인 스토리로 이동" [ref=e7] [cursor=pointer]:
        - /url: /
        - generic [ref=e8]: "PROJECT: P3_CULTURE"
        - generic [ref=e11]: 문체위 국정감사 6년
      - navigation "주요 화면" [ref=e12]:
        - link "에세이 (Story)" [ref=e13] [cursor=pointer]:
          - /url: /
          - generic [ref=e14]: 에세이 (Story)
        - link "방법론 (Method)" [ref=e15] [cursor=pointer]:
          - /url: /method
          - img [ref=e16]
          - generic [ref=e19]: 방법론 (Method)
        - link "데이터 (Data)" [ref=e20] [cursor=pointer]:
          - /url: /data
          - img [ref=e21]
          - generic [ref=e25]: 데이터 (Data)
        - link "소개 (About)" [ref=e26] [cursor=pointer]:
          - /url: /about
          - img [ref=e27]
          - generic [ref=e29]: 소개 (About)
      - generic [ref=e30]:
        - button "발표모드" [ref=e31] [cursor=pointer]:
          - img [ref=e32]
          - generic [ref=e35]: 발표모드
        - button "모션절약" [ref=e36] [cursor=pointer]
  - main [ref=e37]:
    - paragraph [ref=e38]: ATLAS ROUTE LOADING
    - heading "답변행태 지도를 불러오고 있습니다" [level=1] [ref=e39]
  - contentinfo [ref=e40]:
    - generic [ref=e41]:
      - generic [ref=e42]: "PROJECT: P3_CULTURE"
      - generic [ref=e45]: 원론적/유보적 답변 (42%)
      - generic [ref=e48]: 공식 완결 (18%)
      - generic [ref=e51]: 진행/이관 (40%)
    - generic [ref=e52]:
      - generic [ref=e53]: "CHAPTER: PROLOGUE"
      - generic [ref=e54]: "|"
      - generic [ref=e55]: V1.0 EDITORIAL SCROLLYTELLING
```

# Test source

```ts
  1   | import AxeBuilder from '@axe-core/playwright';
  2   | import { expect, test, type Page, type Route } from '@playwright/test';
  3   | 
  4   | const HASH = 'b'.repeat(64);
  5   | const FIXTURE_ENABLED = process.env.ATLAS_CONTRACT_FIXTURE_E2E === 'true';
  6   | 
  7   | function collectRuntimeFailures(page: Page) {
  8   |   const consoleErrors: string[] = [];
  9   |   const pageErrors: string[] = [];
  10  |   const failedRequests: string[] = [];
  11  |   page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  12  |   page.on('pageerror', (error) => pageErrors.push(error.message));
  13  |   page.on('requestfailed', (request) => failedRequests.push(`${request.method()} ${request.url()} ${request.failure()?.errorText}`));
  14  |   return () => {
> 15  |     expect(consoleErrors).toEqual([]);
      |                           ^ Error: expect(received).toEqual(expected) // deep equality
  16  |     expect(pageErrors).toEqual([]);
  17  |     expect(failedRequests).toEqual([]);
  18  |   };
  19  | }
  20  | 
  21  | function fixtureManifest() {
  22  |   const files = [
  23  |     'atlas-summary',
  24  |     'atlas-nodes-all',
  25  |     'atlas-topic-bins',
  26  |     'atlas-centroids',
  27  |     'evidence-index',
  28  |     'projection-meta',
  29  |     'method-meta',
  30  |     'assets-manifest',
  31  |   ];
  32  |   return {
  33  |     manifest_version: '1.0',
  34  |     release_id: 'contract-release-001',
  35  |     app_contract_version: '1.0',
  36  |     data_version: 'contract-1',
  37  |     pipeline_run_id: 'contract-run-001',
  38  |     projection_id: 'contract-projection-001',
  39  |     projection_hash: HASH,
  40  |     publication_ready: true,
  41  |     generated_at: '2026-07-23T00:00:00Z',
  42  |     status_partitioned: false,
  43  |     evidence_detail_transport: 'route-json',
  44  |     files: files.map((logicalName) => ({
  45  |       logical_name: logicalName,
  46  |       path: `${logicalName}.json`,
  47  |       format: 'json',
  48  |       sha256: HASH,
  49  |       row_count: logicalName === 'atlas-nodes-all' ? 2 : 1,
  50  |       size_bytes: 256,
  51  |       cache_policy: 'test-only',
  52  |     })),
  53  |   };
  54  | }
  55  | 
  56  | const nodes = [
  57  |   {
  58  |     atlas_node_id: 'contract-node-001', projection_id: 'contract-projection-001', status_canvas: 'complete',
  59  |     topic_bin_id: 'contract-topic-001', answer_type_code: 'A1', behavior_family: 'information_non_direct',
  60  |     anchor_x: 0.2, anchor_y: 0.3, display_x: 0.21, display_y: 0.31,
  61  |     raw_answer_count: 2, raw_link_count: 1, weighted_mass: 0.4, normalized_mass: 0.5, node_radius: 18,
  62  |     mean_similarity: null, mean_qa_confidence: 0.8, mean_label_confidence: null,
  63  |     representative_evidence_id: 'contract-evidence-001', node_version: 'contract-1', pipeline_run_id: 'contract-run-001', data_version: 'contract-1',
  64  |   },
  65  |   {
  66  |     atlas_node_id: 'contract-node-002', projection_id: 'contract-projection-001', status_canvas: 'active',
  67  |     topic_bin_id: 'contract-topic-002', answer_type_code: 'A7', behavior_family: 'action_evidence',
  68  |     anchor_x: 0.8, anchor_y: 0.7, display_x: 0.79, display_y: 0.69,
  69  |     raw_answer_count: 3, raw_link_count: 2, weighted_mass: 0.7, normalized_mass: 0.8, node_radius: 22,
  70  |     mean_similarity: null, mean_qa_confidence: null, mean_label_confidence: 0.9,
  71  |     representative_evidence_id: null, node_version: 'contract-1', pipeline_run_id: 'contract-run-001', data_version: 'contract-1',
  72  |   },
  73  | ];
  74  | 
  75  | const payloads: Record<string, unknown> = {
  76  |   'frontend-manifest.json': fixtureManifest(),
  77  |   'atlas-nodes-all.json': nodes,
  78  |   'atlas-topic-bins.json': [
  79  |     { topic_bin_id: 'contract-topic-001', projection_id: 'contract-projection-001', dominant_topic_label: '계약 주제 하나', center_x: 0.2, center_y: 0.3, member_count: 2, representative_target_issue_id: null },
  80  |     { topic_bin_id: 'contract-topic-002', projection_id: 'contract-projection-001', dominant_topic_label: '계약 주제 둘', center_x: 0.8, center_y: 0.7, member_count: 3, representative_target_issue_id: null },
  81  |   ],
  82  |   'atlas-centroids.json': [],
  83  |   'evidence-index.json': [{
  84  |     evidence_id: 'contract-evidence-001', title: '계약 검증 증거', reported_status: 'complete', verification_status: 'approved',
  85  |     meeting_id: 'contract-meeting-001', page_start_no: '1', page_end_no: '1', pdf_asset_id: 'contract-pdf-001',
  86  |     review_status: 'approved', publish_status: 'approved', public_visibility: true,
  87  |   }],
  88  |   'projection-meta.json': { projection_id: 'contract-projection-001', projection_hash: HASH, x_min: 0, x_max: 1, y_min: 0, y_max: 1, fit_scope: 'all_statuses' },
  89  | };
  90  | 
  91  | async function routeFixture(route: Route) {
  92  |   const file = new URL(route.request().url()).pathname.split('/').pop() ?? '';
  93  |   const payload = payloads[file];
  94  |   if (payload === undefined) return route.fulfill({ status: 404, body: '' });
  95  |   return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(payload) });
  96  | }
  97  | 
  98  | test('production-style no-approved-manifest route fails closed without legacy requests', async ({ page }) => {
  99  |   const assertClean = collectRuntimeFailures(page);
  100 |   const requested: string[] = [];
  101 |   page.on('request', (request) => requested.push(request.url()));
  102 |   await page.goto('/atlas?status=active&types=A7,A1&view=nodes');
  103 |   await expect(page.getByTestId('atlas-data-unavailable')).toBeVisible();
  104 |   await expect(page.getByText(/승인된 Atlas 데이터가 아직 없습니다/)).toBeVisible();
  105 |   expect(requested.some((url) => url.includes('atlas-nodes-all') || url.includes('PROJ_'))).toBe(false);
  106 |   await page.reload();
  107 |   await expect(page).toHaveURL(/status=active&types=A7,A1&view=nodes/);
  108 |   assertClean();
  109 | });
  110 | 
  111 | test('invalid Atlas query is explicit and never rewritten by a passive observer', async ({ page }) => {
  112 |   await page.goto('/atlas?status=pending&types=A9&node=%3CNA%3E&view=raw');
  113 |   await expect(page.getByTestId('atlas-data-unavailable')).toBeVisible();
  114 |   await expect(page.getByRole('status')).toContainText('URL parameter 5개');
  115 |   await expect(page).toHaveURL(/status=pending&types=A9/);
```