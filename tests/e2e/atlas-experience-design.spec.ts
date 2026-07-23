import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

async function blockingAxeViolations(page: Page) {
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  return result.violations.filter((violation) => violation.impact === 'critical' || violation.impact === 'serious');
}

test('Story Answers fails closed, carries URL filters to Explorer, and restores with Back', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?status=active&types=A1,A7&view=nodes#answers');
  const chapter = page.locator('#answers');
  await expect(chapter).toBeInViewport();
  await expect(page.getByTestId('story-atlas-data-unavailable')).toBeVisible();
  await expect(chapter.locator('[data-node-id]')).toHaveCount(0);
  await expect(chapter.getByText(/물리적 거리|질문 세분성|답변 수용성/)).toHaveCount(0);
  await expect(page.getByText(/CONTRACT_FIXTURE/)).toHaveCount(0);

  const explorerLink = page.getByRole('link', { name: '전체 답변행태 지도 보기' });
  await expect(explorerLink).toHaveAttribute('href', /\/atlas\?status=active&types=A1%2CA7&view=nodes/);
  await explorerLink.click();
  await expect(page).toHaveURL(/\/atlas\?status=active&types=A1%2CA7&view=nodes/);
  await expect(page.getByTestId('atlas-data-unavailable')).toBeVisible();
  await expect(page.locator('body > #root > div > footer')).toHaveCount(0);

  await page.goBack();
  await expect(page).toHaveURL(/status=active.*#answers/);
  await expect(page.getByTestId('story-atlas-data-unavailable')).toBeVisible();
});

for (const viewport of [
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
]) {
  test(`no-data design has no overflow or blocking Axe issue at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: 'reduce' });

    for (const route of ['/#answers', '/atlas']) {
      await page.goto(route);
      await expect(page.locator('main')).toBeVisible();
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
  const cta = page.getByRole('link', { name: '전체 답변행태 지도 보기' });
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
  await expect(page.getByRole('region', { name: 'Mock 데이터 스키마 가로 표' })).toHaveAttribute('tabindex', '0');
  await expect(footer).toHaveCount(0);

  await page.goto('/#record');
  await expect(page.getByRole('region', { name: '증거 사안 가로 선택 목록' })).toHaveAttribute('tabindex', '0');
  await page.goto('/#gap');
  await expect(page.getByRole('region', { name: '시정요구 처리 흐름 가로 도표' })).toHaveAttribute('tabindex', '0');
});
