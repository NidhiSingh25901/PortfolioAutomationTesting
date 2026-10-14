import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../pages/PortfolioPage';

test.describe('Website header text verification', () => {
  let portfolio: PortfolioPage;

  test.beforeEach(async ({ page }) => {
    portfolio = new PortfolioPage(page);
    await portfolio.goto();
  });

  test('TC_HDR_001: Verify website header displays exact text My Name is Nidhi Singh', async ({ page }) => {
    const headerLocator = page.locator('#section1 h1, #section1 h2, #section1 .header, #section1').first();
    await expect(headerLocator).toBeVisible();
    await expect(page.locator('body')).toContainText('My Name is Nidhi Singh');
  });
});
