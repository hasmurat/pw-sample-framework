import { Page } from '@playwright/test';
import LoginPage from './login.page';

/**
 * Description: PageManager class that manages all page objects and provides access to them.
 * This class can be used in tests to access different page objects and their methods.
 */
export default class PageManager {
    private readonly page: Page;
    private readonly loginPage: LoginPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

}