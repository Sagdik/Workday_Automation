import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(60 * 1000);

Before(async function () {
  await this.init();
});

After(async function (scenario) {
  if (scenario.result?.status === 'FAILED') {
    const screenshot = await this.page.screenshot();
    await this.attach(screenshot, 'image/png');
  }
  await this.close();
});