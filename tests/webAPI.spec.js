const {test, expect, request} = require('@playwright/test');
const {apiUtils} = require('./utils/apiUtils');
const { config } = require('./utils/config');
const { Logger } = require('./utils/logger');

const logger = new Logger('webAPI.spec', config.logLevel);
const loginPayLoad = {userEmail: config.testEmail, userPassword: config.testPassword};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6960eae1c941646b7a8b3ed3"}]};
 
 
let response;
test.beforeAll( async()=>
{
   logger.info('Setting up API test - creating order');
   const apiContext = await request.newContext();
   const apiUtil = new apiUtils(apiContext, loginPayLoad);
   response =  await apiUtil.createOrder(orderPayLoad);
   logger.info('Order created successfully', { orderId: response.orderId });
})
 
 
//create order is success
test('@API Place the order', async ({page})=>
{ 
    logger.info('Starting API test: Place the order');
    try {
        await page.addInitScript(value => {
            window.localStorage.setItem('token',value);
        }, response.token );
        
        await page.goto(config.baseUrl);
        await page.locator("button[routerlink*='myorders']").click();
        await page.locator("tbody").waitFor({ timeout: config.timeout });
        const rows = await page.locator("tbody tr");
        
        for(let i =0; i<await rows.count(); ++i)
        {
            const rowOrderId =await rows.nth(i).locator("th").textContent();
            if (response.orderId.includes(rowOrderId))
            {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
        const orderIdDetails =await page.locator(".col-text").textContent();
        expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
        logger.info('Test passed: Order found in history');
    } catch (error) {
        logger.error('Test failed', { error: error.message });
        throw error;
    }
});
