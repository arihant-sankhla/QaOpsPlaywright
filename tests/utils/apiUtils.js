const { config } = require('./config');
const { Logger } = require('./logger');

class apiUtils {
    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
        this.logger = new Logger('apiUtils', config.logLevel);
    }
 
    async getToken() {
        this.logger.info('Requesting authentication token');
        const loginResponse = await this.apiContext.post(`${config.apiBaseUrl}/auth/login`, {
            data: this.loginPayLoad
        });
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        this.logger.info('Token received successfully');
        return token;
    }
 
    async createOrder(orderPayLoad) {
        this.logger.info('Creating order');
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post(`${config.apiBaseUrl}/order/create-order`, {
            data: orderPayLoad,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        });
 
        const orderResponseJson = await orderResponse.json();
        this.logger.info('Order created successfully', { response: orderResponseJson });
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
 
        return response;
    }
}
 
module.exports = { apiUtils };
