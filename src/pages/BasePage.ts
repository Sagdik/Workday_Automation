import { Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected page: Page) {}

  protected by(automationId: string) {
    return `[data-automation-id="${automationId}"]`;
  }

  async waitForSpinner() {
    const spinner = this.page.locator(
      '[data-automation-id="loading"], [data-automation-id="processingIndicator"]'
    );
    await spinner.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.waitForSpinner();
  }
}
