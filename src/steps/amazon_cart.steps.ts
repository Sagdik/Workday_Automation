import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('I open Amazon', async function () {
  await this.page.goto('https://www.amazon.com');
  await this.page.waitForSelector('#twotabsearchtextbox');
});

When('I search for {string}', async function (searchTerm: string) {
  await this.page.fill('#twotabsearchtextbox', searchTerm);
  await this.page.click('#nav-search-submit-button');
  await this.page.waitForSelector('[data-component-type="s-search-result"]');
});

const ADD_TO_CART_SELECTOR =
  '#add-to-cart-button, input[name="submit.add-to-cart"], #submit.add-to-cart-announce, #addToCart_feature_div input[type="submit"]';

When('I open the first search result', async function () {
  await this.page.waitForSelector(
    '[data-component-type="s-search-result"], [data-asin]:not([data-asin=""])',
    { timeout: 30000 }
  );
  const firstResult = this.page
    .locator('[data-component-type="s-search-result"]')
    .first();

  // Amazon renders <a class="s-link-style"><h2 aria-label="..."> — link wraps h2
  const productTitle = firstResult.locator('h2[aria-label]').first();
  this.testData.productName = await productTitle.getAttribute('aria-label', { timeout: 10000 }) ?? '';

  const productLink = firstResult.locator('a.s-link-style').first();
  await productLink.click();

  // Product pages for TVs may require a variant to be selected before showing Add to Cart
  await this.page.waitForLoadState('domcontentloaded');
  await this.page.waitForTimeout(2000);

  const hasVariants = await this.page.locator('#twister, #variation_style_name, #variation_size_name').isVisible().catch(() => false);
  if (hasVariants) {
    // Pick the first available (in-stock) swatch/option
    const firstSwatch = this.page.locator('#twister .swatchAvailable, #twister li:not(.unselected) label').first();
    if (await firstSwatch.isVisible().catch(() => false)) {
      await firstSwatch.click();
      await this.page.waitForTimeout(1000);
    }
  }

  await this.page.waitForSelector(ADD_TO_CART_SELECTOR, { timeout: 30000 });
});

When('I add the product to the cart', async function () {
  await this.page.locator(ADD_TO_CART_SELECTOR).first().click();

  // Dismiss upsell modals (Subscribe & Save, protection plan, etc.)
  const dismissSelectors = [
    '#attachSiNoCoverage',
    '#siNoCoverage-announce',
    'input[name="submit.add-to-cart-announce"]',
    '#noThanks_feature_div input',
  ];
  for (const sel of dismissSelectors) {
    const btn = this.page.locator(sel).first();
    if (await btn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await btn.click();
      break;
    }
  }

  await this.page.waitForSelector(
    '#NATC_SMART_WAGON_CONF_MSG_SUCCESS, .a-alert-success, #huc-v2-order-row-confirm-text',
    { timeout: 15000 }
  );
});

Then('I should see the item in the cart', async function () {
  await this.page.goto('https://www.amazon.com/cart');
  await this.page.waitForSelector('[data-name="Active Items"]');
  const cartItems = this.page.locator('.sc-list-item[data-itemtype="active"]');
  await expect(cartItems).not.toHaveCount(0);
});
