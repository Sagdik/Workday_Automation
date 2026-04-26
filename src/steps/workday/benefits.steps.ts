import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('I am on the Benefits page', async function () {
  await this.homePage.clickWorklet('Benefits');
  await this.benefitsPage.isLoaded();
});

When('I click on {string} benefit details', async function (benefitName: string) {
  await this.benefitsPage.clickBenefitDetails(benefitName);
});

Then('I should see my Medical plan details', async function () {
  const plan = await this.benefitsPage.getHealthPlan();
  expect(plan).toBeTruthy();
});

Then('I should see my Dental plan details', async function () {
  const plan = await this.benefitsPage.getDentalPlan();
  expect(plan).toBeTruthy();
});

Then('I should see my Vision plan details', async function () {
  const plan = await this.benefitsPage.getVisionPlan();
  expect(plan).toBeTruthy();
});

Then('I should see my retirement contribution', async function () {
  const contribution = await this.benefitsPage.getRetirementContribution();
  expect(contribution).toBeTruthy();
});

Then('I should see at least one benefit section', async function () {
  const count = await this.benefitsPage.getBenefitSectionCount();
  expect(count).toBeGreaterThan(0);
});

Then('I should be enrolled in {string} benefit', async function (benefitName: string) {
  const enrolled = await this.benefitsPage.isBenefitEnrolled(benefitName);
  expect(enrolled).toBeTruthy();
});
