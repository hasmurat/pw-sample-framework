import { expect, Locator, Page } from "@playwright/test";
import BasePage from "./base.page";

/**
 * LoginPage class that provides methods for interacting with the login page.
 */

export default class LoginPage extends BasePage {
  private emailInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private signUpButton: Locator;
  private loginSuccessMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByTestId("login-submit-button");
    this.signUpButton = page.getByRole("button", { name: "Sign Up" });
    this.loginSuccessMessage = page.getByText("Login Successful").first();
  }

  async login(email: string, password: string) {
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);

    await expect(this.loginSuccessMessage).toBeVisible(); // Assert that login success message is visible
    await expect(this.signUpButton).not.toBeVisible(); // Assert that Sign Up button is not visible after login
  }
}
