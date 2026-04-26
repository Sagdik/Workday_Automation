import { Given } from '@cucumber/cucumber';

Given('I open Google', async function () {
  await this.page.goto('https://www.google.com');
});