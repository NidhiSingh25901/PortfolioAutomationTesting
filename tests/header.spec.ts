import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../pages/PortfolioPage';

test.describe('Website Header Requirements', () => {
  let portfolio: PortfolioPage;

  test.beforeEach(async ({ page }) => {
    portfolio = new PortfolioPage(page);
    await portfolio.goto();
  });

  test('TC_HEADER_001: Verify header presence on the website', async ({ page }) => {
    const headerLocator = page.locator('text=My Name is Nidhi Singh');
    await expect(headerLocator.first()).toBeVisible();
  });

  test('TC_HEADER_002: Verify exact text match for the header', async ({ page }) => {
    const headerLocator = page.locator('text=My Name is Nidhi Singh');
    await expect(headerLocator.first()).toHaveText('My Name is Nidhi Singh');
  });
});
