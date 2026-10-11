import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../pages/PortfolioPage';

test.describe('Website Header', () => {
  let portfolio: PortfolioPage;

  test.beforeEach(async ({ page }) => {
    portfolio = new PortfolioPage(page);
    await portfolio.goto();
  });

  test('displays the exact header text My Name is Nidhi Singh', async ({ page }) => {
    const headerLocator = page.locator('#section1, header, h1').filter({ hasText: 'My Name is Nidhi Singh' }).first();
    await expect(headerLocator).toBeVisible();
    await expect(headerLocator).toContainText('My Name is Nidhi Singh');
  });
});
