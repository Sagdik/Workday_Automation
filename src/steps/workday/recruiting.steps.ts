import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('I am on the Recruiting page', async function () {
  await this.homePage.globalSearch('Career');
  const link = this.page.locator('text="Career", text="Jobs Hub", text="Recruiting"').first();
  await link.click();
  await this.homePage.waitForPageLoad();
});

When('I search for job {string}', async function (jobKeyword: string) {
  await this.recruitingPage.searchForJobs(jobKeyword);
});

When('I open the first job posting', async function () {
  await this.recruitingPage.clickFirstJob();
});

When('I click Apply for the job', async function () {
  await this.recruitingPage.clickApply();
});

When('I filter jobs by department {string}', async function (department: string) {
  await this.recruitingPage.filterByDepartment(department);
});

When('I filter jobs by location {string}', async function (location: string) {
  await this.recruitingPage.filterByLocation(location);
});

Then('I should see job listings', async function () {
  const count = await this.recruitingPage.getJobCount();
  expect(count).toBeGreaterThan(0);
});

Then('I should see the job title', async function () {
  const title = await this.recruitingPage.getJobTitle();
  expect(title).toBeTruthy();
});

Then('I should see the job location', async function () {
  const location = await this.recruitingPage.getJobLocation();
  expect(location).toBeTruthy();
});

Then('I should see the job application form', async function () {
  const isVisible = await this.page
    .isVisible('[data-automation-id*="application"], text="Apply"')
    .catch(() => false);
  expect(isVisible).toBeTruthy();
});

Then('I should see my application status', async function () {
  const status = await this.recruitingPage.getApplicationStatus();
  expect(status).toBeTruthy();
});
