import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';

const baseUrl = 'http://127.0.0.1:4330';
const reportDir = new URL('.', import.meta.url).pathname;
const screenshotDir = join(reportDir, 'screenshots');
mkdirSync(screenshotDir, { recursive: true });

const httpChecks = [];
async function check(path) {
  const response = await fetch(`${baseUrl}${path}`, { cache: 'no-store' });
  httpChecks.push({ path, status: response.status, ok: response.ok, content_type: response.headers.get('content-type') });
  if (!response.ok) throw new Error(`${path} returned ${response.status}`);
  return response;
}

const pointer = await (await check('/data/current-release.json')).json();
const releaseRoot = `/data/releases/${pointer.release_id}`;
const manifest = await (await check(`${releaseRoot}/frontend-manifest.json`)).json();
for (const path of [
  'atlas-summary.json',
  'atlas-nodes-all.json',
  'atlas-topic-bins.json',
  'atlas-centroids.json',
  'evidence-index.json',
  'projection-meta.json',
  'story-metrics.json',
  'evidence/EVID_18557647961C4C1481271E6B.json',
]) await check(`${releaseRoot}/${path}`);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const consoleErrors = [];
const pageErrors = [];
const requestFailures = [];
page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
page.on('pageerror', (error) => pageErrors.push(error.message));
page.on('requestfailed', (request) => requestFailures.push(`${request.method()} ${request.url()} ${request.failure()?.errorText ?? 'unknown'}`));

await page.goto(`${baseUrl}/#answers`);
await page.locator('[data-testid="story-atlas-ready"]').waitFor();
const story = await page.evaluate(() => {
  const ready = document.querySelector('[data-testid="story-atlas-ready"]');
  return {
    release_id: ready?.getAttribute('data-release-id'),
    projection_id: ready?.getAttribute('data-projection-id'),
    projection_hash: ready?.getAttribute('data-projection-hash'),
    svg_node_count: document.querySelectorAll('#answers [data-testid="atlas-chart"] [data-node-id]').length,
    dom_navigator_count: document.querySelectorAll('#answers .atlas-node-navigator').length,
    data_unavailable_count: document.querySelectorAll('[data-testid="story-atlas-data-unavailable"]').length,
  };
});

await page.goto(`${baseUrl}/atlas`);
await page.locator('[data-testid="atlas-explorer-ready"]').waitFor();
const explorer = await page.evaluate(() => {
  const ready = document.querySelector('[data-testid="atlas-explorer-ready"]');
  return {
    release_id: ready?.getAttribute('data-release-id'),
    projection_id: ready?.getAttribute('data-projection-id'),
    projection_hash: ready?.getAttribute('data-projection-hash'),
    svg_node_count: document.querySelectorAll('[data-testid="atlas-chart"] [data-node-id]').length,
    dom_navigator_count: document.querySelectorAll('.atlas-node-navigator').length,
    data_unavailable_count: document.querySelectorAll('[data-testid="atlas-data-unavailable"]').length,
  };
});

await page.goto(`${baseUrl}/evidence/EVID_18557647961C4C1481271E6B`);
await page.locator('[data-testid="approved-evidence-detail"]').waitFor();
const evidence = {
  evidence_id: await page.locator('[data-testid="approved-evidence-detail"]').getAttribute('data-evidence-id'),
  approved_detail_visible: await page.locator('[data-testid="approved-evidence-detail"]').isVisible(),
  mock_text_count: await page.getByText(/MOCK PREVIEW|MOCK CITATION|CONTRACT_FIXTURE/i).count(),
};

for (const viewport of [
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
]) {
  await page.setViewportSize(viewport);
  for (const target of [
    { name: 'story_answers', path: '/#answers', ready: '[data-testid="story-atlas-ready"]' },
    { name: 'atlas', path: '/atlas', ready: '[data-testid="atlas-explorer-ready"]' },
  ]) {
    await page.goto(`${baseUrl}${target.path}`);
    await page.locator(target.ready).waitFor();
    await page.screenshot({ path: join(screenshotDir, `${target.name}_${viewport.width}x${viewport.height}.png`), fullPage: true });
  }
}

await browser.close();

const result = {
  generated_at: new Date().toISOString(),
  base_url: baseUrl,
  pointer,
  manifest: {
    release_id: manifest.release_id,
    projection_id: manifest.projection_id,
    projection_hash: manifest.projection_hash,
    declared_node_count: manifest.files.find((file) => file.logical_name === 'atlas-nodes-all')?.row_count ?? null,
  },
  story,
  explorer,
  evidence,
  http_checks: httpChecks,
  console_errors: consoleErrors,
  page_errors: pageErrors,
  request_failures: requestFailures,
  pass: story.release_id === pointer.release_id
    && explorer.release_id === pointer.release_id
    && story.svg_node_count === 16
    && story.dom_navigator_count === 16
    && explorer.svg_node_count === 140
    && explorer.dom_navigator_count === 140
    && evidence.approved_detail_visible
    && evidence.mock_text_count === 0
    && httpChecks.every((item) => item.status === 200)
    && consoleErrors.length === 0
    && pageErrors.length === 0
    && requestFailures.length === 0,
};
writeFileSync(join(reportDir, 'LOCAL_PRODUCTION_QA_RAW.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify(result, null, 2));
if (!result.pass) process.exitCode = 1;
