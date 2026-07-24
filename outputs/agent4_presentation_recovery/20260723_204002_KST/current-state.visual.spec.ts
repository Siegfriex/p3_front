import AxeBuilder from '@axe-core/playwright';
import { writeFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';

const runRoot = '/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front/outputs/agent4_presentation_recovery/20260723_204002_KST';
const viewports = [
  { width: 320, height: 800 },
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
] as const;

interface RuntimeAudit {
  route: string;
  viewport: string;
  title: string;
  mainCount: number;
  h1Count: number;
  duplicateIds: string[];
  invalidAriaReferences: string[];
  undersizedTargets: Array<{ label: string; width: number; height: number }>;
  pageOverflowPx: number;
  blockingAxeViolations: Array<{ id: string; impact: string | null; nodes: number }>;
  visualNodeCount: number;
  fixtureMarkerCount: number;
}

const audits: RuntimeAudit[] = [];

function collectRuntimeFailures(page: Page) {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const failedRequests: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => pageErrors.push(error.message));
  page.on('requestfailed', (request) => {
    const failure = request.failure()?.errorText ?? 'unknown';
    const expectedMissingManifest = request.url().includes('/data/releases/') && failure.includes('ERR_ABORTED');
    if (!expectedMissingManifest) failedRequests.push(`${request.method()} ${request.url()} ${failure}`);
  });
  return () => ({ consoleErrors, pageErrors, failedRequests });
}

async function auditPage(page: Page, route: string, viewport: { width: number; height: number }) {
  const axe = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  const blockingAxeViolations = axe.violations
    .filter((violation) => violation.impact === 'critical' || violation.impact === 'serious')
    .map((violation) => ({ id: violation.id, impact: violation.impact, nodes: violation.nodes.length }));
  const dom = await page.evaluate(() => {
    const idCounts = new Map<string, number>();
    document.querySelectorAll<HTMLElement>('[id]').forEach((element) => {
      idCounts.set(element.id, (idCounts.get(element.id) ?? 0) + 1);
    });
    const duplicateIds = [...idCounts.entries()].filter(([, count]) => count > 1).map(([id]) => id);
    const invalidAriaReferences: string[] = [];
    for (const attribute of ['aria-controls', 'aria-labelledby', 'aria-describedby'] as const) {
      document.querySelectorAll<HTMLElement>(`[${attribute}]`).forEach((element) => {
        const ids = element.getAttribute(attribute)?.split(/\s+/).filter(Boolean) ?? [];
        ids.forEach((id) => {
          if (!document.getElementById(id)) invalidAriaReferences.push(`${attribute}:${id}`);
        });
      });
    }
    const undersizedTargets = [...document.querySelectorAll<HTMLElement>('a[href], button, select, summary')]
      .filter((element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
      })
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          label: element.getAttribute('aria-label') ?? element.textContent?.trim().slice(0, 80) ?? element.tagName,
          width: Math.round(rect.width * 10) / 10,
          height: Math.round(rect.height * 10) / 10,
        };
      })
      .filter((target) => target.width < 44 || target.height < 44);
    return {
      mainCount: document.querySelectorAll('main').length,
      h1Count: document.querySelectorAll('h1').length,
      duplicateIds,
      invalidAriaReferences,
      undersizedTargets,
      pageOverflowPx: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
      visualNodeCount: document.querySelectorAll('[data-node-id]').length,
      fixtureMarkerCount: document.querySelectorAll('[data-testid="fixture-provenance"], [data-testid="story-fixture-provenance"], .evidence-fixture-notice').length,
    };
  });
  audits.push({
    route,
    viewport: `${viewport.width}x${viewport.height}`,
    title: await page.title(),
    ...dom,
    blockingAxeViolations,
  });
  expect(dom.mainCount).toBe(1);
  expect(dom.h1Count).toBe(1);
  expect(dom.duplicateIds).toEqual([]);
  expect(dom.invalidAriaReferences).toEqual([]);
  expect(dom.pageOverflowPx).toBe(0);
  expect(dom.undersizedTargets).toEqual([]);
  expect(blockingAxeViolations).toEqual([]);
}

