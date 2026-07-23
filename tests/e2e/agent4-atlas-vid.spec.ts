import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

async function blockingAxeViolations(page: Page) {
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  return result.violations.filter((violation) => violation.impact === 'critical' || violation.impact === 'serious');
}

test('Story VID keeps the 16-node core and updates a shallow dossier without opening Evidence', async ({ page }) => {
  await page.goto('/#answers');
  await expect(page.getByTestId('story-atlas-ready')).toBeVisible();
  await expect(page.locator('#answers [data-node-id]')).toHaveCount(16);
  await expect(page.getByTestId('story-selected-dossier')).toHaveCount(0);

  await page.locator('#answers #atlas-node-list button').first().click();
  await expect(page.getByTestId('story-selected-dossier')).toBeVisible();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('#answers [data-selection-ring="true"]')).toHaveCount(1);
});

test('Projection Method Lab exposes canonical UMAP and explicit unavailable method states', async ({ page }) => {
  await page.goto('/method/projection');
  await expect(page.getByTestId('projection-method-lab')).toBeVisible();
  await expect(page.getByTestId('atlas-chart').locator('[data-node-id]')).toHaveCount(140);

  const umapTab = page.getByRole('tab', { name: /UMAP 2D/ });
  await umapTab.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: /PCA ↔ UMAP/ })).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('.projection-mini-plot[data-method="umap"] [data-selection-ring="true"]')).toHaveCount(0);
  await expect(page.locator('.projection-mini-plot[data-method="pca"]')).toContainText('APPROVED PCA COORDINATES ABSENT');

  await page.getByRole('tab', { name: /PCA 2D/ }).click();
  await expect(page.getByRole('heading', { name: '승인된 PCA 2D projection이 없습니다' })).toBeVisible();

  await page.getByRole('tab', { name: /3D SHELL/ }).click();
  await expect(page.getByRole('heading', { name: '3D projection shell' })).toBeVisible();
  await expect(page.locator('canvas')).toHaveCount(0);
  await page.getByRole('button', { name: 'top' }).click();
  await expect(page.locator('.projection-3d-shell')).toHaveAttribute('data-preset', 'top');
  await expect(page.getByRole('link', { name: '2D canonical Atlas 열기' })).toHaveAttribute('href', '/atlas');

  await page.getByRole('tab', { name: /TENSOR/ }).click();
  await expect(page.getByRole('heading', { name: 'Tensor decomposition pipeline이 확인되지 않았습니다' })).toBeVisible();
  await expect(page.getByText('latent loading')).toBeVisible();
  expect(await blockingAxeViolations(page)).toEqual([]);
});

for (const viewport of [
  { width: 320, height: 800 },
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
]) {
  test(`Agent 4 Atlas VID has no page overflow at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: 'reduce' });

    for (const route of ['/#answers', '/atlas', '/method/projection']) {
      await page.goto(route);
      await expect(page.locator('main')).toBeVisible();
      const geometry = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(geometry.scrollWidth, `${route} overflow at ${viewport.width}`).toBe(geometry.clientWidth);
    }
  });
}

test('Method controls retain 44px targets and reduced motion removes 3D shell transition', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/method/projection');
  await page.getByRole('tab', { name: /3D SHELL/ }).click();

  const targets = page.locator('.projection-method-tabs button, .projection-3d-shell__controls button, .projection-method-lab__backlinks a');
  for (let index = 0; index < await targets.count(); index += 1) {
    const target = targets.nth(index);
    if (!(await target.isVisible())) continue;
    const box = await target.boundingBox();
    expect(box?.width, `target ${index} width`).toBeGreaterThanOrEqual(44);
    expect(box?.height, `target ${index} height`).toBeGreaterThanOrEqual(44);
  }

  const transitionDuration = await page.locator('.projection-3d-shell__cube').evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(Number.parseFloat(transitionDuration)).toBeLessThanOrEqual(0.00001);
});
