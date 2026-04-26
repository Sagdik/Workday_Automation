import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

When('I click on the {string} worklet', async function (workletName: string) {
  await this.homePage.clickWorklet(workletName);
});

When('I search for {string} using global search', async function (query: string) {
  await this.homePage.globalSearch(query);
});

When('I sign out of Workday', async function () {
  await this.homePage.signOut();
});

Then('I should see the {string} worklet on the dashboard', async function (workletName: string) {
  const isVisible = await this.homePage.isWorkletVisible(workletName);
  expect(isVisible).toBeTruthy();
});

Then('I should see search results for {string}', async function (query: string) {
  const results = await this.homePage.getSearchResults();
  const found = results.some(r => r.toLowerCase().includes(query.toLowerCase()));
  expect(found).toBeTruthy();
});

Then('I should be on the Time Off page', async function () {
  const isLoaded = await this.timeOffPage.isLoaded();
  expect(isLoaded).toBeTruthy();
});

Then('I should be on the Personal Information page', async function () {
  const isLoaded = await this.personalInfoPage.isLoaded();
  expect(isLoaded).toBeTruthy();
});

Then('I should be on the Pay page', async function () {
  const isLoaded = await this.payslipPage.isLoaded();
  expect(isLoaded).toBeTruthy();
});

Then('I should be on the Benefits page', async function () {
  const isLoaded = await this.benefitsPage.isLoaded();
  expect(isLoaded).toBeTruthy();
});

Then('I should be on the Expenses page', async function () {
  const isLoaded = await this.expensePage.isLoaded();
  expect(isLoaded).toBeTruthy();
});

Then('I should be on the Inbox page', async function () {
  const isLoaded = await this.inboxPage.isLoaded();
  expect(isLoaded).toBeTruthy();
});
