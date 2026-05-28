import { expect, Locator, Page } from "@playwright/test";
import BasePage from "./base.page";


/**
 * Description: ContactPage class that represents the contact page of the application.
 * It extends the BasePage class and provides methods to interact with the contact page, such as tracking an order by filling in the order ID and email address.
 */
export default class ContactPage extends BasePage {
    private orderIDInput: Locator;
    private emailInput: Locator;
    private trackOrderButton: Locator;

    constructor(page: Page) {
        super(page);
        this.orderIDInput = page.getByRole('textbox', { name: 'Order ID' });
        this.emailInput = page.getByRole('textbox', { name: 'Email Address' });
        this.trackOrderButton = page.getByRole('button', { name: 'Track Order' });
    }

    async trackOrder(orderID: string, email: string) {
        await this.fill(this.orderIDInput, orderID);
        await this.fill(this.emailInput, email);
        await this.click(this.trackOrderButton);
    }


}