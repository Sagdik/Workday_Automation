import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('I am on the Time Off page', async function () {
  await this.homePage.clickWorklet('Time Off');
  await this.timeOffPage.isLoaded();
});

When('I click Request Time Off', async function () {
  await this.timeOffPage.clickRequestTimeOff();
});

When('I select time off type {string}', async function (type: string) {
  await this.timeOffPage.selectTimeOffType(type);
});

When('I enter start date {string}', async function (date: string) {
  await this.timeOffPage.enterStartDate(date);
});

When('I enter end date {string}', async function (date: string) {
  await this.timeOffPage.enterEndDate(date);
});

When('I enter the comment {string}', async function (comment: string) {
  await this.timeOffPage.enterComment(comment);
});

When('I submit the time off request', async function () {
  await this.timeOffPage.clickSubmit();
});

When('I cancel the time off request form', async function () {
  await this.timeOffPage.clickCancel();
});

When('I cancel my latest time off request', async function () {
  await this.timeOffPage.cancelLatestRequest();
});

Then('I should see the time off request submitted successfully', async function () {
  const msg = await this.timeOffPage.getSuccessMessage();
  expect(msg).toBeTruthy();
});

Then('I should see {int} time off request\\(s) in the list', async function (count: number) {
  const actual = await this.timeOffPage.getRequestRowCount();
  expect(actual).toBeGreaterThanOrEqual(count);
});

Then('I should see my {string} balance', async function (type: string) {
  const balance = await this.timeOffPage.getTimeOffBalance(type);
  expect(balance).toBeTruthy();
});

Then('I should be back on the Time Off page', async function () {
  const isLoaded = await this.timeOffPage.isLoaded();
  expect(isLoaded).toBeTruthy();
});
