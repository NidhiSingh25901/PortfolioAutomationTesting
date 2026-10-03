import { test, expect } from '@playwright/test';
import { PortfolioPage, sections } from '../pages/PortfolioPage';

test.describe('Desktop section navigation', () => {
  let portfolio: PortfolioPage;

  test.beforeEach(async ({ page }) => {
    portfolio = new PortfolioPage(page);
    await portfolio.goto();
  });

  test('shows all five navigation links on desktop', async () => {
    await expect(portfolio.menu).toBeVisible();
    await expect(portfolio.menu.getByRole('link')).toHaveCount(sections.length);
    await expect(portfolio.menuToggle).toBeHidden();
    for (const section of sections) {
      await expect(portfolio.link(section)).toBeVisible();
      await expect(portfolio.link(section)).toHaveAttribute('href', `#${section.id}`);
    }
  });

  for (const section of sections) {
    test(`${section.name} scrolls to the correct section`, async () => {
      await portfolio.navigateTo(section);
    });
  }

  test('can return to ABOUT after visiting CONTACT', async () => {
    await portfolio.navigateTo(sections[4]);
    await portfolio.navigateTo(sections[0]);
  });

  test('browser back and forward restore the selected section', async ({ page }) => {
    await portfolio.navigateTo(sections[1]);
    await portfolio.navigateTo(sections[2]);
    await page.goBack();
    await portfolio.expectSection(sections[1]);
    await page.goForward();
    await portfolio.expectSection(sections[2]);
  });
});
