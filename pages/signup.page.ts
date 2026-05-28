import { expect, Locator, Page } from "@playwright/test";
import BasePage from "./base.page";

export default class SignupPage extends BasePage {
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private createAccountButton: Locator;
  private codeInput: Locator;
  private confirmCodeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.getByRole("textbox", { name: "First name" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last name" });
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.createAccountButton = page.getByRole("button", {
      name: "Create an account",
    });
    this.codeInput = page.locator('input[inputmode="numeric"]');
    this.confirmCodeButton = page.getByRole("button", {
      name: "Confirm Account",
    });
  }

  async fillSignupForm(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.click(this.createAccountButton);
  }

  async fillVerificationCode(code: string) {
    await this.fill(this.codeInput, code);
    await this.click(this.confirmCodeButton);
  }
}
