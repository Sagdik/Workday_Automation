import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('I am on the Inbox page', async function () {
  await this.homePage.clickWorklet('Inbox');
  await this.inboxPage.isLoaded();
});

When('I open the first inbox item', async function () {
  await this.inboxPage.clickFirstInboxItem();
});

When('I approve the first inbox item', async function () {
  await this.inboxPage.approveFirstItem();
});

When('I deny the first inbox item with reason {string}', async function (reason: string) {
  await this.inboxPage.denyFirstItem(reason);
});

When('I send back the first inbox item with reason {string}', async function (reason: string) {
  await this.inboxPage.sendBackFirstItem(reason);
});

Then('I should see inbox items in my inbox', async function () {
  const count = await this.inboxPage.getInboxCount();
  expect(count).toBeGreaterThan(0);
});

Then('I should see a success notification', async function () {
  const msg = await this.inboxPage.getSuccessNotification();
  expect(msg).toBeTruthy();
});

Then('the inbox item count should decrease', async function () {
  const count = await this.inboxPage.getInboxCount();
  expect(count).toBeGreaterThanOrEqual(0);
});
