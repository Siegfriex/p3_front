# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: atlas-contract-shell.spec.ts >> CONTRACT_FIXTURE route and query shell >> supports keyboard selection, Escape clear, 44px mirror target, invalid node, and reset
- Location: tests/e2e/atlas-contract-shell.spec.ts:142:3

# Error details

```
Error: locator.boundingBox: Error: strict mode violation: getByRole('button', { name: /A1 계약 주제 하나/ }) resolved to 2 elements:
    1) <g tabindex="0" role="button" data-anchor-x="0.2" data-anchor-y="0.3" aria-pressed="false" data-node-id="contract-node-001" transform="translate(202 329.52)" aria-label="A1 계약 주제 하나, complete, 답변 2건" class="cursor-pointer focus:outline-none">…</g> aka getByRole('button', { name: 'A1 계약 주제 하나, complete, 답변 2건' })
    2) <button type="button" aria-pressed="false" class="min-h-11 w-full border border-[var(--color-neutral-300)] bg-[var(--color-paper)] px-3 py-2 text-left text-sm focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--color-ink)]">…</button> aka getByRole('button', { name: 'A1 계약 주제 하나 (2건)' })

Call log:
  - waiting for getByRole('button', { name: /A1 계약 주제 하나/ })

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
    - generic [ref=e38]:
      - generic [ref=e39]:
        - paragraph [ref=e40]: FULL EXPLORER / CONTRACT SHELL
        - heading "답변행태 지도" [level=1] [ref=e41]
        - paragraph [ref=e42]: 승인된 aggregate node만 표시하는 URL 기반 탐색 화면입니다. 브라우저에서 UMAP이나 node 집계를 수행하지 않습니다.
      - generic [ref=e44]:
        - paragraph [ref=e45]: CONTRACT_FIXTURE / 개발·테스트 전용 / 실제 분석 결과가 아님
        - region "Atlas 필터" [ref=e46]:
          - generic [ref=e47]:
            - generic [ref=e48]:
              - text: 처리 상태
              - combobox "처리 상태" [ref=e49]:
                - option "전체 상태" [selected]
                - option "추진완료"
                - option "추진중"
                - option "미완료·단절"
            - group "답변 유형" [ref=e50]:
              - generic [ref=e51]: 답변 유형
              - generic [ref=e52]:
                - generic [ref=e53] [cursor=pointer]:
                  - checkbox "A1" [checked] [ref=e54]
                  - text: A1
                - generic [ref=e55] [cursor=pointer]:
                  - checkbox "A2" [checked] [ref=e56]
                  - text: A2
                - generic [ref=e57] [cursor=pointer]:
                  - checkbox "A3" [checked] [ref=e58]
                  - text: A3
                - generic [ref=e59] [cursor=pointer]:
                  - checkbox "A4" [checked] [ref=e60]
                  - text: A4
                - generic [ref=e61] [cursor=pointer]:
                  - checkbox "A5" [checked] [ref=e62]
                  - text: A5
                - generic [ref=e63] [cursor=pointer]:
                  - checkbox "A6" [checked] [ref=e64]
                  - text: A6
                - generic [ref=e65] [cursor=pointer]:
                  - checkbox "A7" [checked] [ref=e66]
                  - text: A7
                - generic [ref=e67] [cursor=pointer]:
                  - checkbox "A8" [checked] [ref=e68]
                  - text: A8
            - button "필터 초기화" [ref=e69] [cursor=pointer]
        - paragraph [ref=e70]: 2개 node 표시
        - generic [ref=e71]:
          - region "답변행태 aggregate node" [ref=e72]:
            - generic [ref=e73]:
              - heading "답변행태 aggregate node" [level=2] [ref=e74]
              - paragraph [ref=e75]: 2개 aggregate node. 위치는 주제 투영 좌표, 모양은 답변행태, 크기는 정규화 질량을 나타냅니다.
            - group "답변행태 지도 2개 aggregate node. 위치는 주제 투영 좌표, 모양은 답변행태, 크기는 정규화 질량을 나타냅니다. 아래 동기화 목록으로도 모든 node를 탐색할 수 있습니다." [ref=e76]:
              - button "A1 계약 주제 하나, complete, 답변 2건" [active] [ref=e79] [cursor=pointer]
              - button "A7 계약 주제 둘, active, 답변 3건" [ref=e82] [cursor=pointer]
          - complementary "선택 node 상세" [ref=e85]:
            - generic [ref=e86]:
              - paragraph [ref=e87]: A1 / complete
              - heading "계약 주제 하나" [level=2] [ref=e88]
              - generic [ref=e89]:
                - generic [ref=e90]:
                  - term [ref=e91]: 답변 수
                  - definition [ref=e92]: "2"
                - generic [ref=e93]:
                  - term [ref=e94]: 연결 수
                  - definition [ref=e95]: "1"
                - generic [ref=e96]:
                  - term [ref=e97]: 질량
                  - definition [ref=e98]: "0.500"
                - generic [ref=e99]:
                  - term [ref=e100]: 신뢰도
                  - definition [ref=e101]: "0.800"
              - button "승인된 대표 증거 보기" [ref=e102] [cursor=pointer]
        - region "접근 가능한 node 목록" [ref=e103]:
          - heading "접근 가능한 node 목록" [level=2] [ref=e104]
          - paragraph [ref=e105]: 지도와 같은 필터 결과를 텍스트 목록으로 탐색합니다.
          - list [ref=e106]:
            - listitem [ref=e107]:
              - button "A1 계약 주제 하나 (2건)" [ref=e108] [cursor=pointer]:
                - text: A1 계약 주제 하나
                - generic [ref=e109]: (2건)
            - listitem [ref=e110]:
              - button "A7 계약 주제 둘 (3건)" [ref=e111] [cursor=pointer]:
                - text: A7 계약 주제 둘
                - generic [ref=e112]: (3건)
        - complementary "투영 해석 주의" [ref=e113]:
          - paragraph [ref=e114]: 이 지도는 의미적 위치를 2차원으로 투영한 표시용 공간입니다.
          - paragraph [ref=e115]: 2차원 거리 자체를 실제 유사도 점수로 해석하지 마십시오.
  - contentinfo [ref=e116]:
    - generic [ref=e117]:
      - generic [ref=e118]: "PROJECT: P3_CULTURE"
      - generic [ref=e121]: 원론적/유보적 답변 (42%)
      - generic [ref=e124]: 공식 완결 (18%)
      - generic [ref=e127]: 진행/이관 (40%)
    - generic [ref=e128]:
      - generic [ref=e129]: "CHAPTER: PROLOGUE"
      - generic [ref=e130]: "|"
      - generic [ref=e131]: V1.0 EDITORIAL SCROLLYTELLING
```

