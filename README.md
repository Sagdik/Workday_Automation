# Workday Automation

End-to-end test automation framework for **Workday HCM** built with Playwright and Cucumber BDD in TypeScript.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev) | Browser automation (Chromium) |
| [Cucumber.js](https://cucumber.io) | BDD / Gherkin step runner |
| [TypeScript](https://www.typescriptlang.org) | Type-safe test code |
| [ts-node](https://typestrong.org/ts-node) | Run TypeScript without pre-compiling |

---

## Project Structure

```
├── features/
│   └── workday/
│       ├── 01_login.feature
│       ├── 02_dashboard.feature
│       ├── 03_time_off.feature
│       ├── 04_personal_info.feature
│       ├── 05_payroll.feature
│       ├── 06_expenses.feature
│       ├── 07_benefits.feature
│       ├── 08_inbox.feature
│       ├── 09_manager.feature
│       └── 10_recruiting.feature
├── src/
│   ├── config/
│   │   └── env.ts                  # Environment config (URL, credentials)
│   ├── hooks/
│   │   ├── world.ts                # Custom Cucumber world with page objects
│   │   └── hooks.ts                # Before/After hooks, screenshot on failure
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── HomePage.ts
│   │   ├── TimeOffPage.ts
│   │   ├── PersonalInfoPage.ts
│   │   ├── PayslipPage.ts
│   │   ├── ExpensePage.ts
│   │   ├── BenefitsPage.ts
│   │   ├── InboxPage.ts
│   │   └── RecruitingPage.ts
│   └── steps/
│       └── workday/
│           ├── login.steps.ts
│           ├── dashboard.steps.ts
│           ├── time_off.steps.ts
│           ├── personal_info.steps.ts
│           ├── payroll.steps.ts
│           ├── expenses.steps.ts
│           ├── benefits.steps.ts
│           ├── inbox.steps.ts
│           ├── manager.steps.ts
│           └── recruiting.steps.ts
├── reports/                        # JSON test reports (auto-generated)
├── .env.example                    # Environment variables template
├── cucumber.js                     # Cucumber configuration
├── playwright.config.ts
└── tsconfig.json
```

---

## Setup

**1. Install dependencies**
```bash
npm install
```

**2. Install Playwright browser**
```bash
npx playwright install chromium
```

**3. Configure environment**
```bash
cp .env.example .env
```

Edit `.env` with your Workday credentials:
```
WORKDAY_URL=https://yourcompany.workday.com/yourcompany/login.htmld
WORKDAY_USERNAME=your.email@company.com
WORKDAY_PASSWORD=YourPassword
WORKDAY_MANAGER_USERNAME=manager.email@company.com
WORKDAY_MANAGER_PASSWORD=ManagerPassword
```

---

## Run Tests

```bash
# Run all scenarios
npm test

# Run a specific feature file
npx cucumber-js features/workday/03_time_off.feature

# Run a specific module by tag
npx cucumber-js --tags "@login"
```

Test reports are saved to `reports/cucumber-report.json` after each run.

---

## Test Scenarios — 42 Scenarios across 10 Modules

| # | Module | Scenarios |
|---|---|---|
| 01 | **Login** | Valid login, invalid password, invalid username, empty credentials, forgot password |
| 02 | **Dashboard** | Worklet visibility, navigate to Time Off / Pay / Benefits, global search, sign out |
| 03 | **Time Off** | View balance, request vacation, request sick leave, cancel form, view history |
| 04 | **Personal Info** | View name, contact info, emergency contact, job details |
| 05 | **Payroll** | List payslips, net/gross pay, tax withheld, tax documents |
| 06 | **Expenses** | View reports, create hotel / meal / transport expense reports |
| 07 | **Benefits** | Medical, Dental, Vision plans, retirement contribution |
| 08 | **Inbox** | View items, approve action items, open items |
| 09 | **Manager** | View team, team calendar, search employee, bulk approve inbox |
| 10 | **Recruiting** | Browse jobs, search by keyword, view job details, filter by department |

---

## Architecture

### Page Object Model
Each Workday module has a dedicated Page Object class under `src/pages/`. All selectors use Workday's native `data-automation-id` attributes for stability.

### Custom World
`src/hooks/world.ts` extends Cucumber's `World` class and instantiates all page objects on browser init — accessible in every step as `this.loginPage`, `this.homePage`, `this.timeOffPage`, etc.

### Hooks
- **Before** — launches a Chromium browser with anti-detection settings and a realistic user agent
- **After** — takes a screenshot and attaches it to the report on any failed scenario, then closes the browser

---

## Notes

- Tests run in **headed mode** by default (visible browser) — change `headless: false` to `true` in `src/hooks/world.ts` for CI runs
- Credentials are loaded from environment variables — never commit your `.env` file
