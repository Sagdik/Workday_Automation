import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { TimeOffPage } from '../pages/TimeOffPage';
import { PersonalInfoPage } from '../pages/PersonalInfoPage';
import { PayslipPage } from '../pages/PayslipPage';
import { ExpensePage } from '../pages/ExpensePage';
import { BenefitsPage } from '../pages/BenefitsPage';
import { InboxPage } from '../pages/InboxPage';
import { RecruitingPage } from '../pages/RecruitingPage';

class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  testData: Record<string, any> = {};

  loginPage!: LoginPage;
  homePage!: HomePage;
  timeOffPage!: TimeOffPage;
  personalInfoPage!: PersonalInfoPage;
  payslipPage!: PayslipPage;
  expensePage!: ExpensePage;
  benefitsPage!: BenefitsPage;
  inboxPage!: InboxPage;
  recruitingPage!: RecruitingPage;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init() {
    this.browser = await chromium.launch({
      headless: false,
      args: ['--disable-blink-features=AutomationControlled']
    });
    this.context = await this.browser.newContext({
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      viewport: { width: 1280, height: 800 }
    });
    await this.context.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    });
    this.page = await this.context.newPage();
    this.loginPage = new LoginPage(this.page);
    this.homePage = new HomePage(this.page);
    this.timeOffPage = new TimeOffPage(this.page);
    this.personalInfoPage = new PersonalInfoPage(this.page);
    this.payslipPage = new PayslipPage(this.page);
    this.expensePage = new ExpensePage(this.page);
    this.benefitsPage = new BenefitsPage(this.page);
    this.inboxPage = new InboxPage(this.page);
    this.recruitingPage = new RecruitingPage(this.page);
  }

  async close() {
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
