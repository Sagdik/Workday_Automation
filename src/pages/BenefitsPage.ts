import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BenefitsPage extends BasePage {
  constructor(page: Page) { super(page); }

  async isLoaded(): Promise<boolean> {
    return this.page.isVisible('[data-automation-id*="benefit"], text="Benefits"').catch(() => false);
  }

  async getBenefitPlanName(benefitType: string): Promise<string> {
    const planLocator = this.page
      .locator(`tr:has-text("${benefitType}") td, [data-automation-id*="${benefitType}"]`)
      .first();
    await planLocator.waitFor({ timeout: 10000 });
    return planLocator.innerText();
  }

  async clickBenefitDetails(benefitName: string) {
    await this.page.click(`text="${benefitName}"`);
    await this.waitForPageLoad();
  }

  async getHealthPlan(): Promise<string> {
    return this.getBenefitPlanName('Medical');
  }

  async getDentalPlan(): Promise<string> {
    return this.getBenefitPlanName('Dental');
  }

  async getVisionPlan(): Promise<string> {
    return this.getBenefitPlanName('Vision');
  }

  async getRetirementContribution(): Promise<string> {
    return this.page
      .innerText('[data-automation-id*="retirement"], [data-automation-id*="401k"]')
      .catch(() => '');
  }

  async getBenefitSectionCount(): Promise<number> {
    return this.page.locator('[data-automation-id*="benefitGroup"], .benefit-section').count();
  }

  async isBenefitEnrolled(benefitName: string): Promise<boolean> {
    return this.page
      .isVisible(`text="${benefitName}"`)
      .catch(() => false);
  }
}
