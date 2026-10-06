import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../pages/PortfolioPage';

test.describe('Website Header Verification', () => {
  let portfolio: PortfolioPage;

  test.beforeEach(async ({ page }) => {
    portfolio = new PortfolioPage(page);
    await portfolio.goto();
  });

  test('TC_HEADER_001: Verify website header displays the exact text My Name is Nidhi Singh', async ({ page }) => {
    const headerLocator = page.locator('header, h1, .navbar, nav').filter({ hasText: 'My Name is Nidhi Singh' }).first();
    await expect(headerLocator).toBeVisible();
    await expect(headerLocator).toContainText('My Name is Nidhi Singh');
  });

  test('TC_HEADER_002: Verify header appearance and responsiveness across different viewports', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 768, height: 1024 },
      { width: 375, height: 667 }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      const headerLocator = page.locator('header, h1, .navbar, nav').filter({ hasText: 'My Name is Nidhi Singh' }).first();
      await expect(headerLocator).toBeVisible();
    }
  });
});
