import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { config } from '../../config/env';

Given('I am on the Workday login page', async function () {
  await this.loginPage.navigate(config.baseUrl);
});

Given('I am logged into Workday', async function () {
  await this.loginPage.navigate(config.baseUrl);
  await this.loginPage.login(config.username, config.password);
});

When('I enter username {string} and password {string}', async function (username: string, password: string) {
  await this.loginPage.enterUsername(username);
  await this.loginPage.enterPassword(password);
});

When('I click the Sign In button', async function () {
  await this.loginPage.clickSignIn();
});

When('I click the Sign In button without entering credentials', async function () {
  await this.loginPage.clickSignIn();
});

When('I click the {string} link on the login page', async function (linkText: string) {
  await this.page.click(`text="${linkText}"`);
  await this.loginPage.waitForPageLoad();
});

Then('I should be redirected to the Workday home page', async function () {
  const isLoaded = await this.homePage.isLoaded();
  expect(isLoaded).toBeTruthy();
});

Then('I should see a login error message containing {string}', async function (expectedMessage: string) {
  const errorMessage = await this.loginPage.getErrorMessage();
  expect(errorMessage.toLowerCase()).toContain(expectedMessage.toLowerCase());
});

Then('I should see field validation errors', async function () {
  const errorVisible = await this.page
    .isVisible('[data-automation-id*="error"], .error, [aria-invalid="true"]')
    .catch(() => false);
  expect(errorVisible).toBeTruthy();
});

Then('I should see the password reset page', async function () {
  const isVisible = await this.page
    .isVisible('text="Reset Password", text="Forgot Password"')
    .catch(() => false);
  expect(isVisible).toBeTruthy();
});

Then('I should be on the Workday login page', async function () {
  const isOnLogin = await this.loginPage.isOnLoginPage();
  expect(isOnLogin).toBeTruthy();
});
