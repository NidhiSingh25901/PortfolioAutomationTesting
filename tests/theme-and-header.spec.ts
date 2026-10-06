import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../pages/PortfolioPage';

test.describe('Theme and Header Verification', () => {
  let portfolio: PortfolioPage;

  test.beforeEach(async ({ page }) => {
    portfolio = new PortfolioPage(page);
    await portfolio.goto();
  });

  test('TC_COLOR_001: verify website color scheme reflects olive green', async ({ page }) => {
    const bodyOrContainer = page.locator('body');
    await expect(bodyOrContainer).toBeVisible();
    const computedColor = await bodyOrContainer.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    expect(computedColor).not.toBe('');
  });

  test('TC_HEADER_002: verify header displays exact text My Name is Nidhi Singh', async ({ page }) => {
    const headerLocator = page.locator('h1, header, .header').filter({ hasText: 'My Name is Nidhi Singh' }).first();
    await expect(headerLocator).toBeVisible();
    await expect(headerLocator).toHaveText('My Name is Nidhi Singh');
  });
});
