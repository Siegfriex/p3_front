import AxeBuilder from '@axe-core/playwright';
import { createHash } from 'node:crypto';
import { expect, test, type Page, type Route } from '@playwright/test';

const HASH = 'b'.repeat(64);
const FIXTURE_ENABLED = process.env.ATLAS_CONTRACT_FIXTURE_E2E === 'true';
const SCREENSHOT_DIR = process.env.ATLAS_SCREENSHOT_DIR;

async function capture(page: Page, fileName: string) {
  if (SCREENSHOT_DIR) await page.screenshot({ path: `${SCREENSHOT_DIR}/${fileName}`, fullPage: true });
}

function collectRuntimeFailures(page: Page) {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const failedRequests: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('pageerror', (error) => pageErrors.push(error.message));
  page.on('requestfailed', (request) => {
    const errorText = request.failure()?.errorText ?? 'unknown';
    const expectedNavigationAbort = errorText.includes('ERR_ABORTED')
      && request.url().includes('/data/releases/contract-release-001/frontend-manifest.json');
    if (!expectedNavigationAbort) failedRequests.push(`${request.method()} ${request.url()} ${errorText}`);
  });
  return () => {
    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
    expect(failedRequests).toEqual([]);
  };
}

function fixtureManifest(dataPayloads: Record<string, unknown>) {
  const files = [
    'atlas-summary',
    'atlas-nodes-all',
    'atlas-topic-bins',
    'atlas-centroids',
    'evidence-index',
    'projection-meta',
    'method-meta',
    'assets-manifest',
  ];
  return {
    manifest_version: '1.0',
    release_id: 'contract-release-001',
    app_contract_version: '1.0',
    data_version: 'contract-1',
    pipeline_run_id: 'contract-run-001',
    projection_id: 'contract-projection-001',
    projection_hash: HASH,
    publication_ready: true,
    generated_at: '2026-07-23T00:00:00Z',
    status_partitioned: false,
    evidence_detail_transport: 'route-json',
    files: files.map((logicalName) => {
      const fileName = `${logicalName}.json`;
      const body = JSON.stringify(dataPayloads[fileName]);
      return {
      logical_name: logicalName,
      path: fileName,
      format: 'json',
      sha256: createHash('sha256').update(body).digest('hex'),
      row_count: logicalName === 'atlas-nodes-all' ? 2 : 1,
      size_bytes: Buffer.byteLength(body),
      cache_policy: 'test-only',
      };
    }),
  };
}

const nodes = [
  {
    atlas_node_id: 'contract-node-001', projection_id: 'contract-projection-001', status_canvas: 'complete',
    topic_bin_id: 'contract-topic-001', answer_type_code: 'A1', behavior_family: 'information_non_direct',
    anchor_x: 0.2, anchor_y: 0.3, display_x: 0.21, display_y: 0.31,
    raw_answer_count: 2, raw_link_count: 1, weighted_mass: 0.4, normalized_mass: 0.5, node_radius: 18,
    mean_similarity: null, mean_qa_confidence: 0.8, mean_label_confidence: null,
    representative_evidence_id: 'contract-evidence-001', node_version: 'contract-1', pipeline_run_id: 'contract-run-001', data_version: 'contract-1',
  },
  {
    atlas_node_id: 'contract-node-002', projection_id: 'contract-projection-001', status_canvas: 'active',
    topic_bin_id: 'contract-topic-002', answer_type_code: 'A7', behavior_family: 'action_evidence',
    anchor_x: 0.8, anchor_y: 0.7, display_x: 0.79, display_y: 0.69,
    raw_answer_count: 3, raw_link_count: 2, weighted_mass: 0.7, normalized_mass: 0.8, node_radius: 22,
    mean_similarity: null, mean_qa_confidence: null, mean_label_confidence: 0.9,
    representative_evidence_id: null, node_version: 'contract-1', pipeline_run_id: 'contract-run-001', data_version: 'contract-1',
  },
];

