import { expect, Locator, Page } from "@playwright/test";
import BasePage from "./base.page";

/**
 * Description: ProductsPage class that represents the products page of the application. 
 * It extends the BasePage class and provides methods to interact with the products page, such as adding products to the cart and getting product prices.
 */
export default class ProductsPage extends BasePage {
    private productList: Locator;

    constructor(page: Page) {
        super(page);
        this.productList = page.locator('.p-6');
    }

    async addProductToCart(productName: string) {
        await this.productList.filter({ hasText: productName }).getByRole('button', { name: 'Add to Cart' }).click();
        await this.getPage().getByText(`${productName} is now in your cart.`).first().waitFor({ state: 'visible' });
    }

    async getProductPrice(productName: string): Promise<string> {
        const priceLocator = this.productList.filter({ hasText: productName }).locator('span').first();
        return await priceLocator.textContent() || '';
    }
    
}