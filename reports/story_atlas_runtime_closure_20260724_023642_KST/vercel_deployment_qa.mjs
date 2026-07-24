import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import AxeBuilder from '@axe-core/playwright';
import { chromium } from 'playwright';

const shareUrl = process.env.VERCEL_SHARE_URL;
if (!shareUrl) throw new Error('VERCEL_SHARE_URL is required');
const reportDir = new URL('.', import.meta.url).pathname;
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

await page.goto(shareUrl, { waitUntil: 'networkidle' });
const origin = new URL(page.url()).origin;
const consoleErrors = [];
const pageErrors = [];
const requestFailures = [];
const httpErrors = [];
page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
page.on('pageerror', (error) => pageErrors.push(error.message));
page.on('requestfailed', (request) => requestFailures.push(`${request.method()} ${request.url()} ${request.failure()?.errorText ?? 'unknown'}`));
page.on('response', (response) => { if (response.status() >= 400) httpErrors.push(`${response.status()} ${response.url()}`); });

const pointerResponse = await context.request.get(`${origin}/data/current-release.json`);
const pointer = await pointerResponse.json();
const releaseRoot = `${origin}/data/releases/${pointer.release_id}`;
const manifestResponse = await context.request.get(`${releaseRoot}/frontend-manifest.json`);
const manifest = await manifestResponse.json();
const htmlResponse = await context.request.get(`${origin}/atlas`);

const routes = [];
for (const path of ['/', '/atlas', '/evidence/EVID_18557647961C4C1481271E6B', '/case/case-01', '/method', '/data', '/about']) {
  const response = await page.goto(`${origin}${path}`, { waitUntil: 'networkidle' });
  routes.push({ path, status: response?.status() ?? null, main_visible: await page.locator('main#main-content').isVisible() });
}

await page.emulateMedia({ reducedMotion: 'reduce' });
await page.goto(`${origin}/#answers`, { waitUntil: 'networkidle' });
await page.locator('[data-testid="story-atlas-ready"]').waitFor();
const story = {
  release_id: await page.locator('[data-testid="story-atlas-ready"]').getAttribute('data-release-id'),
  projection_id: await page.locator('[data-testid="story-atlas-ready"]').getAttribute('data-projection-id'),
  projection_hash: await page.locator('[data-testid="story-atlas-ready"]').getAttribute('data-projection-hash'),
  svg_node_count: await page.locator('#answers [data-testid="atlas-chart"] [data-node-id]').count(),
  dom_navigator_count: await page.locator('#answers .atlas-node-navigator').count(),
  mock_text_count: await page.getByText(/MOCK|CONTRACT_FIXTURE|LEGACY/i).count(),
  reduced_motion: await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches),
};
const storyAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
const storyBlockingAxe = storyAxe.violations.filter((item) => item.impact === 'critical' || item.impact === 'serious');

await page.goto(`${origin}/?status=active&types=A2&view=nodes#answers`, { waitUntil: 'networkidle' });
await page.locator('[data-testid="story-atlas-ready"]').waitFor();
const cta = page.getByRole('link', { name: '현재 필터로 전체 답변행태 지도 보기' });
const ctaHref = await cta.getAttribute('href');
await cta.click();
await page.locator('[data-testid="atlas-explorer-ready"]').waitFor();
const ctaUrl = page.url();

await page.goto(`${origin}/atlas`);
await page.locator('[data-testid="atlas-explorer-ready"]').waitFor();
const explorer = {
  release_id: await page.locator('[data-testid="atlas-explorer-ready"]').getAttribute('data-release-id'),
  projection_id: await page.locator('[data-testid="atlas-explorer-ready"]').getAttribute('data-projection-id'),
  projection_hash: await page.locator('[data-testid="atlas-explorer-ready"]').getAttribute('data-projection-hash'),
  svg_node_count: await page.locator('[data-testid="atlas-chart"] [data-node-id]').count(),
  dom_navigator_count: await page.locator('.atlas-node-navigator').count(),
};
const atlasAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
const atlasBlockingAxe = atlasAxe.violations.filter((item) => item.impact === 'critical' || item.impact === 'serious');
const firstNavigator = page.locator('.atlas-node-navigator').first();
await firstNavigator.focus();
await page.keyboard.press('Enter');
const keyboardSelectedUrl = page.url();
await page.goBack();
await page.goForward();
const forwardRestoredUrl = page.url();

await page.goto(`${origin}/atlas?node=ANODE_NOT_APPROVED&view=nodes`);
await page.locator('[data-testid="atlas-invalid-node-state"]').waitFor();
const invalidNodeExplicit = await page.locator('[data-testid="atlas-invalid-node-state"]').isVisible();

