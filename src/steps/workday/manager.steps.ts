import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('I am logged into Workday as a manager', async function () {
  const { config } = await import('../../config/env');
  const managerUsername = process.env.WORKDAY_MANAGER_USERNAME ?? config.username;
  const managerPassword = process.env.WORKDAY_MANAGER_PASSWORD ?? config.password;
  await this.loginPage.navigate(config.baseUrl);
  await this.loginPage.login(managerUsername, managerPassword);
});

When('I navigate to the Team Time Off calendar', async function () {
  await this.homePage.globalSearch('Team Time Off');
  const link = this.page.locator('text="Team Time Off", text="My Team\'s Time Off"').first();
  await link.click();
  await this.homePage.waitForPageLoad();
});

When('I navigate to My Team', async function () {
  await this.homePage.clickWorklet('My Team');
});

When('I approve all pending inbox actions', async function () {
  let count = await this.inboxPage.getInboxCount();
  while (count > 0) {
    await this.inboxPage.approveFirstItem();
    count = await this.inboxPage.getInboxCount();
  }
});

When('I search for employee {string}', async function (employeeName: string) {
  await this.homePage.globalSearch(employeeName);
});

Then('I should see the team calendar', async function () {
  const isVisible = await this.page
    .isVisible('[data-automation-id*="teamCalendar"], text="Team Calendar"')
    .catch(() => false);
  expect(isVisible).toBeTruthy();
});

Then('I should see team members listed', async function () {
  const members = this.page.locator('[data-automation-id*="teamMember"], [data-automation-id*="worker"]');
  const count = await members.count();
  expect(count).toBeGreaterThan(0);
});

Then('the inbox should be empty after approvals', async function () {
  const count = await this.inboxPage.getInboxCount();
  expect(count).toBe(0);
});

Then('I should see search results for employee {string}', async function (employeeName: string) {
  const results = await this.homePage.getSearchResults();
  const found = results.some(r => r.toLowerCase().includes(employeeName.toLowerCase()));
  expect(found).toBeTruthy();
});
