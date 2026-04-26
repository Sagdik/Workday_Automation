import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('I am on the Pay page', async function () {
  await this.homePage.clickWorklet('Pay');
  await this.payslipPage.isLoaded();
});

When('I click on the latest payslip', async function () {
  await this.payslipPage.clickLatestPayslip();
});

When('I click View All payslips', async function () {
  await this.payslipPage.clickViewAllPayslips();
});

When('I navigate to Tax Documents', async function () {
  await this.payslipPage.clickTaxDocuments();
});

Then('I should see at least one payslip', async function () {
  const count = await this.payslipPage.getPayslipCount();
  expect(count).toBeGreaterThan(0);
});

Then('I should see the net pay amount', async function () {
  const netPay = await this.payslipPage.getNetPay();
  expect(netPay).toBeTruthy();
});

Then('I should see the gross pay amount', async function () {
  const grossPay = await this.payslipPage.getGrossPay();
  expect(grossPay).toBeTruthy();
});

Then('I should see the pay period', async function () {
  const period = await this.payslipPage.getPayPeriod();
  expect(period).toBeTruthy();
});

Then('I should see the tax withheld amount', async function () {
  const tax = await this.payslipPage.getTaxWithheld();
  expect(tax).toBeTruthy();
});

Then('I should see tax documents listed', async function () {
  const isVisible = await this.page.isVisible('text="W-2", text="Tax Document"').catch(() => false);
  expect(isVisible).toBeTruthy();
});
