import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

async function blockingAxeViolations(page: Page) {
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  return result.violations.filter((violation) => violation.impact === 'critical' || violation.impact === 'serious');
}

test('Story Answers renders the approved field and editorial anchors, carries URL filters to Explorer, and restores with Back', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#answers');
  const chapter = page.locator('#answers');
  await expect(chapter).toBeInViewport();
  await expect(page.getByTestId('story-atlas-ready')).toBeVisible();
  await expect(chapter.locator('[data-testid="atlas-chart"] [data-node-id]')).toHaveCount(140);
  await expect(chapter.locator('[data-editorial-anchor="true"]')).toHaveCount(16);
  await expect(chapter.locator('.atlas-node-navigator')).toHaveCount(140);
  await expect(page.getByTestId('story-selected-dossier')).toBeVisible();
  await expect(page.getByTestId('story-atlas-data-unavailable')).toHaveCount(0);
  await expect(chapter.getByText(/물리적 거리|질문 세분성|답변 수용성/)).toHaveCount(0);
  await expect(page.getByText(/CONTRACT_FIXTURE/)).toHaveCount(0);

  const stageBox = await chapter.getByTestId('atlas-chart').boundingBox();
  const dossierBox = await page.getByTestId('story-selected-dossier').boundingBox();
  expect(Boolean(stageBox && dossierBox && dossierBox.y >= stageBox.y + stageBox.height)).toBe(true);

  await page.goto('/?status=active&types=A2#answers');
  const explorerLink = page.getByRole('link', { name: '현재 필터로 전체 답변행태 지도 보기' });
  await expect(explorerLink).toHaveAttribute('href', /\/atlas\?status=active&types=A2/);
  await explorerLink.click();
  await expect(page).toHaveURL(/\/atlas\?status=active&types=A2/);
  await expect(page.getByTestId('atlas-chart')).toBeVisible();
  await expect(page.getByTestId('atlas-data-unavailable')).toHaveCount(0);
  await expect(page.locator('body > #root > div > footer')).toHaveCount(0);

  await page.goBack();
  await expect(page).toHaveURL(/status=active.*#answers/);
  await expect(page.getByTestId('story-atlas-ready')).toBeVisible();
});

for (const viewport of [
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
]) {
  test(`real-data Atlas surfaces have no overflow or blocking Axe issue at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: 'reduce' });

    for (const route of ['/#answers', '/atlas']) {
      await page.goto(route);
      await expect(page.locator('main')).toBeVisible();
      await expect(page.getByTestId(route === '/#answers' ? 'story-atlas-ready' : 'atlas-chart')).toBeVisible();
      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        offenders: [...document.querySelectorAll<HTMLElement>('body *')]
          .filter((element) => element.getBoundingClientRect().right > document.documentElement.clientWidth + 0.5)
          .slice(0, 8)
          .map((element) => ({ tag: element.tagName, className: element.className, right: element.getBoundingClientRect().right })),
      }));
      expect(overflow, `${route} overflow ${JSON.stringify(overflow)}`).toEqual(expect.objectContaining({ scrollWidth: overflow.clientWidth }));
      expect(await blockingAxeViolations(page)).toEqual([]);
    }
  });
}

test('CTA contrast, fixed rail hit area, footer scope, and scroll regions are explicit', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/#answers');
  const cta = page.getByRole('link', { name: '현재 필터로 전체 답변행태 지도 보기' });
  await cta.scrollIntoViewIfNeeded();
  const colors = await cta.evaluate((element) => {
    const style = getComputedStyle(element);
    return { color: style.color, background: style.backgroundColor };
  });
  expect(colors.color).not.toBe(colors.background);
  await expect(page.getByRole('complementary', { name: '에세이 챕터 내비게이션' })).toBeHidden();

  const footer = page.locator('body > #root > div > footer');
  await expect(footer).toBeVisible();
  const ctaBox = await cta.boundingBox();
  const footerBox = await footer.boundingBox();
  expect(Boolean(ctaBox && footerBox && ctaBox.y + ctaBox.height > footerBox.y)).toBe(false);

  await page.goto('/data');
  await expect(page.getByTestId('data-release-ready')).toBeVisible();
  await expect(page.getByRole('region', { name: '핵심 엔터티 계약 표' })).toHaveAttribute('tabindex', '0');
  await expect(footer).toHaveCount(0);

  await page.goto('/#record');
  await expect(page.getByRole('heading', { name: /조치 완료.*반복된 사망사고/ })).toBeVisible();
  await expect(page.getByTestId('story-record-data-unavailable')).toHaveCount(0);
  await page.goto('/#gap');
  await expect(page.getByRole('heading', { name: /완료와 진행.*그 사이를 묻다/ })).toBeVisible();
  await expect(page.getByTestId('approved-status-distribution').locator('article')).toHaveCount(3);
  await expect(page.getByTestId('story-gap-data-unavailable')).toHaveCount(0);
});