# Test source

```ts
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
  116 | });
  117 | 
  118 | test.describe('CONTRACT_FIXTURE route and query shell', () => {
  119 |   test.skip(!FIXTURE_ENABLED, 'requires the explicit test-only fixture environment');
  120 | 
  121 |   test.beforeEach(async ({ page }) => {
  122 |     await page.route('**/data/releases/contract-release-001/**', routeFixture);
  123 |   });
  124 | 
  125 |   test('restores filters and node selection through URL, reload, Back, and Forward', async ({ page }) => {
  126 |     const assertClean = collectRuntimeFailures(page);
  127 |     await page.goto('/atlas?status=complete&types=A1&view=nodes');
  128 |     await expect(page.getByTestId('fixture-provenance')).toBeVisible();
  129 |     await expect(page.getByRole('group', { name: /^답변행태 지도/ })).toBeVisible();
  130 |     const mirrorNode = page.getByRole('button', { name: /A1 계약 주제 하나/ });
  131 |     await mirrorNode.click();
  132 |     await expect(page).toHaveURL(/node=contract-node-001/);
  133 |     await page.reload();
  134 |     await expect(page.getByTestId('atlas-live-region')).toContainText('계약 주제 하나 선택됨');
  135 |     await page.goBack();
  136 |     await expect(page).not.toHaveURL(/node=/);
  137 |     await page.goForward();
  138 |     await expect(page).toHaveURL(/node=contract-node-001/);
  139 |     assertClean();
  140 |   });
  141 | 
  142 |   test('supports keyboard selection, Escape clear, 44px mirror target, invalid node, and reset', async ({ page }) => {
  143 |     await page.goto('/atlas');
  144 |     const svgNode = page.locator('[data-node-id="contract-node-001"]');
  145 |     await svgNode.focus();
  146 |     await page.keyboard.press('Enter');
  147 |     await expect(page).toHaveURL(/node=contract-node-001/);
  148 |     await page.keyboard.press('Escape');
  149 |     await expect(page).not.toHaveURL(/node=/);
  150 | 
  151 |     const mirrorNode = page.getByRole('button', { name: /A1 계약 주제 하나/ });
> 152 |     const box = await mirrorNode.boundingBox();
      |                                  ^ Error: locator.boundingBox: Error: strict mode violation: getByRole('button', { name: /A1 계약 주제 하나/ }) resolved to 2 elements:
  153 |     expect(box?.height).toBeGreaterThanOrEqual(44);
  154 | 
  155 |     await page.goto('/atlas?node=contract-node-missing&view=nodes');
  156 |     await expect(page.getByTestId('atlas-invalid-node-state')).toBeVisible();
  157 |     await page.getByRole('button', { name: 'node 선택 지우기' }).click();
  158 |     await expect(page).toHaveURL('/atlas');
  159 | 
  160 |     await page.goto('/atlas?status=active&types=A7&view=nodes');
  161 |     await page.getByRole('button', { name: '필터 초기화' }).first().click();
  162 |     await expect(page).toHaveURL('/atlas');
  163 |   });
  164 | 
  165 |   test('has zero Axe critical or serious violations in the contract fixture shell', async ({ page }) => {
  166 |     await page.goto('/atlas');
  167 |     await expect(page.getByTestId('fixture-provenance')).toBeVisible();
  168 |     const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  169 |     expect(result.violations.filter((violation) => violation.impact === 'critical' || violation.impact === 'serious')).toEqual([]);
  170 |   });
  171 | });
  172 | 
```