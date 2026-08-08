# GitHub Issue-Style Task Breakdown

## 1. Implement Playwright + Allure Workflow

### Description
Create a robust Playwright automation workflow with Allure reporting, Cucumber support, and CI integration.

### Tasks
- [x] Add npm scripts for Playwright and Cucumber test execution
- [x] Add report scripts for Playwright and Allure
- [x] Add cleanup script for generated report artifacts
- [x] Install `allure-commandline` as a dev dependency
- [x] Configure Playwright local config with HTML and Allure reporters
- [x] Configure Playwright service config with Azure and Allure reporters
- [x] Update `.gitignore` to exclude generated report folders
- [x] Update GitHub Actions workflow to generate and upload `allure-report/`
- [x] Document scripts and reporting in `README.md`

## 2. Validate Local and CI Execution

### Description
Verify that the project runs correctly both locally and in CI.

### Tasks
- [ ] Run `npm test` successfully
- [ ] Run `npm run test:headed` successfully
- [ ] Run `npm run test:features` successfully
- [ ] Run `npm run report:allure` and `npm run open:allure`
- [ ] Ensure `PLAYWRIGHT_SERVICE_URL` is configured in CI
- [ ] Confirm GitHub Actions artifact upload for Playwright and Allure reports

## 3. Add Framework Improvements

### Description
Improve maintainability with reusable helpers, environment management, and quality tooling.

### Tasks
- [ ] Create shared page objects or helper modules for tests
- [ ] Add environment variables for base URL and credentials
- [ ] Add linting and formatting tooling such as ESLint and Prettier
- [ ] Add optional cross-browser Playwright projects

## 4. Optional Enhancements

### Description
Extend the automation framework with advanced reporting, coverage, and CI features.

### Tasks
- [ ] Add scheduled or matrix CI job coverage
- [ ] Add notification support for test results
- [ ] Add smoke and regression test subsets
- [ ] Add quality gate checks or failure thresholds
