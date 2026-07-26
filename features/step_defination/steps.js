const {When, Then, Given,Before, setDefaultTimeout}= require('@cucumber/cucumber');
const { expect, chromium } = require('@playwright/test');
let browser;
let context;
let page;
Before(async () => {
    browser = await chromium.launch({
      headless: false
    });
   context = await browser.newContext();
   page = await context.newPage();
  });

setDefaultTimeout(60 * 1000);

Given('a login to ecommerce application with {string} and {string}',{timeout: 100*1000}, async function (username, password) {
   const products = await page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(username);
   await page.getByPlaceholder("enter your passsword").fill(password);
   await page.getByRole('button',{name:"Login"}).click();
   await page.waitForLoadState('networkidle'); 
});

When('Add {string} to Cart', async function (string) {
  await page.locator(".card-body b").first().waitFor(); 
   await page.locator(".card-body").filter({hasText:string})
   .getByRole("button",{name:"Add to Cart"}).click();
});

Then('verify Cart', async function () {
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
 
   //await page.pause();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
   await page.getByRole("button",{name :"Checkout"}).click();
});

Then('Enter user details and Place Order', async function () {
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
});

Then('Verify Order in OrderHistory page',async function () {
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
});