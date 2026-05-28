import { expect, Locator, Page } from "@playwright/test";
import BasePage from "./base.page";

/**
 * Description: CheckoutPage class that represents the checkout page of the application.
 * It extends the BasePage class and provides methods to interact with the checkout page, such as filling in shipping address and payment details, verifying email address, clicking the place order button, and getting the order ID from the confirmation page.
 */

export default class CheckoutPage extends BasePage {

 private addressInput: Locator;
 private cityInput: Locator;
 private postalCodeInput: Locator;
 private countryInput: Locator;
 private cardNameInput: Locator;
 private cardNumberInput: Locator;
 private cardExpiryInput: Locator;
 private cardCVCInput: Locator;
 private placeOrderButton: Locator;
 private emailInput: Locator;


    constructor(page: Page) {
        super(page);
        this.addressInput = page.locator('[data-test-id="checkout-address-input"]');
        this.cityInput = page.locator('[data-test-id="checkout-city-input"]');
        this.postalCodeInput = page.locator('[data-test-id="checkout-zipcode-input"]');
        this.countryInput = page.locator('[data-test-id="checkout-country-input"]');
        this.cardNameInput = page.locator('[data-test-id="checkout-cardname-input"]');
        this.cardNumberInput = page.locator('[data-test-id="checkout-cardnumber-input"]');
        this.cardExpiryInput = page.locator('[data-test-id="checkout-cardexpiry-input"]');
        this.cardCVCInput = page.locator('[data-test-id="checkout-cardcvc-input"]');
        this.placeOrderButton = page.locator('[data-test-id="place-order-button"]');
        this.emailInput = page.locator('[data-test-id="checkout-email-input"]');
    }

    async fillShippingAddress(address: string, city: string, postalCode: string, country: string) {
        await this.fill(this.addressInput, address);
        await this.fill(this.cityInput, city);
        await this.fill(this.postalCodeInput, postalCode);
        await this.fill(this.countryInput, country);
    }

    async fillPaymentDetails(cardName: string, cardNumber: string, cardExpiry: string, cardCVC: string) {
        await this.fill(this.cardNameInput, cardName);
        await this.fill(this.cardNumberInput, cardNumber);
        await this.fill(this.cardExpiryInput, cardExpiry);
        await this.fill(this.cardCVCInput, cardCVC);
    }

    async verifyEmailAddress(email=process.env.EMAIL_ADDRESS || "") { 
        await expect(this.emailInput).toHaveValue(email);
    }


    async clickPlaceOrder() {
        await this.click(this.placeOrderButton);
        await this.getPage().waitForURL("/order-confirmation");
        await expect (this.getPage().getByRole("heading", { name: "Order Confirmed!" })).toBeVisible();
    }

    async getOrderID(): Promise<string> {
        const orderWrapper = this.getPage().getByText('Your Order ID is:').locator('..')
        return await orderWrapper.getByRole('paragraph').nth(1).textContent() || '';
    }

}