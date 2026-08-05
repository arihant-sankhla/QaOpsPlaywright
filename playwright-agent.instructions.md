Repository context

- This project uses `@playwright/test`, `@cucumber/cucumber`, and `allure-playwright`.
- The main scripts are defined in `package.json`.
- Reports are generated into `playwright-report/`, `allure-results/`, `allure-report/`, and `test-results/`.
- Core config files include `playwright.config.js` and `playwright.service.config.js`.
- Feature files live under `features/` and step definitions under `features/step_defination/`.

How to help

- Recommend `npm` script usage first.
- For Playwright test execution, suggest `npm test`, `npm run test:headed`, or `npm run test:ci`.
- For Cucumber feature execution, suggest `npm run test:features`.
- For reporting, suggest `npm run report:playwright`, `npm run report:allure`, and `npm run open:allure`.
- For clean-up, suggest `npm run clean:reports`.

Troubleshooting

- Use existing repo files and directories when describing errors or fixes.
- When diagnosing Playwright failures, mention browser projects, fixtures, timeouts, retry behavior, and output directories like `playwright-report/`, `allure-results/`, and `test-results/`.
- When diagnosing Cucumber issues, mention feature syntax, step definitions, `features/step_defination/`, and `@cucumber/cucumber` hooks or support files.
- Prefer debug suggestions that reference specific config files: `playwright.config.js` or `playwright.service.config.js`.

Best practices

- Keep generated report directories out of source control.
- Prefer editing test or feature files under `tests/` and `features/`.
- Use workspace-local `npx` commands rather than global installs when possible.
- Advise adding environment variable documentation when tests depend on `PLAYWRIGHT_SERVICE_URL` or other CI settings.
