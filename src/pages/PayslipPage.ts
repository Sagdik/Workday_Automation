import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PayslipPage extends BasePage {
  constructor(page: Page) { super(page); }

  async isLoaded(): Promise<boolean> {
    return this.page.isVisible('[data-automation-id*="pay"], text="Pay"').catch(() => false);
  }

  async getPayslipCount(): Promise<number> {
    return this.page
      .locator('[data-automation-id*="payslip"], [data-automation-id*="payResult"]')
      .count();
  }

  async clickLatestPayslip() {
    const payslipLink = this.page
      .locator('[data-automation-id*="payslip"] a, [data-automation-id*="payResult"] a')
      .first();
    await payslipLink.click();
    await this.waitForPageLoad();
  }

  async getNetPay(): Promise<string> {
    return this.page
      .innerText('[data-automation-id*="netPay"], [data-automation-id*="total"]')
      .catch(() => '');
  }

  async getGrossPay(): Promise<string> {
    return this.page
      .innerText('[data-automation-id*="grossPay"], [data-automation-id*="gross"]')
      .catch(() => '');
  }

  async getPayPeriod(): Promise<string> {
    return this.page
      .innerText('[data-automation-id*="payPeriod"], [data-automation-id*="period"]')
      .catch(() => '');
  }

  async getTaxWithheld(): Promise<string> {
    return this.page
      .innerText('[data-automation-id*="tax"], [data-automation-id*="withholding"]')
      .catch(() => '');
  }

  async clickViewAllPayslips() {
    await this.page.click('text="View All", [data-automation-id*="viewAll"]');
    await this.waitForPageLoad();
  }

  async clickTaxDocuments() {
    await this.page.click('text="Tax Documents", text="W-2", [data-automation-id*="taxDocument"]');
    await this.waitForPageLoad();
  }
}
