import { Page } from '@playwright/test';
import LoginPage from './login.page';
import ProductsPage from './products.page';
import CartPage from './cart.page';
import CheckoutPage from './checkout.page';
import ContactPage from './contact.page';
import SignupPage from './signup.page';

/**
 * Description: PageManager class that manages all page objects and provides access to them.
 * This class can be used in tests to access different page objects and their methods.
 */
export default class PageManager {
    private readonly page: Page;
    private readonly loginPage: LoginPage;
    private readonly productsPage: ProductsPage;
    private readonly cartPage: CartPage;
    private readonly checkoutPage: CheckoutPage;
    private readonly contactPage: ContactPage;
    private readonly signupPage: SignupPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.productsPage = new ProductsPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.contactPage = new ContactPage(this.page);
        this.signupPage = new SignupPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getProductsPage() {
        return this.productsPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }
    
    getContactPage() {
        return this.contactPage;
    }

    getSignupPage() {
        return this.signupPage;
    }

}