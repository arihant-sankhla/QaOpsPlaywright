# Playwright Automation Project Plan

## 1. Project Vision

Build a stable, maintainable Playwright automation framework with BDD support, rich reporting, and CI/CD integration.

## 2. Current State

- Uses `@playwright/test` and `Playwright`.
- Includes `@cucumber/cucumber` and a `features/` folder.
- Generates Allure reports via `allure-playwright`.
- GitHub Actions workflow runs tests with `playwright.service.config.js` and uploads `playwright-report/`.

## 3. Goals

- Standardize test execution via npm scripts.
- Keep test configuration centralized in `playwright.config.js`.
- Support both Playwright tests and Cucumber feature execution.
- Produce HTML and Allure reports.
- Run tests automatically in GitHub Actions.
- Maintain clean artifact directories.

## 4. Recommended Structure

- `tests/` - Playwright test files.
- `features/` - Gherkin feature files.
  - `features/step_defination/`
  - `features/support/`
- `playwright.config.js` - local test configuration.
- `playwright.service.config.js` - service-specific CI config.
- `package.json` - scripts + dev dependencies.
- `allure-results/` - test result output.
- `allure-report/` - generated report artifacts.
- `playwright-report/` - Playwright HTML report.

## 5. Roadmap

### Phase 1: Foundation

1. Define and document npm scripts.
   - `npm test`
   - `npm run test:headed`
   - `npm run test:ci`
   - `npm run report:html`
   - `npm run report:allure`
   - `npm run clean:reports`
2. Confirm package dependencies and remove unused packages.
3. Add a `README.md` with run instructions.

### Phase 2: Test Configuration

1. Consolidate Playwright settings in `playwright.config.js`.
2. Add browser projects if cross-browser coverage is required.
3. Set default retry, timeout, screenshot, and trace policies.
4. Add environment-based config support:
   - local vs CI
   - base URL and credentials via env vars

### Phase 3: BDD and Feature Support

1. Wire Cucumber into the framework if feature files are required.
2. Add a script to run feature tests.
3. Keep step definitions and support code organized.
4. Share reusable page objects and helpers.

### Phase 4: Reporting

1. Use Allure for rich results and attach traces/screenshots.
2. Add a report generation script:
   - `allure generate --clean allure-results -o allure-report`
3. Ensure CI uploads both HTML and Allure artifacts.
4. Keep report directories excluded from Git.

### Phase 5: CI/CD

1. Harden the GitHub Actions workflow.
2. Cache Node modules to speed installs.
3. Upload `playwright-report/` and `allure-report/` if generated.
4. Optionally add matrix jobs for browser coverage or OS variants.

### Phase 6: Quality and Maintenance

1. Add linting and formatting checks.
2. Add type-checking or static analysis.
3. Document branching and test release criteria.
4. Add smoke and regression subsets.

## 6. Recommended Tasks

- [ ] Add missing npm scripts in `package.json`.
- [ ] Improve `playwright.config.js` with explicit runners and projects.
- [ ] Add `README.md` with commands and report links.
- [ ] Configure Allure result cleanup and generation.
- [ ] Extend GitHub Actions to save Allure artifacts.
- [ ] Create a `tests/helpers/` or `pages/` folder for reusable test code.
- [ ] Keep the Cucumber folder structure consistent.

## 7. Example Commands

- `npm test`
- `npx playwright test`
- `npx playwright show-report`
- `npx allure generate --clean allure-results -o allure-report`
- `npx allure open allure-report`

## 8. Optional Enhancements

- Add `eslint` and `prettier` support.
- Add a feature toggle for `headed` vs `headless` execution.
- Add a nightly or scheduled CI test run.
- Add page object modeling and reusable fixtures.
- Add failure email or Slack notifications from CI.

## 9. Notes

- The workflow currently logs in to Azure before tests. Keep that if service access is required.
- The repo already has Allure and Playwright report folders; ensure those are generated cleanly and not committed with stale data.
- Use `npm ci` in CI and `npm install` locally.
