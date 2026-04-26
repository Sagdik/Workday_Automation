import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TimeOffPage extends BasePage {
  constructor(page: Page) { super(page); }

  async isLoaded(): Promise<boolean> {
    return this.page
      .isVisible('[data-automation-id*="timeOff"], text="Time Off"')
      .catch(() => false);
  }

  async getTimeOffBalance(type: string): Promise<string> {
    const balanceLocator = this.page
      .locator(`[data-automation-id*="balance"]:near(:text("${type}"))`)
      .first();
    await balanceLocator.waitFor({ timeout: 10000 });
    return balanceLocator.innerText();
  }

  async clickRequestTimeOff() {
    await this.page.click(
      '[data-automation-id="requestTimeOff"], button:has-text("Request"), text="Request"'
    );
    await this.waitForPageLoad();
  }

  async selectTimeOffType(type: string) {
    await this.page.click('[data-automation-id="timeOffType"] input, [placeholder="Type to filter"]');
    await this.page.fill('[data-automation-id="timeOffType"] input, [placeholder="Type to filter"]', type);
    await this.page.click(`[data-automation-id="timeOffType"] [role="option"]:has-text("${type}"), li:has-text("${type}")`);
  }

  async enterStartDate(date: string) {
    const input = this.page.locator('[data-automation-id="startDate"] input').first();
    await input.clear();
    await input.fill(date);
    await this.page.keyboard.press('Tab');
  }

  async enterEndDate(date: string) {
    const input = this.page.locator('[data-automation-id="endDate"] input').last();
    await input.clear();
    await input.fill(date);
    await this.page.keyboard.press('Tab');
  }

  async enterComment(comment: string) {
    await this.page.fill(
      '[data-automation-id="comment"] textarea, textarea[placeholder*="comment" i]',
      comment
    );
  }

  async clickSubmit() {
    await this.page.click('[data-automation-id="submitButton"], button:has-text("Submit")');
    await this.waitForPageLoad();
  }

  async clickCancel() {
    await this.page.click('[data-automation-id="cancelButton"], button:has-text("Cancel")');
  }

  async getSuccessMessage(): Promise<string> {
    const msg = this.page.locator('[data-automation-id*="success"], .success-message').first();
    await msg.waitFor({ timeout: 10000 });
    return msg.innerText();
  }

  async getRequestRowCount(): Promise<number> {
    return this.page.locator('[data-automation-id*="timeOffRequest"], tr.request-row').count();
  }

  async cancelLatestRequest() {
    const cancelBtn = this.page
      .locator('[data-automation-id*="cancelRequest"], button:has-text("Cancel")')
      .first();
    await cancelBtn.click();
    await this.page.click('button:has-text("Confirm"), button:has-text("Yes")');
    await this.waitForPageLoad();
  }
}
