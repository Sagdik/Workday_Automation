import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class RecruitingPage extends BasePage {
  constructor(page: Page) { super(page); }

  async isLoaded(): Promise<boolean> {
    return this.page
      .isVisible('[data-automation-id*="job"], text="Jobs", text="Career"')
      .catch(() => false);
  }

  async searchForJobs(keywords: string) {
    await this.page.fill(
      '[data-automation-id*="jobSearch"] input, [placeholder*="search" i]',
      keywords
    );
    await this.page.keyboard.press('Enter');
    await this.waitForPageLoad();
  }

  async getJobCount(): Promise<number> {
    return this.page
      .locator('[data-automation-id*="jobPosting"], [data-automation-id*="jobResult"]')
      .count();
  }

  async clickFirstJob() {
    const firstJob = this.page
      .locator('[data-automation-id*="jobPosting"], [data-automation-id*="jobResult"]')
      .first();
    await firstJob.click();
    await this.waitForPageLoad();
  }

  async getJobTitle(): Promise<string> {
    return this.page
      .innerText('[data-automation-id*="jobTitle"], h1')
      .catch(() => '');
  }

  async getJobLocation(): Promise<string> {
    return this.page
      .innerText('[data-automation-id*="location"], [data-automation-id*="jobLocation"]')
      .catch(() => '');
  }

  async clickApply() {
    await this.page.click('[data-automation-id*="apply"], button:has-text("Apply")');
    await this.waitForPageLoad();
  }

  async getApplicationStatus(): Promise<string> {
    return this.page
      .innerText('[data-automation-id*="applicationStatus"]')
      .catch(() => '');
  }

  async filterByDepartment(department: string) {
    await this.page.click('[data-automation-id*="departmentFilter"], text="Department"');
    await this.page.click(`[role="option"]:has-text("${department}")`);
    await this.waitForPageLoad();
  }

  async filterByLocation(location: string) {
    await this.page.fill('[data-automation-id*="locationFilter"] input', location);
    await this.page.click(`[role="option"]:has-text("${location}")`);
    await this.waitForPageLoad();
  }
}
