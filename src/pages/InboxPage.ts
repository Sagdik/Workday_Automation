import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InboxPage extends BasePage {
  constructor(page: Page) { super(page); }

  async isLoaded(): Promise<boolean> {
    return this.page.isVisible('[data-automation-id*="inbox"], text="Inbox"').catch(() => false);
  }

  async getInboxCount(): Promise<number> {
    return this.page
      .locator('[data-automation-id*="inboxItem"], [data-automation-id*="actionItem"]')
      .count();
  }

  async clickFirstInboxItem() {
    const firstItem = this.page
      .locator('[data-automation-id*="inboxItem"], [data-automation-id*="actionItem"]')
      .first();
    await firstItem.click();
    await this.waitForPageLoad();
  }

  async approveFirstItem() {
    await this.clickFirstInboxItem();
    await this.page.click('[data-automation-id*="approve"], button:has-text("Approve")');
    await this.waitForPageLoad();
  }

  async denyFirstItem(reason: string) {
    await this.clickFirstInboxItem();
    await this.page.click('[data-automation-id*="deny"], button:has-text("Deny")');
    await this.page.fill('textarea', reason);
    await this.page.click('button:has-text("Submit")');
    await this.waitForPageLoad();
  }

  async sendBackFirstItem(reason: string) {
    await this.clickFirstInboxItem();
    await this.page.click('[data-automation-id*="sendBack"], button:has-text("Send Back")');
    await this.page.fill('textarea', reason);
    await this.page.click('button:has-text("Submit")');
    await this.waitForPageLoad();
  }

  async getFirstItemTitle(): Promise<string> {
    return this.page
      .locator('[data-automation-id*="inboxItem"]')
      .first()
      .innerText()
      .catch(() => '');
  }

  async getSuccessNotification(): Promise<string> {
    const msg = this.page.locator('[data-automation-id*="success"], .notification-success').first();
    await msg.waitFor({ timeout: 10000 });
    return msg.innerText();
  }
}
