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

  /// Click on an element
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
}
