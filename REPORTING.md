Allure & Reporting

This project uses Playwright and `allure-playwright` to generate test reports.

Quick commands (from repo root):

- Install dependencies and browsers:

```powershell
npm install
npm run install:browsers
```

- Run tests and produce Allure results:

```powershell
# Run tests and write results to `allure-results`
npx playwright test --reporter=list,allure-playwright

# Generate an HTML report from `allure-results`
npm run allure:generate

# Open generated report
npm run allure:open
```

Notes:
- `allure-commandline` requires Java (JRE 11+). If `npm run allure:generate` fails, install a JRE and ensure `java` is on PATH.
- Artifacts (screenshots, traces, videos) are written to `test-results/` per `playwright.config.js`.
- The reporter `allure-playwright` saves test-step attachments to `allure-results/`.

CI:
- In CI, run tests with the `allure-playwright` reporter, then run `allure generate` and publish the `allure-report/` folder as an artifact.
