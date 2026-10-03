import { test, expect } from '@playwright/test';
import { PortfolioPage, sections } from '../pages/PortfolioPage';

test.describe('Mobile section navigation', () => {
  let portfolio: PortfolioPage;

  test.beforeEach(async ({ page }) => {
    portfolio = new PortfolioPage(page);
    await portfolio.goto();
  });

  test('hamburger opens, closes, and reopens the menu', async () => {
    await expect(portfolio.menu).toBeHidden();
    await expect(portfolio.menuToggle).toBeVisible();
    await portfolio.menuToggle.click();
    await expect(portfolio.menu).toBeVisible();
    for (const section of sections) {
      await expect(portfolio.link(section)).toBeVisible();
    }
    await portfolio.menuToggle.click();
    await expect(portfolio.menu).toBeHidden();
    await portfolio.menuToggle.click();
    await expect(portfolio.menu).toBeVisible();
  });

  for (const section of sections) {
    test(`${section.name} navigates from the expanded mobile menu`, async () => {
      await portfolio.menuToggle.click();
      await expect(portfolio.menu).toBeVisible();
      await portfolio.navigateTo(section);
    });
  }
});
