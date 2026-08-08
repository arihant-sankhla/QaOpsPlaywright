# Prioritized Project Task Checklist

## Immediate (Done or already implemented)

1. Update `package.json`
   - Add Playwright scripts: `test`, `test:headed`, `test:ci`
   - Add Cucumber script: `test:features`
   - Add reporting scripts: `report:playwright`, `report:allure`, `open:allure`
   - Add cleanup script: `clean:reports`
   - Add `allure-commandline` as a dev dependency
   - Keep existing dependencies for Playwright, Allure, and Cucumber

2. Update `.gitignore`
   - Ignore `allure-report/`
   - Ignore `allure-results/`
   - Keep existing ignored Playwright output directories

3. Update `playwright.config.js`
   - Convert to CommonJS syntax
   - Add HTML and Allure reporters
   - Keep screenshot and trace policies

4. Update `playwright.service.config.js`
   - Convert to CommonJS syntax
   - Add Allure reporter alongside Azure Playwright reporter
   - Keep service-specific Azure Playwright settings

5. Update `.github/workflows/playwright.yml`
   - Generate Allure report after test execution
   - Upload `allure-report/` as a workflow artifact

6. Add `README.md`
   - Document install steps
   - Document all npm scripts
   - Document local run examples
   - Document report output paths
   - Document GitHub Actions behavior
   - Document Cucumber feature structure

## Short-Term (Next actions)

1. Clean stale generated artifacts
   - Run `npm run clean:reports`
   - Ensure `allure-report/` and `allure-results/` are regenerated cleanly

2. Confirm CI environment variables
   - Validate `PLAYWRIGHT_SERVICE_URL` is set in GitHub vars/secrets
   - Ensure Azure credentials are configured if required

3. Validate test and report flows locally
   - `npm test`
   - `npm run test:headed`
   - `npm run test:features`
   - `npm run report:allure`
   - `npm run open:allure`

## Medium-Term (Recommended improvements)

1. Add a helper/page object layer
   - Create `tests/helpers/` or `tests/pages/`
   - Share browser and locator logic across tests

2. Add environment config support
   - Use env vars for base URL, credentials, and test mode
   - Support local vs CI configurations

3. Add linting and formatting
   - Add `eslint` and `prettier`
   - Add lint scripts to `package.json`

4. Add broader Playwright projects if needed
   - Chrome, Firefox, WebKit projects
   - Different device profiles or screen sizes

## Long-Term (Optional enhancements)

1. Add scheduled CI runs or browser matrix runs
2. Add result notifications (Slack, email, Teams)
3. Add smoke and regression subsets
4. Add quality gate checks for test coverage or failure thresholds

## Notes

- `PROJECT_PLAN.md` contains the full project vision and roadmap.
- This file is intended as the prioritized checklist for next work.
