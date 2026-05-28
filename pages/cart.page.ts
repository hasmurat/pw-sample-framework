import { expect, Locator, Page } from "@playwright/test";
import BasePage from "./base.page";


/**
 * Description: CartPage class that represents the cart page of the application.
 * It extends the BasePage class and provides methods to interact with the cart page, such as asserting that a product is in the cart, getting the subtotal price, and clicking the proceed to checkout button. 
 */
export default class CartPage extends BasePage {
  private subTotal: Locator;
  private chartButton: Locator;
  private proceedToCheckout: Locator;

  constructor(page: Page) {
    super(page);
    this.subTotal = page
      .getByText("Subtotal")
      .locator("..")
      .locator(".font-semibold");
    this.chartButton = page.getByRole("button", { name: "1" });

    this.proceedToCheckout = page.getByRole("button", {
      name: "Proceed to Checkout",
    });
  }

  async clickCartButton() {
    await this.click(this.chartButton);
  }

  async assertProductInCart(productName: string) {
    const product = this.getPage().getByRole("heading", {
      name: productName,
    });
    await expect(product).toBeVisible();
  }

  async getSubTotal(): Promise<string> {
    return (await this.subTotal.textContent()) || "";
  }

  async clickProceedToCheckout() {
    await this.click(this.proceedToCheckout);
  }
}
