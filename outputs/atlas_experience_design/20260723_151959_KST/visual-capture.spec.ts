import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

const runRoot = '/home/sieg/projects-wsl/SBS_dataScience/DSJA/P3_CULTURE/P3_0722/frontend/p3_front/outputs/atlas_experience_design/20260723_151959_KST';
const timestamp = '20260723_163000_REDLINE_KST';
const allViewports = [
  { directory: '375', width: 375, height: 812 },
  { directory: '768', width: 768, height: 1024 },
  { directory: '1440', width: 1440, height: 900 },
  { directory: '1920', width: 1920, height: 1080 },
] as const;
const requestedWidth = Number(process.env.AGENT4_CAPTURE_WIDTH ?? 0);
const viewports = requestedWidth ? allViewports.filter((viewport) => viewport.width === requestedWidth) : allViewports;

test('capture production no-data experience at the four required viewports', async ({ page }) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const failedRequests: string[] = [];
  const results: Record<string, unknown>[] = [];

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => pageErrors.push(error.message));
  page.on('requestfailed', (request) => {
    const failure = request.failure()?.errorText ?? 'unknown';
    if (!failure.includes('ERR_ABORTED')) failedRequests.push(`${request.method()} ${request.url()} ${failure}`);
  });

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    await page.goto('/?status=active&types=A1,A7#answers');
    await expect(page.getByTestId('story-atlas-data-unavailable')).toBeVisible();
    await page.waitForTimeout(800);
    const storyAxe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    const storyMetrics = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
    }));
    await page.screenshot({
      path: `${runRoot}/screenshots/${viewport.directory}/answers_${viewport.width}x${viewport.height}_data-unavailable_${timestamp}.png`,
      fullPage: true,
    });
    await page.getByTestId('story-atlas-data-unavailable').scrollIntoViewIfNeeded();
    await page.screenshot({
      path: `${runRoot}/screenshots/${viewport.directory}/answers_${viewport.width}x${viewport.height}_chapter-data-unavailable_${timestamp}.png`,
      fullPage: false,
    });

    const explorerLink = page.getByRole('link', { name: '전체 답변행태 지도 보기' });
    await explorerLink.focus();
    const focusOutline = await explorerLink.evaluate((element) => {
      const style = getComputedStyle(element);
      return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth, outlineColor: style.outlineColor };
    });
    await page.screenshot({
      path: `${runRoot}/screenshots/${viewport.directory}/answers_${viewport.width}x${viewport.height}_cta-focus_${timestamp}.png`,
      fullPage: false,
    });

    await explorerLink.click();
    await expect(page).toHaveURL(/\/atlas\?status=active&types=A1%2CA7/);
    await expect(page.getByTestId('atlas-data-unavailable')).toBeVisible();
    const atlasAxe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    const atlasMetrics = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
    }));
    await page.screenshot({
      path: `${runRoot}/screenshots/${viewport.directory}/atlas_${viewport.width}x${viewport.height}_data-unavailable_${timestamp}.png`,
      fullPage: true,
    });

    await page.goto('/dev/foundations');
    const calibration = page.getByTestId('redline-calibration');
    await expect(calibration).toBeVisible();
    await page.getByRole('heading', { name: 'REDLINE PUBLIC RECORD' }).scrollIntoViewIfNeeded();
    const foundationMetrics = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      offenders: Array.from(document.querySelectorAll<Element>('body *'))
        .map((element) => ({
          tag: element.tagName,
          className: element.getAttribute('class') ?? '',
          text: (element.textContent ?? '').trim().slice(0, 80),
          left: Math.round(element.getBoundingClientRect().left),
          right: Math.round(element.getBoundingClientRect().right),
          width: Math.round(element.getBoundingClientRect().width),
        }))
        .filter((item) => item.left < 0 || item.right > document.documentElement.clientWidth)
        .sort((a, b) => b.right - a.right)
        .slice(0, 12),
      internalOverflow: Array.from(document.querySelectorAll<HTMLElement>('body *'))
        .filter((element) => element.scrollWidth > element.clientWidth + 1)
        .map((element) => ({
          tag: element.tagName,
          className: element.getAttribute('class') ?? '',
          text: (element.textContent ?? '').trim().slice(0, 80),
          clientWidth: element.clientWidth,
          scrollWidth: element.scrollWidth,
          overflowX: getComputedStyle(element).overflowX,
        }))
        .sort((a, b) => b.scrollWidth - a.scrollWidth)
        .slice(0, 16),
    }));
    const foundationAxe = await new AxeBuilder({ page })
      .include('[data-testid="redline-calibration"]')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    await page.screenshot({
      path: `${runRoot}/screenshots/${viewport.directory}/foundations_${viewport.width}x${viewport.height}_redline-header_${timestamp}.png`,
      fullPage: false,
    });
    await page.getByRole('heading', { name: '04 / A1–A8 GLYPHS' }).scrollIntoViewIfNeeded();
    await page.screenshot({
      path: `${runRoot}/screenshots/${viewport.directory}/foundations_${viewport.width}x${viewport.height}_glyph-states_${timestamp}.png`,
      fullPage: false,
    });
    await page.getByRole('heading', { name: '07 / EVIDENCE ANATOMY' }).scrollIntoViewIfNeeded();
    await page.screenshot({
      path: `${runRoot}/screenshots/${viewport.directory}/foundations_${viewport.width}x${viewport.height}_evidence-anatomy_${timestamp}.png`,
      fullPage: false,
    });

    const serious = (violations: typeof storyAxe.violations) => violations
      .filter((violation) => violation.impact === 'critical' || violation.impact === 'serious')
      .map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        help: violation.help,
        nodes: violation.nodes.map((node) => ({
          target: node.target,
          html: node.html,
          failureSummary: node.failureSummary,
        })),
      }));
    results.push({
      viewport,
      story: { ...storyMetrics, blockingAxe: serious(storyAxe.violations) },
      atlas: { ...atlasMetrics, blockingAxe: serious(atlasAxe.violations) },
      foundation: { ...foundationMetrics, blockingAxe: serious(foundationAxe.violations) },
      focusOutline,
    });

  }

  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
  expect(failedRequests).toEqual([]);
  await writeFile(
    `${runRoot}/VISUAL_QA_RAW.json`,
    `${JSON.stringify({ results, consoleErrors, pageErrors, failedRequests }, null, 2)}\n`,
    'utf8',
  );
  for (const result of results) {
    const story = result.story as { clientWidth: number; scrollWidth: number; blockingAxe: unknown[] };
    const atlas = result.atlas as { clientWidth: number; scrollWidth: number; blockingAxe: unknown[] };
    const foundation = result.foundation as { clientWidth: number; scrollWidth: number; blockingAxe: unknown[] };
    expect(story.scrollWidth).toBe(story.clientWidth);
    expect(atlas.scrollWidth).toBe(atlas.clientWidth);
    expect(foundation.scrollWidth).toBe(foundation.clientWidth);
    expect(story.blockingAxe).toEqual([]);
    expect(atlas.blockingAxe).toEqual([]);
    expect(foundation.blockingAxe).toEqual([]);
  }
});