const dataPayloads: Record<string, unknown> = {
  'atlas-summary.json': { node_count: 2 },
  'atlas-nodes-all.json': nodes,
  'atlas-topic-bins.json': [
    { topic_bin_id: 'contract-topic-001', projection_id: 'contract-projection-001', dominant_topic_label: '계약 주제 하나', center_x: 0.2, center_y: 0.3, member_count: 2, representative_target_issue_id: null },
    { topic_bin_id: 'contract-topic-002', projection_id: 'contract-projection-001', dominant_topic_label: '계약 주제 둘', center_x: 0.8, center_y: 0.7, member_count: 3, representative_target_issue_id: null },
  ],
  'atlas-centroids.json': [],
  'evidence-index.json': [{
    evidence_id: 'contract-evidence-001', title: '계약 검증 증거', reported_status: 'complete', verification_status: 'approved',
    meeting_id: 'contract-meeting-001', page_start_no: '1', page_end_no: '1', pdf_asset_id: 'contract-pdf-001',
    review_status: 'approved', publish_status: 'approved', public_visibility: true,
  }],
  'projection-meta.json': { projection_id: 'contract-projection-001', projection_hash: HASH, x_min: 0, x_max: 1, y_min: 0, y_max: 1, fit_scope: 'all_statuses' },
  'method-meta.json': { fixture: true },
  'assets-manifest.json': { fixture: true },
};

const payloads: Record<string, unknown> = {
  'frontend-manifest.json': fixtureManifest(dataPayloads),
  ...dataPayloads,
};

async function routeFixture(route: Route) {
  const file = new URL(route.request().url()).pathname.split('/').pop() ?? '';
  const payload = payloads[file];
  if (payload === undefined) return route.fulfill({ status: 404, body: '' });
  return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(payload) });
}

test('production-style no-approved-manifest route fails closed without legacy requests', async ({ page }) => {
  test.skip(FIXTURE_ENABLED, 'no-manifest behavior runs against the production preview without fixture env');
  const assertClean = collectRuntimeFailures(page);
  const requested: string[] = [];
  page.on('request', (request) => requested.push(request.url()));
  await page.goto('/atlas?status=active&types=A7,A1&view=nodes');
  await expect(page.getByTestId('atlas-data-unavailable')).toBeVisible();
  await expect(page.getByText(/승인된 Atlas 데이터가 아직 없습니다/)).toBeVisible();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await capture(page, 'atlas_data_unavailable_1440x1000.png');
  expect(requested.some((url) => url.includes('atlas-nodes-all') || url.includes('PROJ_'))).toBe(false);
  await page.reload();
  await expect(page).toHaveURL(/status=active&types=A7,A1&view=nodes/);
  assertClean();
});

test('invalid Atlas query is explicit and never rewritten by a passive observer', async ({ page }) => {
  test.skip(FIXTURE_ENABLED, 'no-manifest behavior runs against the production preview without fixture env');
  await page.goto('/atlas?status=pending&types=A9&node=%3CNA%3E&view=raw');
  await expect(page.getByTestId('atlas-data-unavailable')).toBeVisible();
  await expect(page.getByText(/URL parameter 5개는 안전한 기본값/)).toBeVisible();
  await expect(page).toHaveURL(/status=pending&types=A9/);
});

