const {BeforeStep,AfterStep, Status}= require ('@cucumber/cucumber');
BeforeStep(function(){

});
AfterStep(async function({result}){
if(result.status===Status.FAILED)
{
    await this.page.screenshot({path: 'screenshot.png',  timeout: 60*1000, fullPage: true });
}
});