import { expect, type Locator, type Page } from '@playwright/test';

export const sections = [
  { name: 'ABOUT', id: 'section1', heading: 'Welcome to my Portfolio Website' },
  { name: 'EDUCATION', id: 'section2', heading: 'EDUCATION' },
  { name: 'SKILLS', id: 'section3', heading: 'SKILLS' },
  { name: 'WORKS', id: 'section4', heading: 'WORKS' },
  { name: 'CONTACT', id: 'section5', heading: 'CONTACT' },
] as const;

export type Section = (typeof sections)[number];

export class PortfolioPage {
  readonly menu: Locator;
  readonly menuToggle: Locator;

  constructor(readonly page: Page) {
    this.menu = page.locator('#link');
    // The site's icon-only hamburger has no accessible name.
    this.menuToggle = page.locator('.navbar a.icon');
  }

  async goto() {
    const response = await this.page.goto('./', { waitUntil: 'domcontentloaded' });
    expect(response?.ok(), 'The portfolio should load successfully').toBeTruthy();
    await expect(this.page).toHaveTitle('Nidhi Singh');
    await expect.poll(() => this.page.locator('link[href="style.css"]').evaluate(
      (element: HTMLLinkElement) => element.sheet !== null,
    ), { message: 'The navigation stylesheet should finish loading' }).toBe(true);
  }

  link(section: Section) {
    return this.menu.getByRole('link', { name: section.name, exact: true });
  }

  async navigateTo(section: Section) {
    await expect(this.link(section)).toHaveAttribute('href', `#${section.id}`);
    await this.link(section).click();
    await this.expectSection(section);
  }

  async expectSection(section: Section) {
    await expect(this.page).toHaveURL(new RegExp(`#${section.id}$`));
    const target = this.page.locator(`#${section.id}`);
    await expect(target).toBeInViewport({ ratio: 0.5 });
    await expect(target.getByRole('heading', { name: section.heading, exact: true }))
      .toBeInViewport();
  }
}