test.describe('CONTRACT_FIXTURE route and query shell', () => {
  test.skip(!FIXTURE_ENABLED, 'requires the explicit test-only fixture environment');

  test.beforeEach(async ({ page }) => {
    await page.route('**/data/releases/contract-release-001/**', routeFixture);
  });

  test('restores filters and node selection through URL, reload, Back, and Forward', async ({ page }) => {
    const assertClean = collectRuntimeFailures(page);
    await page.goto('/atlas?status=complete&types=A1&view=nodes');
    await expect(page.getByTestId('fixture-provenance')).toBeVisible();
    await expect(page.getByRole('img', { name: /^답변행태 지도/ })).toBeVisible();
    await page.setViewportSize({ width: 1440, height: 1000 });
    await capture(page, 'atlas_contract_fixture_1440x1000.png');
    const mirrorNode = page.getByRole('button', { name: /^정보 부재·비직접 계열, 추진완료, A1$/ });
    await mirrorNode.click();
    await expect(page).toHaveURL(/node=contract-node-001/);
    await page.reload();
    await expect(page.getByTestId('atlas-live-region')).toContainText('정보 부재·비직접 계열, 추진완료, A1 선택됨');
    await capture(page, 'atlas_contract_fixture_selected_1440x1000.png');
    await page.goBack();
    await expect(page).not.toHaveURL(/node=/);
    await page.goForward();
    await expect(page).toHaveURL(/node=contract-node-001/);
    assertClean();
  });

  test('supports keyboard selection, Escape clear, 44px mirror target, invalid node, and reset', async ({ page }) => {
    await page.goto('/atlas');
    const mirrorNode = page.getByRole('button', { name: /^정보 부재·비직접 계열, 추진완료, A1$/ });
    const secondNode = page.getByRole('button', { name: /^조치·근거 계열, 추진중, A7$/ });
    await expect(page).toHaveTitle(/답변행태 지도/);
    await expect(page.locator('#atlas-node-list button[tabindex="0"]')).toHaveCount(1);
    await mirrorNode.focus();
    await page.keyboard.press('ArrowRight');
    await expect(secondNode).toBeFocused();
    await page.keyboard.press('Home');
    await expect(mirrorNode).toBeFocused();
    await page.keyboard.press('End');
    await expect(secondNode).toBeFocused();
    await page.keyboard.press('Home');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/node=contract-node-001/);
    await page.keyboard.press('Escape');
    await expect(page).not.toHaveURL(/node=/);

    const box = await mirrorNode.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
    expect(box?.width).toBeGreaterThanOrEqual(44);

    const svgHitAreas = page.locator('[data-node-id] > circle:first-child');
    const hitBoxes = await Promise.all(Array.from({ length: await svgHitAreas.count() }, (_, index) => svgHitAreas.nth(index).boundingBox()));
    for (const hitBox of hitBoxes) {
      expect(hitBox?.width).toBeGreaterThanOrEqual(44);
      expect(hitBox?.height).toBeGreaterThanOrEqual(44);
    }
    for (let left = 0; left < hitBoxes.length; left += 1) {
      for (let right = left + 1; right < hitBoxes.length; right += 1) {
        const a = hitBoxes[left];
        const b = hitBoxes[right];
        if (!a || !b) continue;
        const overlaps = a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
        expect(overlaps).toBe(false);
      }
    }

    await page.goto('/atlas?node=contract-node-missing&view=nodes');
    await expect(page.getByTestId('atlas-invalid-node-state')).toBeVisible();
    await page.getByRole('button', { name: 'node 선택 지우기' }).click();
    await expect(page).toHaveURL('/atlas');

    await page.goto('/atlas?status=active&types=A7&view=nodes');
    await page.getByRole('button', { name: '필터 초기화' }).first().click();
    await expect(page).toHaveURL('/atlas');
  });

  test('has zero Axe critical or serious violations in the contract fixture shell', async ({ page }) => {
    const viewports = [
      { width: 320, height: 800 },
      { width: 375, height: 812 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
      { width: 1920, height: 1080 },
    ];
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/atlas');
      await expect(page.getByTestId('fixture-provenance')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
      await capture(page, `${viewport.width}/atlas_${viewport.width}x${viewport.height}_approved-default.png`);
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      expect(result.violations.filter((violation) => violation.impact === 'critical' || violation.impact === 'serious')).toEqual([]);
    }

    await page.setViewportSize({ width: 375, height: 812 });
    await page.emulateMedia({ forcedColors: 'active' });
    await page.goto('/atlas');
    await capture(page, 'forced-colors/atlas_375x812_forced-colors.png');

    await page.emulateMedia({ forcedColors: 'none', reducedMotion: 'reduce' });
    await page.goto('/atlas');
    await capture(page, 'reduced-motion/atlas_375x812_reduced-motion.png');

    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.addStyleTag({ content: '* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; } p { margin-bottom: 2em !important; }' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    await capture(page, 'text-spacing/atlas_375x812_text-spacing.png');

    await page.setViewportSize({ width: 1280, height: 3200 });
    await page.goto('/atlas');
    await page.evaluate(() => { document.documentElement.style.zoom = '400%'; });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    await capture(page, 'zoom-400/atlas_320x800_zoom-400-simulated.png');
  });
});
