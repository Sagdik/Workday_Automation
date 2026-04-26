import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('I am on the Personal Information page', async function () {
  await this.homePage.clickWorklet('Personal Information');
  await this.personalInfoPage.isLoaded();
});

When('I navigate to the {string} section', async function (sectionName: string) {
  await this.personalInfoPage.navigateToSection(sectionName);
});

When('I click Edit on the {string} section', async function (sectionName: string) {
  await this.personalInfoPage.clickEditSection(sectionName);
});

Then('I should see my full name displayed', async function () {
  const name = await this.personalInfoPage.getFullName();
  expect(name).toBeTruthy();
});

Then('I should see my work email', async function () {
  const email = await this.personalInfoPage.getWorkEmail();
  expect(email).toContain('@');
});

Then('I should see my work phone number', async function () {
  const phone = await this.personalInfoPage.getWorkPhone();
  expect(phone).toBeTruthy();
});

Then('I should see my home address', async function () {
  const address = await this.personalInfoPage.getHomeAddress();
  expect(address).toBeTruthy();
});

Then('I should see my emergency contact information', async function () {
  const contact = await this.personalInfoPage.getEmergencyContactName();
  expect(contact).toBeTruthy();
});

Then('I should see my job title', async function () {
  const title = await this.personalInfoPage.getJobTitle();
  expect(title).toBeTruthy();
});

Then('I should see my department', async function () {
  const dept = await this.personalInfoPage.getDepartment();
  expect(dept).toBeTruthy();
});

Then('I should see my manager', async function () {
  const manager = await this.personalInfoPage.getManager();
  expect(manager).toBeTruthy();
});
