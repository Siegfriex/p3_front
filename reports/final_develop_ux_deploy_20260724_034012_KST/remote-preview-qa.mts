import AxeBuilder from '@axe-core/playwright';
import { chromium, type Page } from '@playwright/test';
import { createHash } from 'node:crypto';
import { writeFile } from 'node:fs/promises';

const shareUrl = process.env.VERCEL_SHARE_URL;
const origin = process.env.VERCEL_PREVIEW_ORIGIN;
const outputPath = process.env.VERCEL_QA_OUTPUT;
const screenshotDir = process.env.VERCEL_SCREENSHOT_DIR;
const qaLabel = process.env.VERCEL_QA_LABEL ?? 'vercel-preview';
const qaVerdict = process.env.VERCEL_QA_VERDICT ?? 'VERCEL_PREVIEW_PASS';
if (!shareUrl || !origin || !outputPath || !screenshotDir) throw new Error('Missing Vercel QA environment');

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const page = await context.newPage();
const consoleErrors: string[] = [];
const pageErrors: string[] = [];
const requestFailures: string[] = [];
page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
page.on('pageerror', (error) => pageErrors.push(error.message));
page.on('requestfailed', (request) => {
  const errorText = request.failure()?.errorText ?? '';
  if (errorText.includes('ERR_ABORTED')) return;
  requestFailures.push(`${request.method()} ${request.url()} ${errorText}`);
});

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

async function blockingAxe(pageToCheck: Page) {
  const result = await new AxeBuilder({ page: pageToCheck })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  return result.violations
    .filter((violation) => violation.impact === 'critical' || violation.impact === 'serious')
    .map((violation) => ({ id: violation.id, impact: violation.impact, nodes: violation.nodes.length }));
}

const routeStatus: Record<string, number | null> = {};
const viewports: Array<{ width: number; height: number; route: string; overflow: number }> = [];
const axe: Record<string, unknown[]> = {};

const first = await page.goto(shareUrl, { waitUntil: 'networkidle' });
routeStatus['/'] = first?.status() ?? null;
assert(page.url().startsWith(origin), `Share URL did not authorize preview: ${page.url()}`);
await page.locator('[data-testid="story-atlas-ready"]').waitFor();
const releaseId = await page.locator('[data-testid="story-atlas-ready"]').getAttribute('data-release-id');
const storyText = await page.locator('body').innerText();
const storyPreviewSvgCount = await page.locator('#answers [data-testid="atlas-chart"] [data-node-id]').count();
const storyPreviewDomCount = await page.locator('#answers .atlas-node-navigator').count();
assert(releaseId === 'ATLAS_DG761_STORY_20260724_024000_KST_D9DB2264', `Unexpected release ${releaseId}`);
assert(storyPreviewSvgCount === 16 && storyPreviewDomCount === 16, 'Story node parity failed');
assert(!/2,842|82\.4%|ev-101|CONTRACT_FIXTURE|MOCK PREVIEW/.test(storyText), 'Legacy fixture leaked into Story');
for (const heading of ['조치 중” 3년째', '반복된 사망사고', '완료와 진행', '기억이 안 납니다']) {
  assert(storyText.includes(heading), `Missing editorial Story heading: ${heading}`);
}
const editorialImages = page.locator('main img');
const editorialImageCount = await editorialImages.count();
for (let index = 0; index < editorialImageCount; index += 1) {
  const image = editorialImages.nth(index);
  await image.scrollIntoViewIfNeeded();
  await image.evaluate((element) => (element as HTMLImageElement).decode());
}
const brokenImages = await editorialImages.evaluateAll((images) => images
  .filter((image) => !(image as HTMLImageElement).complete || (image as HTMLImageElement).naturalWidth === 0)
  .map((image) => (image as HTMLImageElement).alt));
assert(editorialImageCount === 7 && brokenImages.length === 0, `Editorial images failed: ${JSON.stringify(brokenImages)}`);
await page.screenshot({ path: `${screenshotDir}/${qaLabel}-story-playwright.png`, fullPage: true });
axe.story = await blockingAxe(page);

await page.goto(`${origin}/?status=active&types=A2&view=nodes#answers`, { waitUntil: 'networkidle' });
await page.getByRole('link', { name: '현재 필터로 전체 답변행태 지도 보기' }).click();
await page.getByTestId('atlas-explorer-ready').waitFor();
await page.waitForLoadState('networkidle');
assert(page.url() === `${origin}/atlas?status=active&types=A2&view=nodes`, `CTA filter carry failed: ${page.url()}`);
const filteredSvgCount = await page.locator('[data-testid="atlas-chart"] [data-node-id]').count();
const filteredDomCount = await page.locator('#atlas-node-list .atlas-node-navigator').count();
assert(filteredSvgCount === filteredDomCount && filteredSvgCount > 0, 'Filtered Explorer parity failed');

