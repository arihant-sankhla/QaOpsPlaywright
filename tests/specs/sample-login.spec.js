const { test, expect } = require('../fixtures/fixtures');

test('smoke: login flow (sample)', async ({ loginPage, page }) => {
  const EMAIL = process.env.TEST_USER_EMAIL;
  const PASSWORD = process.env.TEST_USER_PASSWORD;

  await loginPage.goto();

  if (EMAIL && PASSWORD) {
    // Run full login when credentials are provided via env vars
    await loginPage.login(EMAIL, PASSWORD);
    const firstCard = page.locator('.card-body').first();
    await expect(firstCard).toBeVisible();
  } else {
    // No credentials — verify login form elements are present
    await expect(page.locator('#userEmail')).toBeVisible();
    await expect(page.locator('#userPassword')).toBeVisible();
    await expect(page.locator("[value='Login']")).toBeVisible();
  }
});
