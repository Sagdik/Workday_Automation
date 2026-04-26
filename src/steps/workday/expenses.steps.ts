import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('I am on the Expenses page', async function () {
  await this.homePage.clickWorklet('Expenses');
  await this.expensePage.isLoaded();
});

When('I click Create Expense Report', async function () {
  await this.expensePage.clickCreateExpenseReport();
});

When('I enter the report title {string}', async function (title: string) {
  await this.expensePage.enterReportTitle(title);
});

When('I add an expense line item', async function () {
  await this.expensePage.clickAddExpenseLine();
});

When('I select expense type {string}', async function (type: string) {
  await this.expensePage.selectExpenseType(type);
});

When('I enter the amount {string}', async function (amount: string) {
  await this.expensePage.enterAmount(amount);
});

When('I enter expense date {string}', async function (date: string) {
  await this.expensePage.enterExpenseDate(date);
});

When('I enter the memo {string}', async function (memo: string) {
  await this.expensePage.enterMemo(memo);
});

When('I submit the expense report', async function () {
  await this.expensePage.clickSubmitReport();
});

Then('I should see the expense report status as {string}', async function (expectedStatus: string) {
  const status = await this.expensePage.getExpenseReportStatus();
  expect(status.toLowerCase()).toContain(expectedStatus.toLowerCase());
});

Then('I should see at least one expense report', async function () {
  const count = await this.expensePage.getExpenseReportCount();
  expect(count).toBeGreaterThan(0);
});
