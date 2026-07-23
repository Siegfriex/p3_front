import { expect, test } from '@playwright/test';

test('production build excludes the calibration route and fails closed without an approved release', async ({ page }) => {
  await page.goto('/dev/foundations');
  await expect(page.getByTestId('foundations-page')).toHaveCount(0);
  await expect(page.getByText('요청한 기록을 찾을 수 없습니다')).toBeVisible();

  await page.goto('/atlas');
  await expect(page.getByTestId('atlas-data-unavailable')).toBeVisible();
  await expect(page.getByTestId('fixture-provenance')).toHaveCount(0);

  await page.goto('/#answers');
  await expect(page.getByTestId('story-atlas-data-unavailable')).toBeVisible();
  await expect(page.getByTestId('story-fixture-provenance')).toHaveCount(0);
});
