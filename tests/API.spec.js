import {test, expect, request} from '@playwright/test';

const loginPayload= {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
let token;
test.beforeAll(async ()=>{
    const apiContext = await request.newContext();
    const loginResponse= await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: loginPayload
    });
    await expect(loginResponse.ok()).toBeTruthy(); 
    const loginResponseJson= await loginResponse.json();
    console.log(loginResponseJson);
    token= loginResponseJson.token;
    console.log(token);
});

test('API test', async ({page})=> {
    page.addInitScript(value =>{
      window.localStorage.setItem('token',value);
}, token);
  await page.goto("https://rahulshettyacademy.com/client");
  await expect(page).toHaveTitle("Let's Shop");
  const products = await page.locator(".card-body");
  const productName = 'ZARA COAT 3';
   const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
    await page.locator("[routerlink*='cart']").click();
    await page.waitForURL(/.*cart/);
    await page.locator("div Li:has(h3:has-text('ZARA COAT 3'))").waitFor();
    //await expect(cartItem).toBeVisible({ timeout: 15000 });
    await page.locator("text=Checkout").click();
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
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