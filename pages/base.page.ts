import { expect, Locator, Page } from "@playwright/test";

/**
 * Description: BasePage class that provides common methods for all page objects.
 * This class can be extended by specific page classes to inherit these common methods.
 */
export default class BasePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to a specific path
  async navigateTo(path = "") {
    await this.page.goto(path);
  }

  async navigateToPage(pageName: "Home" | "Shop" | "Contact") {
    await this.page.getByRole("link", { name: pageName }).click();

    const pageTextByName = {
      Home: "Valentino's Magic Beans",
      Shop: "Our Coffee Collection",
      Contact: "Contact Us & Track Your Order",
    } as const;

    await expect(
      this.page.getByText(pageTextByName[pageName], { exact: true }),
    ).toBeVisible();
  }

  // Click on an element
  async click(locator: Locator) {
    await locator.click();
  }

  // Fill an input field
  async fill(locator: Locator, value: string) {
    await locator.fill(value);
  }

  // Wait for a specific timeout
  async waitForTimeout(timeout: number) {
    await this.page.waitForTimeout(timeout);
  }

  // Wait for a specific URL
  async waitForURL(path = "") {
    await this.page.waitForURL(path);
  }

  async waitForSelector(selector: string) {
    await this.page.waitForSelector(selector);
  }

  async getText(locator: Locator) {
    return await locator.textContent();
  }

  async clickProfileIcon() {
    await this.page.getByRole("button").nth(1).click();
  }

  async logout() {
    this.clickProfileIcon();
    await this.page.getByRole("menuitem", { name: "Log out" }).click();
    await this.waitForSelector('[data-test-id="header-login-button-desktop"]'); // Wait for Login button to appear after logout
  }

}
