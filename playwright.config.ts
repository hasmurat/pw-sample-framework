import { defineConfig, devices } from "@playwright/test";
import type { TestOptions } from "./testOptions";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig<TestOptions>({
  testDir: "./tests",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html"],
    ['json', { outputFile: "playwright-report/test-results.json" }],
    ['junit', { outputFile: "playwright-report/test-results.xml" }],
    ["allure-playwright"],
  ],

  use: {
    baseURL: "https://valentinos-magic-beans.click/",
    apiURL: "",
    testIdAttribute: "data-test-id",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },

  projects: [
    {
      name: "setup",
      testDir: "./setup",
      testMatch: /.*\.setup\.ts/,
    },

    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json", // Use the authenticated state for tests
      },
      dependencies: ['setup'],
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
