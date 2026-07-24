import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const runRoot = '/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front/outputs/design_wcag_final/20260723_175400_KST';

function collectRuntimeFailures(page: Page) {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const failedRequests: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('pageerror', (error) => pageErrors.push(error.message));
  page.on('requestfailed', (request) => failedRequests.push(`${request.method()} ${request.url()} ${request.failure()?.errorText ?? 'unknown'}`));
  return () => {
    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
    expect(failedRequests).toEqual([]);
  };
}

async function expectNoBlockingAxeViolations(page: Page) {
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(result.violations.filter((violation) => violation.impact === 'critical' || violation.impact === 'serious')).toEqual([]);
}

const viewports = [
  { width: 320, height: 800 },
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
] as const;

test('production Story and Atlas fail closed across the required viewports', async ({ page }) => {
  const assertClean = collectRuntimeFailures(page);
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto('/#answers');
    await expect(page.getByTestId('story-atlas-data-unavailable')).toBeVisible();
    await expect(page.locator('[data-node-id]')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    await page.screenshot({ path: `${runRoot}/screenshots/${viewport.width}/answers_${viewport.width}x${viewport.height}_unavailable.png`, fullPage: true });

    await page.goto('/atlas');
    await expect(page.getByTestId('atlas-data-unavailable')).toBeVisible();
    await expect(page.locator('[data-node-id]')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    await page.screenshot({ path: `${runRoot}/screenshots/${viewport.width}/atlas_${viewport.width}x${viewport.height}_unavailable.png`, fullPage: true });
  }
  assertClean();
});

test('production evidence direct page and Drawer do not expose mock excerpts', async ({ page }) => {
  const assertClean = collectRuntimeFailures(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/evidence/ev-101');
  await expect(page.getByTestId('evidence-data-unavailable')).toBeVisible();
  await expect(page.getByText(/MOCK PREVIEW/)).toHaveCount(0);
  await expect(page).toHaveTitle(/증거 EV-101/);
  await expectNoBlockingAxeViolations(page);
  await page.screenshot({ path: `${runRoot}/screenshots/1440/evidence_1440x900_unavailable.png`, fullPage: true });

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const opener = page.getByRole('button', { name: '첫 증거 원문 ev-101 확인하기' });
  await opener.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByTestId('evidence-data-unavailable')).toBeVisible();
  await expect(dialog.getByText(/MOCK PREVIEW/)).toHaveCount(0);
  await expect(page.getByRole('button', { name: '드로어 닫기' })).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await expectNoBlockingAxeViolations(page);
  await page.screenshot({ path: `${runRoot}/screenshots/375/evidence_drawer_375x812_unavailable.png`, fullPage: true });
  await page.goBack();
  await expect(opener).toBeFocused();
  assertClean();
});

test('forced colors, reduced motion, text spacing, 400-percent equivalent, and focus visibility remain usable', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ forcedColors: 'active' });
  await page.goto('/atlas');
  await page.screenshot({ path: `${runRoot}/screenshots/forced-colors/atlas_375x812_forced-colors.png`, fullPage: true });

  await page.emulateMedia({ forcedColors: 'none', reducedMotion: 'reduce' });
  await page.goto('/atlas');
  await page.screenshot({ path: `${runRoot}/screenshots/reduced-motion/atlas_375x812_reduced-motion.png`, fullPage: true });

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.addStyleTag({ content: '* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; } p { margin-bottom: 2em !important; }' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await page.screenshot({ path: `${runRoot}/screenshots/text-spacing/atlas_375x812_text-spacing.png`, fullPage: true });

  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/atlas');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await page.screenshot({ path: `${runRoot}/screenshots/zoom-400/atlas_320x800_zoom-400-equivalent.png`, fullPage: true });

  await page.goto('/atlas');
  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: '본문으로 건너뛰기' });
  await expect(skipLink).toBeFocused();
  const focusStyle = await skipLink.evaluate((element) => getComputedStyle(element).outlineStyle);
  expect(focusStyle).not.toBe('none');
  await page.screenshot({ path: `${runRoot}/screenshots/focus-visible/atlas_320x800_skip-link-focus.png` });
});

test('essential Atlas recovery targets satisfy the 44px project target', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/atlas');
  const targets = page.getByTestId('atlas-data-unavailable').locator('a, button, select, summary');
  for (let index = 0; index < await targets.count(); index += 1) {
    const box = await targets.nth(index).boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }
});
