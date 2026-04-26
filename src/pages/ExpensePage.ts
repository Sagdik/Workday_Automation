import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ExpensePage extends BasePage {
  constructor(page: Page) { super(page); }

  async isLoaded(): Promise<boolean> {
    return this.page.isVisible('[data-automation-id*="expense"], text="Expenses"').catch(() => false);
  }

  async clickCreateExpenseReport() {
    await this.page.click(
      '[data-automation-id*="createExpense"], button:has-text("Create Expense Report")'
    );
    await this.waitForPageLoad();
  }

  async enterReportTitle(title: string) {
    await this.page.fill(
      '[data-automation-id*="expenseMemo"] input, [data-automation-id*="reportTitle"] input',
      title
    );
  }

  async clickAddExpenseLine() {
    await this.page.click('[data-automation-id*="addExpense"], button:has-text("Add")');
    await this.waitForPageLoad();
  }

  async selectExpenseType(type: string) {
    await this.page.click('[data-automation-id*="expenseType"] input');
    await this.page.fill('[data-automation-id*="expenseType"] input', type);
    await this.page.click(`[role="option"]:has-text("${type}")`);
  }

  async enterAmount(amount: string) {
    await this.page.fill('[data-automation-id*="amount"] input', amount);
  }

  async enterExpenseDate(date: string) {
    const dateInput = this.page.locator('[data-automation-id*="expenseDate"] input').first();
    await dateInput.clear();
    await dateInput.fill(date);
    await this.page.keyboard.press('Tab');
  }

  async enterMemo(memo: string) {
    await this.page.fill('[data-automation-id*="memo"] input', memo);
  }

  async clickSubmitReport() {
    await this.page.click('[data-automation-id*="submit"], button:has-text("Submit")');
    await this.waitForPageLoad();
  }

  async getExpenseReportStatus(): Promise<string> {
    return this.page.innerText('[data-automation-id*="status"]').catch(() => '');
  }

  async getExpenseReportCount(): Promise<number> {
    return this.page.locator('[data-automation-id*="expenseReport"]').count();
  }
}
