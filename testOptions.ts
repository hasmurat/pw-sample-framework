import { test as base, expect } from '@playwright/test';
import PageManager from './pages/pageManager.page';
import PayloadManager from './payloads/payloadManager.payload';

/**
 * Description: This file defines custom test options and fixtures for Playwright tests.
 */
export type TestOptions = {
    pageManager: PageManager;
    apiURL: string;
    payloadManager: PayloadManager;
}

export const test = base.extend<TestOptions>({
    pageManager: async ({ page }, use) => {
        const pageManager = new PageManager(page);
        await use(pageManager);
    },

    apiURL: ['', {option: true}],

    payloadManager: async ({ request }, use) => {
        const payloadManager = new PayloadManager(request);
        await use(payloadManager);
    }
});