import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) { super(page); }

  async isLoaded(): Promise<boolean> {
    return this.page.isVisible(
      '[data-automation-id="globalNav"], [data-automation-id="homePageWorklets"]'
    ).catch(() => false);
  }

  async isWorkletVisible(workletName: string): Promise<boolean> {
    return this.page
      .isVisible(`[data-automation-id="${workletName}Worklet"], [title="${workletName}"], text="${workletName}"`)
      .catch(() => false);
  }

  async clickWorklet(workletName: string) {
    await this.page.click(
      `[data-automation-id="${workletName}Worklet"], [title="${workletName}"], text="${workletName}"`
    );
    await this.waitForPageLoad();
  }

  async globalSearch(query: string) {
    await this.page.click(
      '[data-automation-id="globalSearchButton"], [data-automation-id="globalSearchInput"]'
    );
    await this.page.fill('[data-automation-id="globalSearchInput"]', query);
    await this.page.keyboard.press('Enter');
    await this.waitForPageLoad();
  }

  async openProfileMenu() {
    await this.page.click('[data-automation-id="profileMenuButton"], #wd-AccountDropdown');
    await this.page.waitForSelector(
      '[data-automation-id="signOut"], [data-automation-id="AccountMenuSignOutLink"]'
    );
  }

  async signOut() {
    await this.openProfileMenu();
    await this.page.click(
      '[data-automation-id="signOut"], [data-automation-id="AccountMenuSignOutLink"]'
    );
    await this.waitForPageLoad();
  }

  async getSearchResults(): Promise<string[]> {
    const results = this.page.locator('[data-automation-id*="searchResult"], [data-automation-id*="result"]');
    await results.first().waitFor({ timeout: 15000 });
    return results.allInnerTexts();
  }
}
