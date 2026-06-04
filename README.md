# Playwright Sample Framework

A comprehensive end-to-end (E2E) test automation framework built with **Playwright** and **TypeScript**, implementing the **Page Object Model (POM)** pattern with support for multiple environments, fixtures, and advanced reporting.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Page Object Model (POM)](#page-object-model-pom)
- [Running Tests](#running-tests)
- [Test Organization](#test-organization)
- [Fixtures & Custom Test Options](#fixtures--custom-test-options)
- [Test Data Management](#test-data-management)
- [Utilities](#utilities)
- [Authentication & Setup](#authentication--setup)
- [Reporting](#reporting)
- [Environment Management](#environment-management)
- [CI/CD Workflow](#cicd-workflow)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## 📖 Overview

This framework provides a scalable, maintainable testing solution for web application testing with:

- **Playwright**: Fast, reliable browser automation with support for Chromium, Firefox, and WebKit
- **TypeScript**: Type-safe test development with better IDE support and code completion
- **Page Object Model**: Encapsulation of page elements and interactions for maintainable tests
- **Allure Reporting**: Beautiful HTML reports with detailed test metrics
- **Multi-Environment Support**: Seamless testing across local, staging, preprod, and production environments
- **Authenticated Sessions**: Efficient test execution using stored authentication state
- **Test Data Management**: Centralized test data loading and management
- **Email Verification**: Integration with MailSlurp for email-based testing workflows

## ✨ Features

- ✅ **Page Object Model (POM)** - Organized, maintainable test structure
- ✅ **Custom Fixtures** - Centralized PageManager for easy page access
- ✅ **Multiple Environments** - Support for local, staging, preprod, and production
- ✅ **Parallel Execution** - Run tests in parallel for faster feedback
- ✅ **Authentication Caching** - Store and reuse authenticated sessions
- ✅ **Multiple Reporters** - HTML, JSON, JUnit XML, and Allure reports
- ✅ **Test Tagging** - Organize tests with @smoke, @regression tags
- ✅ **Retry Logic** - Automatic retry on CI environments
- ✅ **Video & Screenshot Capture** - Automatic capture on test failures
- ✅ **Email Integration** - MailSlurp support for email verification
- ✅ **TypeScript Support** - Full type safety and IDE autocomplete

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (v7 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/hasmurat/pw-sample-framework.git
cd pw-sample-framework
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- `@playwright/test` - Playwright testing framework
- `@types/node` - TypeScript definitions for Node.js
- `allure-playwright` - Allure reporting integration
- `cross-env` - Cross-platform environment variable management
- `dotenv` - Environment variable loader
- `mailslurp-client` - Email verification service
- `rimraf` - Cross-platform file deletion

### 3. Install Playwright Browsers

```bash
npx playwright install
```

### 4. Configure Environment Variables

Copy the example environment file and update it with your values:

```bash
cp .env.example .env
```

Edit `.env` and populate with your configuration:

```env
EMAIL_ADDRESS=your-test-email@example.com
PASSWORD=your-test-password
MAILSLURP_API_KEY=your-mailslurp-api-key
MAILSLURP_INBOX_ID=your-mailslurp-inbox-id
SIGN_UP_FLOW=false
BASE_URL=https://valentinos-magic-beans.click/
API_URL=
```

## 📁 Project Structure

```
pw-sample-framework/
├── pages/                          # Page Object Models
│   ├── base.page.ts               # Base class with common methods
│   ├── login.page.ts              # Login page object
│   ├── products.page.ts           # Products page object
│   ├── cart.page.ts               # Cart page object
│   ├── checkout.page.ts           # Checkout page object
│   ├── contact.page.ts            # Contact page object
│   ├── signup.page.ts             # Signup page object
│   └── pageManager.page.ts        # PageManager fixture
│
├── tests/                          # Test files
│   ├── ui-test/                   # UI tests
│   │   ├── login.spec.ts          # Login tests
│   │   ├── signup.spec.ts         # Signup tests
│   │   └── order-flow.spec.ts     # Order flow tests
│   └── api-test/                  # API tests (structure ready)
│
├── setup/                          # Test setup & teardown
│   └── auth.setup.ts              # Authentication setup
│
├── utils/                          # Utility functions
│   ├── dataLoader.ts              # Test data loading utility
│   └── emailUtils.ts              # Email verification utility
│
├── test-data/                      # Test data files
│   ├── checkOutData.json          # Checkout test data
│   └── signupData.json            # Signup test data
│
├── playwright/                     # Playwright configuration
│   ├── .auth/                     # Authenticated session storage
│   │   └── user.json              # Stored authentication state
│   └── [other config files]
│
├── playwright-report/              # Test reports
│   ├── index.html                 # HTML report
│   ├── test-results.json          # JSON report
│   └── test-results.xml           # JUnit XML report
│
├── allure-results/                # Allure report data
│   └── [report artifacts]
│
├── playwright.config.ts            # Playwright configuration
├── testOptions.ts                  # Custom fixtures & test options
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Project dependencies
└── README.md                        # This file
```

## ⚙️ Configuration

### Playwright Configuration (`playwright.config.ts`)

The framework is configured to:

- **Test Directory**: `./tests` - Where test files are located
- **Workers**: Unlimited on local, 1 on CI (for stability)
- **Retries**: 0 on local, 2 on CI
- **Fully Parallel**: Tests run in parallel across workers
- **Base URL**: Configurable per environment
- **Test ID Attribute**: `data-test-id` - For locating elements

### Key Configuration Features

```typescript
use: {
  baseURL,              // Configurable application URL
  apiURL,               // API endpoint URL
  testIdAttribute: "data-test-id",  // Test ID locator strategy
  screenshot: "only-on-failure",    // Capture screenshots on failure
  video: "retain-on-failure",       // Record videos on failure
  trace: "retain-on-failure",       // Record execution traces on failure
}
```

### Environment-Specific Configuration

The framework supports multiple environment files:

- `.env` - Local environment (default)
- `.env.staging` - Staging environment
- `.env.preprod` - Pre-production environment
- `.env.prod` - Production environment

Set the environment:

```bash
# Local (default)
npm test

# Staging
npm run test:staging

# Pre-production
npm run test:preprod

# Production
npm run test:prod
```

## 🏗️ Page Object Model (POM)

### Architecture

The framework implements the Page Object Model pattern to:

- Encapsulate page elements and interactions
- Reduce code duplication
- Improve test maintainability
- Make tests more readable

### Base Page Class

All page objects extend `BasePage` which provides common functionality:

```typescript
// pages/base.page.ts
export default class BasePage {
  async navigateTo(path = "") // Navigate to a path
  async navigateToPage(pageName)  // Navigate via UI navigation
  async click(locator)            // Click an element
  async fill(locator, value)      // Fill input field
  async getText(locator)          // Get element text
  async waitForURL(path)          // Wait for URL
  async waitForSelector(selector) // Wait for selector
  async logout()                  // Logout functionality
  // ... and more
}
```

### Example Page Object

```typescript
// pages/login.page.ts
export default class LoginPage extends BasePage {
  private emailInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private loginSuccessMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByTestId("login-submit-button");
    this.loginSuccessMessage = page.getByText("Login Successful").first();
  }

  async login(email: string, password: string) {
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
    await expect(this.loginSuccessMessage).toBeVisible();
  }
}
```

### PageManager

The `PageManager` class provides centralized access to all page objects:

```typescript
// pages/pageManager.page.ts
export default class PageManager {
  getLoginPage()    // Get LoginPage instance
  getProductsPage() // Get ProductsPage instance
  getCartPage()     // Get CartPage instance
  getCheckoutPage() // Get CheckoutPage instance
  getContactPage()  // Get ContactPage instance
  getSignupPage()   // Get SignupPage instance
}
```

## 🧪 Running Tests

### Basic Test Commands

```bash
# Run all tests (default browser: Chromium)
npm test

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests with headed browser (see browser)
npx playwright test --headed

# Run specific test file
npx playwright test tests/ui-test/login.spec.ts

# Run tests matching a pattern
npx playwright test --grep "login"
```

### Environment-Specific Tests

```bash
# Run all tests in staging environment
npm run test:staging

# Run smoke tests in preprod
npm run test:preprod:smoke

# Run regression tests in production
npm run test:prod:regression

# Run tests with UI in staging
npm run test:staging:ui
```

### Test Filtering

```bash
# Run only smoke tests
npm run test:smoke

# Run only regression tests
npm run test:regression

# Run tests matching a specific tag and environment
npm run test:staging:regression

# Run specific test by name
npx playwright test -g "As a user, I should be able to login"
```

### Advanced Options

```bash
# Run tests in debug mode
npx playwright test --debug

# Run tests with specific number of workers
npx playwright test --workers=4

# Run tests with full parallelization
npx playwright test --workers=auto

# Disable retries
npx playwright test --retries=0

# Generate trace for all tests
npx playwright test --trace=on

# Generate trace only on failure
npx playwright test --trace=on-first-retry
```

## 🏷️ Test Organization

### Test Tags

Tests are organized using tags for easy filtering:

```typescript
test(
  "description",
  { tag: ["@smoke", "@regression"] },
  async ({ pageManager }) => {
    // test code
  }
);
```

### Available Tags

- `@smoke` - Quick sanity tests
- `@regression` - Full regression suite

### Running Tagged Tests

```bash
# Run only smoke tests
npm run test:smoke

# Run only regression tests
npm run test:regression

# Run smoke tests in staging
npm run test:staging:smoke
```

## 🔧 Fixtures & Custom Test Options

### Fixture Definition (`testOptions.ts`)

Custom fixtures provide centralized access to page objects and configuration:

```typescript
export type TestOptions = {
  pageManager: PageManager;  // Access all page objects
  apiURL: string;            // API endpoint URL
}

export const test = base.extend<TestOptions>({
  pageManager: async ({ page }, use) => {
    const pageManager = new PageManager(page);
    await use(pageManager);
  },

  apiURL: ['', { option: true }],
});
```

### Using Fixtures in Tests

```typescript
test("test name", async ({ pageManager, apiURL }) => {
  // pageManager automatically provided with all pages
  await pageManager.getLoginPage().navigateTo("login");
  
  // apiURL available for API testing
  console.log(apiURL);
});
```

## 📊 Test Data Management

### Test Data Structure

Test data is organized in JSON files within the `test-data/` directory:

```json
// test-data/signupData.json
{
  "validUser": {
    "email": "user@example.com",
    "password": "SecurePassword123!"
  }
}
```

### Loading Test Data

Use the `getTestData` utility to load test data:

```typescript
import { getTestData } from "../../utils/dataLoader";

test("signup test", async ({ pageManager }) => {
  const signupData = getTestData("signupData");
  await pageManager.getSignupPage().signup(signupData.validUser);
});
```

## 🛠️ Utilities

### Data Loader Utility

```typescript
// utils/dataLoader.ts
export function getTestData(fileName: string)
```

**Usage:**
```typescript
const data = getTestData("checkOutData");
// Returns parsed JSON from test-data/checkOutData.json
```

### Email Utility

Integrate with MailSlurp for email verification:

```typescript
// utils/emailUtils.ts
export async function getLatestEmail()
```

**Usage:**
```typescript
import { getLatestEmail } from "../../utils/emailUtils";

test("email verification", async () => {
  const email = await getLatestEmail();
  expect(email.subject).toContain("Verification");
});
```

**Requirements:**
- Set `MAILSLURP_API_KEY` in environment variables
- Set `MAILSLURP_INBOX_ID` in environment variables

## 🔐 Authentication & Setup

### Auth Setup File (`setup/auth.setup.ts`)

The authentication setup runs before tests to create a reusable authenticated session:

```typescript
setup("authentication", async ({ pageManager }) => {
  // Navigate to login page
  await pageManager.getLoginPage().navigateTo("login");
  
  // Perform login
  await pageManager
    .getLoginPage()
    .login(process.env.EMAIL_ADDRESS!, process.env.PASSWORD!);

  // Save authenticated state
  const browserPage = pageManager.getProductsPage().getPage();
  await browserPage.context().storageState({ path: authFile });
});
```

### How Authentication Works

1. **Setup Project**: A special "setup" project runs first
2. **Login**: The setup step logs in with test credentials
3. **State Saved**: Authenticated session saved to `playwright/.auth/user.json`
4. **Reused**: All tests load this authenticated state
5. **No Repeat Login**: Tests can start directly on authenticated pages

### Benefits

- ✅ Faster test execution (no login per test)
- ✅ Reduced load on authentication service
- ✅ More realistic user flows
- ✅ Easier debugging (skip login steps)

### Bypassing Authentication

For tests that need a fresh session (e.g., login tests):

```typescript
import { test } from "../../testOptions";

test.use({ storageState: { cookies: [], origins: [] } });

test("login test", async ({ pageManager }) => {
  // Runs without authenticated state
  await pageManager.getLoginPage().navigateTo("login");
  // ... login test code
});
```

## 📋 Reporting

### Available Reports

The framework generates multiple report formats:

#### 1. HTML Report

```bash
# Generated automatically after test run
# Location: playwright-report/index.html

# Open in browser (after test run)
npx playwright show-report
```

**Features:**
- Test execution timeline
- Detailed test results
- Screenshots and videos
- Trace viewer for debugging

#### 2. Allure Report

```bash
# Generate Allure report
npm run report:allure:generate

# Generate and open Allure report
npm run report:allure
```

**Features:**
- Beautiful dashboard
- Test statistics
- Timeline view
- History tracking
- Test execution graphs

#### 3. JSON Report

**Location:** `playwright-report/test-results.json`

**Format:** Machine-readable test results (useful for CI/CD integration)

#### 4. JUnit XML Report

**Location:** `playwright-report/test-results.xml`

**Format:** JUnit XML (compatible with most CI systems)

### Accessing Reports

```bash
# View HTML report
npx playwright show-report

# View Allure report
npm run report:allure

# Generate and open Allure
npm run report:allure:generate
npm run report:allure:open
```

## 🌍 Environment Management

### Environment Files

Each environment has its own configuration file:

```
.env           # Local environment
.env.staging   # Staging environment
.env.preprod   # Pre-production environment
.env.prod      # Production environment
```

### Setting Environment via CLI

```bash
# Set environment when running tests
ENVIRONMENT=staging npm test
cross-env ENVIRONMENT=preprod npm test
```

### Available Environment Variables

```env
# Application URLs
BASE_URL=https://example.com/
API_URL=https://api.example.com/

# Test Credentials
EMAIL_ADDRESS=test@example.com
PASSWORD=test_password

# Email Verification (MailSlurp)
MAILSLURP_API_KEY=your-api-key
MAILSLURP_INBOX_ID=your-inbox-id

# Feature Flags
SIGN_UP_FLOW=false
```

### Environment Selection Logic

```typescript
// Automatic environment detection:
// 1. Check ENVIRONMENT environment variable
// 2. Check PW_ENV environment variable
// 3. Default to "local"

const environment = process.env.ENVIRONMENT ?? process.env.PW_ENV ?? "local";
```

## 🚀 CI/CD Workflow

This framework includes a comprehensive GitHub Actions CI/CD setup with two main workflows.

> 📚 **For detailed CI/CD documentation**, see [CI-CD.md](CI-CD.md) which includes:
> - Complete workflow setup guide
> - GitHub Secrets configuration
> - Advanced configuration examples
> - Troubleshooting guide
> - Performance optimization tips

### Workflow Architecture

```
.github/workflows/
├── push-trigger.yml        # Automatic trigger on push/PR
└── manual-trigger.yml      # Reusable workflow with manual dispatch
```

### 1. Manual Trigger Workflow (`manual-trigger.yml`)

**Purpose:** Reusable workflow that can be called manually or by other workflows

**Trigger Options:**
- Manual dispatch via GitHub UI
- Called by `push-trigger.yml`
- Called by external workflows

**Supported Environments:**
- `staging` (default)
- `preprod`
- `prod`

**Key Features:**
- ✅ Customizable environment selection
- ✅ Node.js caching for faster builds
- ✅ Allure and Playwright reports
- ✅ Environment-based secrets management
- ✅ Artifact upload for reports

#### Triggering Manual Workflow

**Via GitHub UI:**

1. Go to Actions tab
2. Select "Run tests with custom configuration"
3. Click "Run workflow"
4. Choose target environment
5. Click "Run workflow"

**Via GitHub CLI:**

```bash
# Run tests in staging
gh workflow run manual-trigger.yml -f environment=staging

# Run tests in preprod
gh workflow run manual-trigger.yml -f environment=preprod

# Run tests in prod
gh workflow run manual-trigger.yml -f environment=prod
```

#### Workflow Steps

```yaml
1. Checkout code
   - Pull latest source code

2. Setup Node.js
   - Install Node.js v26
   - Enable npm caching for faster builds

3. Setup Java
   - Install Java 17 (required for Allure)

4. Install dependencies
   - Run: npm ci (clean install)

5. Install Playwright browsers
   - Install only Chromium for faster setup

6. Run Playwright tests
   - Execute: npm run test
   - Environment-specific execution

7. Generate Allure report
   - Convert test results to Allure format

8. Upload artifacts
   - Allure results
   - Allure report
   - Playwright report
```

#### Environment-Based Configuration

The workflow uses GitHub Environments for secret management:

```yaml
environment: ${{ inputs.environment }}
```

**GitHub Environments Setup:**

1. Go to Settings → Environments
2. Create environments: `staging`, `preprod`, `prod`
3. Add secrets for each environment:

```
For each environment add:
├── EMAIL_ADDRESS
├── PASSWORD
├── MAILSLURP_API_KEY
├── MAILSLURP_INBOX_ID
├── SIGN_UP_FLOW
├── BASE_URL
└── API_URL (optional)
```

**Setting Up Secrets in GitHub:**

```bash
# Via GitHub UI:
# 1. Go to Settings → Secrets and variables → Environments
# 2. Create new environment (e.g., "staging")
# 3. Add secrets for that environment

# Via GitHub CLI:
gh secret set EMAIL_ADDRESS --env staging -b "test@example.com"
gh secret set PASSWORD --env staging -b "password123"
gh secret set MAILSLURP_API_KEY --env staging -b "your-api-key"
gh secret set MAILSLURP_INBOX_ID --env staging -b "your-inbox-id"
gh secret set BASE_URL --env staging -b "https://staging.example.com"
```

### 2. Push Trigger Workflow (`push-trigger.yml`)

**Purpose:** Automatically run tests on push and pull requests

**Trigger Events:**
- Push to any branch
- Pull request to any branch

**Default Behavior:**
- Runs tests in **staging** environment
- Executes on all branches
- Cancels previous runs in progress

#### Concurrency Strategy

```yaml
concurrency:
  group: ${{ github.ref }}
  cancel-in-progress: true
```

**Benefits:**
- Only latest run per branch executes
- Prevents resource waste on outdated runs
- Faster feedback on recent changes

#### How It Works

```
Developer push to branch
        ↓
GitHub detects push event
        ↓
Trigger: push-trigger.yml
        ↓
Call: manual-trigger.yml with environment=staging
        ↓
Run tests in staging environment
        ↓
Generate reports
        ↓
Upload artifacts
```

### Workflow Customization

#### Add New Environment

**Step 1:** Create GitHub Environment

1. Go to Settings → Environments
2. Click "New environment"
3. Name it (e.g., `uat`)
4. Add all required secrets

**Step 2:** Update Manual Trigger Workflow

```yaml
environment:
  description: Target environment
  required: true
  type: choice
  options:
    - staging
    - preprod
    - prod
    - uat           # Add new environment
  default: staging
```

#### Add New Test Suite

**Step 1:** Create workflow step

```yaml
- name: Run smoke tests
  if: ${{ inputs.test-type == 'smoke' }}
  run: npm run test:smoke

- name: Run regression tests
  if: ${{ inputs.test-type == 'regression' }}
  run: npm run test:regression
```

**Step 2:** Add workflow input

```yaml
test-type:
  description: Type of tests to run
  required: true
  type: choice
  options:
    - smoke
    - regression
    - all
  default: all
```

### Accessing Reports

#### In GitHub Actions

1. Go to workflow run details
2. Scroll to "Artifacts"
3. Download desired report:
   - `allure-results-{environment}`
   - `allure-report-{environment}`
   - `playwright-report-{environment}`

#### Viewing Reports Locally

**Allure Report:**
```bash
# Download artifact
unzip allure-report-staging.zip

# View report
allure open ./allure-report
```

**Playwright Report:**
```bash
# Download artifact
unzip playwright-report-staging.zip

# View report (requires Node.js)
npx playwright show-report ./playwright-report
```

### CI Environment Variables

The framework sets specific environment variables for CI execution:

```typescript
// playwright.config.ts
retries: process.env.CI ? 2 : 0,      // Retry failed tests 2x on CI
workers: process.env.CI ? 1 : undefined, // Single worker on CI for stability
```

**Why?**
- Retries handle flaky tests
- Single worker prevents race conditions
- Stable results in CI environment

### Monitoring & Debugging

#### View Workflow Logs

1. Go to Actions tab
2. Click workflow run
3. Expand job details
4. View step output

#### Debug Failed Tests

**Check Artifacts:**
1. Download Playwright report
2. Review screenshots and videos
3. Check trace files
4. View test output logs

**Common CI Failures:**
- Environment variable issues → Check secrets
- Browser not found → Verify installation step
- Timeout errors → Increase timeout in config
- Element not found → Check locators

#### Re-run Failed Workflow

```bash
# Via GitHub UI:
# 1. Go to Actions → Failed workflow
# 2. Click "Re-run failed jobs"

# Via GitHub CLI:
gh run rerun <run-id>
```

### Performance Optimization

#### Cache Strategy

The workflow uses npm caching:

```yaml
- uses: actions/setup-node@v6
  with:
    node-version: 26
    cache: npm  # Caches node_modules
```

**Benefits:**
- 60-80% faster dependency installation
- Reduced CI pipeline time
- Lower bandwidth usage

#### Parallel Test Execution

Tests run in parallel on CI:

```yaml
workers: 1  # On CI (controlled)
```

**To enable more parallelism:**

```yaml
workers: ${{ runner.cpu-count }}
```

### Cost Optimization

#### Reduce Workflow Duration

```yaml
# Install only needed browser
npx playwright install --with-deps chromium

# vs all browsers (slower, more space)
npx playwright install --with-deps
```

#### Skip Tests on Documentation Changes

```yaml
on:
  push:
    paths-ignore:
      - 'docs/**'
      - '**.md'
      - '.gitignore'
```

### Workflow Security

#### Secrets Management

```yaml
secrets:
  EMAIL_ADDRESS: ${{ secrets.EMAIL_ADDRESS }}
  PASSWORD: ${{ secrets.PASSWORD }}
```

**Best Practices:**
- ✅ Use GitHub Environments for separation
- ✅ Use masked secrets (default in GitHub)
- ✅ Rotate secrets regularly
- ✅ Never commit secrets to repository
- ✅ Use branch protection for prod environment

#### Permissions

Set minimal required permissions:

```yaml
permissions:
  contents: read
  checks: write
```

### Example: Complete CI/CD Flow

**Scenario:** Developer pushes code

```
1. Developer commits and pushes
   git push origin feature-branch

2. GitHub detects push event
   Triggers: push-trigger.yml

3. Workflow checks out code
   Uses: actions/checkout@v6

4. Setup Node.js and dependencies
   npm ci

5. Install Playwright browsers
   npx playwright install --with-deps chromium

6. Run tests in staging
   npm run test

7. Generate reports
   Allure + Playwright

8. Upload artifacts
   Reports available in Actions UI

9. Developer downloads reports
   Reviews test results and videos

10. If all pass → Ready to merge
    If failed → Review, fix, and push again
```

### Troubleshooting CI Workflows

#### Issue: "Secrets not found"

**Solution:**
```bash
# Verify environment exists
gh environment list

# Add missing secrets
gh secret set SECRET_NAME --env staging -b "value"
```

#### Issue: "Workflow not triggering"

**Solution:**
```yaml
# Check trigger conditions
on:
  push:
    branches:
      - "**"  # Triggers on all branches
  pull_request:
    branches:
      - "**"
```

#### Issue: "Runner out of disk space"

**Solution:**
```bash
# Clean workspace before tests
- run: npm run clean:allure
- run: rm -rf node_modules
```

#### Issue: "Tests timing out on CI"

**Solution:**
```yaml
# Increase timeout
use: {
  navigationTimeout: 60000,
  actionTimeout: 20000
}
```

## 📚 Best Practices

### 1. Use Page Objects

✅ **Good:**
```typescript
await pageManager.getLoginPage().login(email, password);
```

❌ **Avoid:**
```typescript
await page.fill('[name="email"]', email);
await page.fill('[name="password"]', password);
await page.click('[type="submit"]');
```

### 2. Use Test Data

✅ **Good:**
```typescript
const data = getTestData("signupData");
await signup(data.validUser);
```

❌ **Avoid:**
```typescript
await signup("hardcoded@email.com", "password");
```

### 3. Use Meaningful Test Names

✅ **Good:**
```typescript
test("As a user, I should be able to add products to cart and checkout", ...)
```

❌ **Avoid:**
```typescript
test("test 1", ...)
test("checkout works", ...)
```

### 4. Use Appropriate Assertions

✅ **Good:**
```typescript
await expect(successMessage).toBeVisible();
await expect(page).toHaveURL('/products');
```

❌ **Avoid:**
```typescript
await page.waitForTimeout(2000); // Hard waits
```

### 5. Organize Tests with Tags

✅ **Good:**
```typescript
test("feature", { tag: ["@smoke", "@regression"] }, async ({...}) => {...})
```

❌ **Avoid:**
```typescript
test("feature", async ({...}) => {...})
```

### 6. Reuse Base Page Methods

✅ **Good:**
```typescript
// Extend BasePage to use common methods
await this.click(loginButton);
await this.fill(emailInput, email);
```

❌ **Avoid:**
```typescript
// Duplicate code in multiple page objects
await locator.click();
await locator.fill(value);
```

### 7. Handle Waits Properly

✅ **Good:**
```typescript
await expect(element).toBeVisible(); // Smart waits
await page.waitForURL('/dashboard');
```

❌ **Avoid:**
```typescript
await page.waitForTimeout(5000); // Arbitrary waits
```

## 🐛 Troubleshooting

### Issue: Tests Cannot Find Elements

**Solution:**
- Verify element locators in browser DevTools
- Check if `data-test-id` attributes are present
- Update locators if UI has changed

```bash
# Debug specific test
npx playwright test --debug tests/ui-test/login.spec.ts
```

### Issue: Authentication State Not Found

**Solution:**
```bash
# Regenerate auth state
npx playwright test setup/auth.setup.ts

# Verify auth file exists
ls -la playwright/.auth/user.json
```

### Issue: Tests Timeout

**Solution:**
- Increase timeout in `playwright.config.ts`
- Check network connectivity
- Verify application is running

```typescript
use: {
  navigationTimeout: 30000,
  actionTimeout: 10000,
}
```

### Issue: Environment Variables Not Loading

**Solution:**
```bash
# Verify .env file exists
cat .env

# Check environment variable
echo $BASE_URL

# Manually set if needed
export BASE_URL=https://example.com
npm test
```

### Issue: Allure Report Not Generating

**Solution:**
```bash
# Install Allure commandline
npm install -g allure-commandline

# Manually generate
allure generate ./allure-results -o allure-report

# Open report
allure open ./allure-report
```

### Issue: Tests Pass Locally but Fail on CI

**Common Causes:**
- Missing environment variables on CI
- Different browser/OS behavior
- Timing/timeout issues
- Network connectivity

**Solutions:**
- Verify all env variables set on CI
- Add explicit waits for CI
- Check CI logs and screenshots
- Use trace files for debugging

```bash
# Generate trace for debugging
npx playwright test --trace=on

# View trace in Playwright Inspector
npx playwright show-trace trace.zip
```





---