const atlasResponse = await page.goto(`${origin}/atlas`, { waitUntil: 'networkidle' });
routeStatus['/atlas'] = atlasResponse?.status() ?? null;
const atlasSvgCount = await page.locator('[data-testid="atlas-chart"] [data-node-id]').count();
const atlasDomCount = await page.locator('#atlas-node-list .atlas-node-navigator').count();
assert(atlasSvgCount === 140 && atlasDomCount === 140, 'Full Explorer 140-node parity failed');
await page.screenshot({ path: `${screenshotDir}/${qaLabel}-atlas-playwright.png`, fullPage: true });
axe.atlas = await blockingAxe(page);

const evidenceId = 'EVID_18557647961C4C1481271E6B';
const evidenceResponse = await page.goto(`${origin}/evidence/${evidenceId}`, { waitUntil: 'networkidle' });
routeStatus[`/evidence/${evidenceId}`] = evidenceResponse?.status() ?? null;
assert(await page.locator(`[data-testid="approved-evidence-detail"][data-evidence-id="${evidenceId}"]`).count() === 1, 'Approved Evidence direct route failed');
await page.screenshot({ path: `${screenshotDir}/${qaLabel}-evidence-playwright.png`, fullPage: true });
axe.evidence = await blockingAxe(page);

await page.goto(`${origin}/evidence/EVID_NOT_APPROVED`, { waitUntil: 'networkidle' });
assert(await page.locator('[data-testid="evidence-data-unavailable"]').count() === 1, 'Invalid Evidence did not fail closed');

for (const route of ['/method', '/method/projection', '/data', '/about', '/case/case-01']) {
  const response = await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' });
  routeStatus[route] = response?.status() ?? null;
  assert(response?.status() === 200, `${route} direct route failed`);
  assert(await page.locator('main#main-content').count() === 1, `${route} SPA entry missing`);
}

await page.goto(`${origin}/`, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: /첫 승인 증거 원문 확인하기/ }).click();
await page.getByRole('dialog').waitFor();
await page.getByRole('dialog').locator('[data-testid="approved-evidence-detail"]').waitFor();
assert(await page.getByRole('dialog').locator('[data-testid="approved-evidence-detail"]').count() === 1, 'Evidence Drawer did not consume approved detail');
await page.keyboard.press('Escape');
assert(await page.getByRole('dialog').count() === 0 && page.url() === `${origin}/`, 'Evidence Drawer history restoration failed');

for (const viewport of [
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
]) {
  await page.setViewportSize(viewport);
  for (const route of ['/', '/atlas']) {
    await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    viewports.push({ ...viewport, route, overflow });
    assert(overflow === 0, `${route} overflow at ${viewport.width}x${viewport.height}: ${overflow}`);
  }
}

const pointerResponse = await context.request.get(`${origin}/data/current-release.json`);
const pointer = await pointerResponse.json() as { release_id: string; manifest_path: string; manifest_sha256: string };
const manifestResponse = await context.request.get(`${origin}${pointer.manifest_path}`);
const manifestBytes = await manifestResponse.body();
const manifestSha256 = createHash('sha256').update(manifestBytes).digest('hex');
const releaseAssetResponse = await context.request.get(`${origin}${pointer.manifest_path}`);
const htmlResponse = await context.request.get(`${origin}/`);
assert(pointer.release_id === releaseId, 'Pointer and rendered release mismatch');
assert(manifestSha256 === pointer.manifest_sha256, 'Remote manifest SHA-256 mismatch');

const result = {
  verdict: qaVerdict,
  origin,
  releaseId,
  counts: { storyPreviewSvgCount, storyPreviewDomCount, atlasSvgCount, atlasDomCount, filteredSvgCount, filteredDomCount, editorialImageCount },
  brokenImages,
  routeStatus,
  viewports,
  axe,
  cache: {
    pointer: pointerResponse.headers()['cache-control'] ?? null,
    releaseAsset: releaseAssetResponse.headers()['cache-control'] ?? null,
    html: htmlResponse.headers()['cache-control'] ?? null,
  },
  manifestSha256,
  manifestSha256MatchesPointer: manifestSha256 === pointer.manifest_sha256,
  consoleErrors,
  pageErrors,
  requestFailures,
};
assert(consoleErrors.length === 0 && pageErrors.length === 0 && requestFailures.length === 0, `Remote runtime failures: ${JSON.stringify({ consoleErrors, pageErrors, requestFailures })}`);
assert(Object.values(axe).every((violations) => violations.length === 0), `Remote Axe blocker: ${JSON.stringify(axe)}`);
await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
await browser.close();
console.log(JSON.stringify(result));
