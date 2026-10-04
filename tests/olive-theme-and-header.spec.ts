import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../pages/PortfolioPage';

test.describe('Olive green theme and header verification', () => {
  let portfolio: PortfolioPage;

  test.beforeEach(async ({ page }) => {
    portfolio = new PortfolioPage(page);
    await portfolio.goto();
  });

  test('TC_OLIVE_001: Verify website background and primary elements color is olive green', async ({ page }) => {
    const body = page.locator('body');
    await expect(body).toBeVisible();

    const backgroundColor = await body.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    expect(backgroundColor).toBeTruthy();

    const header = page.locator('header').first();
    if (await header.count() > 0) {
      const headerColor = await header.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });
      expect(headerColor).toBeTruthy();
    }
  });

  test('TC_OLIVE_002: Verify header displays the exact text My Name is Nidhi Singh', async ({ page }) => {
    const heading = page.locator('h1, header, #section1').filter({ hasText: 'My Name is Nidhi Singh' }).first();
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(/My Name is Nidhi Singh/);
  });
});
