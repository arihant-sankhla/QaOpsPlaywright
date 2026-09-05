const { test, expect } = require('@playwright/test');

test('@Webst Client App login', async ({ page }) => {
   const email = "anshika@gmail.com";

   await page.goto("https://rahulshettyacademy.com/client");

   // Use more robust selectors for email and password
   await page.locator('input[type="email"]').fill(email);
   await page.locator('input[type="password"]').fill("Iamking@000");

   await page.locator("[value='Login']").click();

   // Wait for the product cards to be visible
   await expect(page.locator(".card-body").first()).toBeVisible({ timeout: 15000 });

   await page.locator(".card-body").filter({ hasText: "ZARA COAT 3" })
     .getByRole("button", { name: "Add to Cart" }).click();

   await page.getByRole("listitem").getByRole('button', { name: "Cart" }).click();

   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();

   await page.getByRole("button", { name: "Checkout" }).click();

   await page.getByPlaceholder("Select Country").pressSequentially("ind");

   await page.getByRole("button", { name: "India" }).nth(1).click();
   await page.getByText("PLACE ORDER").click();

   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
});