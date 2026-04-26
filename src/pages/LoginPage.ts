import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) { super(page); }

  async navigate(baseUrl: string) {
    await this.page.goto(baseUrl);
    await this.page.waitForSelector('#username, [data-automation-id="user-name"]', { timeout: 30000 });
  }

  async enterUsername(username: string) {
    await this.page.fill('#username, [data-automation-id="user-name"]', username);
  }

  async enterPassword(password: string) {
    await this.page.fill('#password, [data-automation-id="password"]', password);
  }

  async clickSignIn() {
    await this.page.click('#signIn, [data-automation-id="signIn"]');
    await this.waitForPageLoad();
  }

  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickSignIn();
  }

  async getErrorMessage(): Promise<string> {
    const errorLocator = this.page.locator(
      '[data-automation-id="errorMessage"], .error-msg, #loginErrorContainer'
    );
    await errorLocator.waitFor({ timeout: 10000 });
    return errorLocator.innerText();
  }

  async clickForgotPassword() {
    await this.page.click('#forgot-password, [data-automation-id="forgot-password"], text="Forgot Password"');
    await this.waitForPageLoad();
  }

  async isOnLoginPage(): Promise<boolean> {
    return this.page.isVisible('#username, [data-automation-id="user-name"]').catch(() => false);
  }
}
