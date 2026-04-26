import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PersonalInfoPage extends BasePage {
  constructor(page: Page) { super(page); }

  async isLoaded(): Promise<boolean> {
    return this.page
      .isVisible('[data-automation-id*="personalInfo"], text="Personal Information"')
      .catch(() => false);
  }

  async navigateToSection(sectionName: string) {
    await this.page.click(`text="${sectionName}"`);
    await this.waitForPageLoad();
  }

  async getFullName(): Promise<string> {
    return this.page
      .innerText('[data-automation-id*="legalName"], [data-automation-id*="name"]')
      .catch(() => '');
  }

  async getWorkEmail(): Promise<string> {
    return this.page
      .innerText('[data-automation-id*="workEmail"], [data-automation-id*="email"]')
      .catch(() => '');
  }

  async getWorkPhone(): Promise<string> {
    return this.page
      .innerText('[data-automation-id*="workPhone"], [data-automation-id*="phone"]')
      .catch(() => '');
  }

  async getHomeAddress(): Promise<string> {
    return this.page
      .innerText('[data-automation-id*="homeAddress"], [data-automation-id*="address"]')
      .catch(() => '');
  }

  async clickEditSection(sectionName: string) {
    const editBtn = this.page
      .locator(`[data-automation-id*="${sectionName}"] button:has-text("Edit"), [aria-label="Edit ${sectionName}"]`)
      .first();
    await editBtn.click();
    await this.waitForPageLoad();
  }

  async getEmergencyContactName(): Promise<string> {
    return this.page
      .innerText('[data-automation-id*="emergencyContact"]')
      .catch(() => '');
  }

  async getJobTitle(): Promise<string> {
    return this.page
      .innerText('[data-automation-id*="jobTitle"]')
      .catch(() => '');
  }

  async getDepartment(): Promise<string> {
    return this.page
      .innerText('[data-automation-id*="department"]')
      .catch(() => '');
  }

  async getManager(): Promise<string> {
    return this.page
      .innerText('[data-automation-id*="manager"]')
      .catch(() => '');
  }
}
