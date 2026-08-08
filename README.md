# Playwright Automation Practice

This repository contains a Playwright automation framework with Allure reporting and optional Cucumber feature support.

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. If using CI or Azure Playwright service, set the service URL:
   ```powershell
   $env:PLAYWRIGHT_SERVICE_URL='https://example.com'
   ```

## Available Scripts

- `npm test`
  - Run Playwright tests with the local Playwright config.
- `npm run test:headed`
  - Run Playwright tests in headed mode.
- `npm run test:ci`
  - Run Playwright tests using `playwright.service.config.js` and 4 workers.
- `npm run test:features`
  - Run Cucumber feature tests from `features/`.
- `npm run report:playwright`
  - Open the Playwright HTML report.
- `npm run report:allure`
  - Generate Allure HTML output from `allure-results/` to `allure-report/`.
- `npm run open:allure`
  - Open the generated Allure report locally.
- `npm run clean:reports`
  - Remove generated report directories (`playwright-report/`, `allure-report/`, `allure-results/`, `test-results/`).

## Local Run Examples

Run all Playwright tests locally:

```bash
npm test
```

Run Playwright tests in headed mode:

```bash
npm run test:headed
```

Run Cucumber feature tests:

```bash
npm run test:features
```

Generate and open the Allure report:

```bash
npm run report:allure
npm run open:allure
```

## Report Output

- `playwright-report/` - generated Playwright HTML report.
- `allure-results/` - raw Allure test result files.
- `allure-report/` - generated Allure HTML report.

## GitHub Actions

The repository includes a workflow at `.github/workflows/playwright.yml` that:

- installs dependencies with `npm ci`
- runs Playwright tests using `playwright.service.config.js`
- generates an Allure report
- uploads both `playwright-report/` and `allure-report/` as artifacts

## Cucumber Feature Structure

- `features/` contains your `.feature` files.
- `features/step_defination/` contains step implementation files.
- `features/support/` contains hooks and shared Cucumber setup.

Use `Given`, `When`, `Then`, and hooks from `@cucumber/cucumber` in step files.

Example step file entry:

```js
const { Given, When, Then } = require('@cucumber/cucumber');

Given('I open the homepage', async function () {
  await this.page.goto('https://example.com');
});
```

## Notes

- `@playwright/test` is the primary test runner.
- `allure-playwright` captures test artifacts for Allure reporting.
- `@cucumber/cucumber` is available for BDD-style feature execution.

## Recommended Next Steps

- Keep `allure-report/` and `allure-results/` out of source control.
- Use `npm run clean:reports` before running a fresh report generation.
- Add project-specific browser projects or environment variables as needed.
