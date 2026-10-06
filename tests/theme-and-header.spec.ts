import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../pages/PortfolioPage';

test.describe('Website theme and header verification', () => {
  let portfolio: PortfolioPage;

  test.beforeEach(async ({ page }) => {
    portfolio = new PortfolioPage(page);
    await portfolio.goto();
  });

  test('TC_MISSING_001: Verify website color theme is olive green', async ({ page }) => {
    const bodyElement = page.locator('body');
    await expect(bodyElement).toBeVisible();
    const backgroundColor = await bodyElement.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    expect(backgroundColor).toBeTruthy();
  });

  test('TC_MISSING_002: Verify header is present and displays exact text My Name is Nidhi Singh', async ({ page }) => {
    const headerLocator = page.locator('h1, h2, header').filter({ hasText: 'My Name is Nidhi Singh' }).first();
    await expect(headerLocator).toBeVisible();
    await expect(headerLocator).toHaveText('My Name is Nidhi Singh');
  });
});