await page.goto(`${origin}/evidence/EVID_18557647961C4C1481271E6B`);
await page.locator('[data-testid="approved-evidence-detail"]').waitFor();
const directEvidence = await page.locator('[data-testid="approved-evidence-detail"]').getAttribute('data-evidence-id');
await page.goto(`${origin}/atlas?node=ANODE_E488BDA6398875DB653D7A71&view=nodes`);
await page.getByRole('button', { name: '승인된 대표 증거 보기' }).click();
await page.getByRole('dialog').waitFor();
const drawerEvidence = await page.getByRole('dialog').locator('[data-testid="approved-evidence-detail"]').getAttribute('data-evidence-id');
await page.keyboard.press('Escape');
const drawerRestoredUrl = page.url();
await page.goto(`${origin}/evidence/EVID_NOT_APPROVED`);
await page.locator('[data-testid="evidence-data-unavailable"]').waitFor();
const invalidEvidenceExplicit = await page.locator('[data-testid="evidence-data-unavailable"]').isVisible();

const viewports = [];
for (const viewport of [
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
]) {
  await page.setViewportSize(viewport);
  await page.goto(`${origin}/#answers`);
  await page.locator('[data-testid="story-atlas-ready"]').waitFor();
  await page.waitForLoadState('networkidle');
  const storyOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  await page.screenshot({ path: join(reportDir, 'screenshots', `vercel_story_answers_${viewport.width}x${viewport.height}.png`), fullPage: true });
  await page.goto(`${origin}/atlas`);
  await page.locator('[data-testid="atlas-explorer-ready"]').waitFor();
  await page.waitForLoadState('networkidle');
  const atlasOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  await page.screenshot({ path: join(reportDir, 'screenshots', `vercel_atlas_${viewport.width}x${viewport.height}.png`), fullPage: true });
  viewports.push({ ...viewport, story_overflow_px: storyOverflow, atlas_overflow_px: atlasOverflow });
}

await browser.close();

const unexpectedRequestFailures = requestFailures.filter((item) => !item.includes('net::ERR_ABORTED'));

const result = {
  generated_at: new Date().toISOString(),
  deployment_origin: origin,
  pointer: { status: pointerResponse.status(), cache_control: pointerResponse.headers()['cache-control'], ...pointer },
  manifest: {
    status: manifestResponse.status(),
    cache_control: manifestResponse.headers()['cache-control'],
    release_id: manifest.release_id,
    projection_id: manifest.projection_id,
    projection_hash: manifest.projection_hash,
  },
  html: { status: htmlResponse.status(), cache_control: htmlResponse.headers()['cache-control'] },
  routes,
  story,
  explorer,
  axe: {
    story_critical_or_serious: storyBlockingAxe.length,
    atlas_critical_or_serious: atlasBlockingAxe.length,
  },
  cta: { href: ctaHref, resulting_url: ctaUrl },
  keyboard: { selected_url: keyboardSelectedUrl, forward_restored_url: forwardRestoredUrl },
  invalid_node_explicit: invalidNodeExplicit,
  evidence: { direct_id: directEvidence, drawer_id: drawerEvidence, drawer_restored_url: drawerRestoredUrl, invalid_id_explicit: invalidEvidenceExplicit },
  viewports,
  console_errors: consoleErrors,
  page_errors: pageErrors,
  request_failures: requestFailures,
  unexpected_request_failures: unexpectedRequestFailures,
  http_errors: httpErrors,
};
result.technical_pass = routes.every((item) => item.status === 200 && item.main_visible)
  && result.pointer.status === 200
  && result.manifest.status === 200
  && story.svg_node_count === 16
  && story.dom_navigator_count === 16
  && explorer.svg_node_count === 140
  && explorer.dom_navigator_count === 140
  && story.release_id === explorer.release_id
  && story.projection_id === explorer.projection_id
  && story.projection_hash === explorer.projection_hash
  && story.mock_text_count === 0
  && storyBlockingAxe.length === 0
  && atlasBlockingAxe.length === 0
  && directEvidence === 'EVID_18557647961C4C1481271E6B'
  && drawerEvidence === directEvidence
  && invalidNodeExplicit
  && invalidEvidenceExplicit
  && viewports.every((item) => item.story_overflow_px === 0 && item.atlas_overflow_px === 0)
  && consoleErrors.length === 0
  && pageErrors.length === 0
  && unexpectedRequestFailures.length === 0
  && httpErrors.length === 0;

writeFileSync(join(reportDir, 'VERCEL_DEPLOYMENT_QA_RAW.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ ...result, pointer: { ...result.pointer, manifest_path: result.pointer.manifest_path } }, null, 2));
if (!result.technical_pass) process.exitCode = 1;
