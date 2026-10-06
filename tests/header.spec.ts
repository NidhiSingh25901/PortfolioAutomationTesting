import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../pages/PortfolioPage';

test.describe('Website Header Verification', () => {
  let portfolio: PortfolioPage;

  test.beforeEach(async ({ page }) => {
    portfolio = new PortfolioPage(page);
    await portfolio.goto();
  });

  test('TC_HDR_001: verify exact text match and responsive layout for header My Name is Nidhi Singh', async ({ page }) => {
    const headerLocator = page.locator('h1, header, .header, .brand').filter({ hasText: 'My Name is Nidhi Singh' }).first();
    await expect(headerLocator).toBeVisible();
    await expect(headerLocator).toHaveText('My Name is Nidhi Singh');

    await page.setViewportSize({ width: 375, height: 667 });
    await expect(headerLocator).toBeVisible();
    await expect(headerLocator).toHaveText('My Name is Nidhi Singh');

    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(headerLocator).toBeVisible();
    await expect(headerLocator).toHaveText('My Name is Nidhi Singh');
  });
});