test.afterAll(() => {
  writeFileSync(`${runRoot}/CURRENT_STATE_RUNTIME_AUDIT.json`, `${JSON.stringify(audits, null, 2)}\n`, 'utf8');
});

test('captures current production Story Answers and Atlas across required viewports', async ({ page }) => {
  const runtime = collectRuntimeFailures(page);
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto('/#answers');
    await expect(page.getByTestId('story-atlas-data-unavailable')).toBeVisible();
    await page.locator('#answers').scrollIntoViewIfNeeded();
    await auditPage(page, '/#answers', viewport);
    await page.locator('#answers').screenshot({ path: `${runRoot}/screenshots/${viewport.width}/story-answers-current.png` });

    await page.goto('/atlas');
    await expect(page.getByTestId('atlas-data-unavailable')).toBeVisible();
    await auditPage(page, '/atlas', viewport);
    await page.screenshot({ path: `${runRoot}/screenshots/${viewport.width}/atlas-current.png`, fullPage: true });
  }
  expect(runtime()).toEqual({ consoleErrors: [], pageErrors: [], failedRequests: [] });
});

test('captures production Evidence page and route-driven Drawer without fixture leakage', async ({ page }) => {
  const runtime = collectRuntimeFailures(page);
  for (const viewport of [{ width: 375, height: 812 }, { width: 1440, height: 900 }]) {
    await page.setViewportSize(viewport);
    await page.goto('/evidence/ev-101');
    await expect(page.getByTestId('evidence-data-unavailable')).toBeVisible();
    await auditPage(page, '/evidence/ev-101', viewport);
    await page.screenshot({ path: `${runRoot}/screenshots/${viewport.width}/evidence-current.png`, fullPage: true });
  }

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const opener = page.getByRole('button', { name: '첫 증거 원문 ev-101 확인하기' });
  await opener.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByTestId('evidence-data-unavailable')).toBeVisible();
  await expect(page.getByRole('button', { name: '드로어 닫기' })).toBeFocused();
  await expect(page.locator('#root')).toHaveAttribute('aria-hidden', 'true');
  expect(await page.locator('#root').evaluate((element) => element.inert)).toBe(true);
  await page.screenshot({ path: `${runRoot}/screenshots/375/evidence-drawer-current.png` });
  await page.keyboard.press('Escape');
  await expect(opener).toBeFocused();
  expect(runtime()).toEqual({ consoleErrors: [], pageErrors: [], failedRequests: [] });
});

test('captures forced colors, reduced motion, text spacing, zoom equivalent, and focus visibility', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ forcedColors: 'active' });
  await page.goto('/atlas');
  await expect(page.getByTestId('atlas-data-unavailable')).toBeVisible();
  await page.screenshot({ path: `${runRoot}/screenshots/overrides/atlas-forced-colors.png`, fullPage: true });

  await page.emulateMedia({ forcedColors: 'none', reducedMotion: 'reduce' });
  await page.goto('/atlas');
  await page.screenshot({ path: `${runRoot}/screenshots/overrides/atlas-reduced-motion.png`, fullPage: true });

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.getByTestId('atlas-data-unavailable')).toBeVisible();
  await page.addStyleTag({ content: '* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; } p { margin-bottom: 2em !important; }' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await page.screenshot({ path: `${runRoot}/screenshots/overrides/atlas-text-spacing.png`, fullPage: true });

  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/atlas');
  await expect(page.getByTestId('atlas-data-unavailable')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await page.screenshot({ path: `${runRoot}/screenshots/overrides/atlas-zoom-400-equivalent.png`, fullPage: true });

  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: '본문으로 건너뛰기' });
  await expect(skipLink).toBeFocused();
  expect(await skipLink.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe('none');
  await page.screenshot({ path: `${runRoot}/screenshots/overrides/atlas-focus-visible.png` });
});
