# Workday Automation

End-to-end test automation framework built with **Playwright** and **Cucumber (BDD)** in TypeScript.

## Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev) | Browser automation |
| [Cucumber.js](https://cucumber.io) | BDD / Gherkin step runner |
| [TypeScript](https://www.typescriptlang.org) | Type-safe test code |
| [ts-node](https://typestrong.org/ts-node) | Run TS without pre-compiling |

## Project Structure

```
├── features/               # Gherkin feature files
│   ├── test.feature        # Basic smoke test
│   └── amazon_cart.feature # Amazon cart flow
├── src/
│   ├── hooks/
│   │   ├── world.ts        # Custom Cucumber world (browser setup)
│   │   └── hooks.ts        # Before/After hooks
│   └── steps/
│       ├── test.steps.ts         # Basic step definitions
│       └── amazon_cart.steps.ts  # Amazon cart step definitions
├── cucumber.js             # Cucumber configuration
├── playwright.config.ts    # Playwright configuration
└── tsconfig.json
```

## Setup

```bash
npm install
npx playwright install chromium
```

## Run Tests

```bash
# Run all feature files
npm test

# Run a specific feature
npx cucumber-js features/amazon_cart.feature
```

## Scenarios Covered

- **Basic Test** — Opens Google
- **Amazon Cart** — Searches for a 55-inch LG TV, adds it to the cart, and verifies the cart
