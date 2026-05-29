import { test as base, expect } from '@playwright/test';
import PageManager from './pages/pageManager.page';

/**
 * Description: This file defines custom test options and fixtures for Playwright tests.
 */
export type TestOptions = {
    pageManager: PageManager;
    apiURL: string;
}

export const test = base.extend<TestOptions>({
    pageManager: async ({ page }, use) => {
        const pageManager = new PageManager(page);
        await use(pageManager);
    },

    apiURL: ['', {option: true}],
});