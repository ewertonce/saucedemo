# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This repository contains only a Playwright end-to-end test suite — there is no application source code here. The tests run against the live public demo site **https://www.saucedemo.com** (configured as `baseURL` in `playwright.config.js`), exercising its login, inventory/products, cart, checkout, and side-menu flows.

## Commands

There are no npm scripts defined in `package.json`, so invoke the Playwright CLI directly via `npx`.

```bash
# Run the full suite (headless, Chromium only — the only enabled project)
npx playwright test

# Run a single spec file
npx playwright test tests/e2e/login.spec.js

# Run a single test by name
npx playwright test -g "sucessfull login with standard user"

# Run with the Playwright UI mode (useful for debugging selectors)
npx playwright test --ui

# Run headed, with the inspector
npx playwright test --debug

# View the HTML report after a run
npx playwright show-report
```

Firefox, WebKit, and mobile-viewport projects are defined in `playwright.config.js` but commented out — only `chromium` is active.

There is no linter or build step configured.

## Architecture

### Page Object Model

Tests never query selectors directly; they go through page objects in `tests/pages/`, one class per app screen, each constructed with the Playwright `page` fixture:

- `LoginPage` — login form, login validation, error alerts
- `InventoryPage` — product listing, add/remove cart items, sorting, navigating to an item detail page
- `CartPage` — cart screen actions (checkout, continue shopping)
- `CheckoutPage` — the three-step checkout flow (info form → overview → complete)
- `Components.js` — shared cross-page UI fragments rather than full pages: `CartBadge` (the cart icon + item-count badge, present on every page) and `BurgerMenu` (the side nav: All Items / About / Logout / Reset App State)

Page object methods are intentionally end-to-end-ish: many of them both perform an action *and* assert the expected resulting state (e.g. `InventoryPage.addToCart()` clicks "Add to cart" and then asserts the button flipped to "Remove"; `LoginPage.visit()` navigates and asserts the login page loaded). Follow this convention when adding methods rather than separating act/assert into different calls — it's the established style across all page objects.

Tests instantiate the page objects they need in a `test.beforeEach`, then call into them — they don't talk to `page` directly except for occasional one-off assertions (e.g. `expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(6)`).

### Fixtures

`tests/support/fixtures/products.json` holds the catalog of the 6 demo products (name/price/description) so tests can reference product names/prices by data rather than hardcoding strings inline. Note some `price` values include a `$` prefix and some don't — be careful when parsing.

### Test credentials

The Sauce Demo site's seeded accounts are used directly in tests (no env vars / secrets needed since this is a public demo app):
- `standard_user` / `secret_sauce` — normal login, used in nearly every test
- `locked_out_user` / `secret_sauce` — used in `login.spec.js` to test the locked-account error path

### Module syntax note

`package.json` sets `"type": "commonjs"`, but page object files use ES `export class` syntax while still pulling in `expect` via `require('@playwright/test')` (some files use the ESM `import` form for `expect` instead — there's no consistent convention, so match whichever style is already used in the file you're editing). Playwright's test runner transpiles this; it works under `npx playwright test` even though the syntax is mixed.

### Known incomplete code

`CartPage.removeItem()` (`tests/pages/CartPage.js`) is an unimplemented stub (`todo` from `node:test`) — no test currently exercises removing an item from the cart page itself (only `InventoryPage.removeFromCart()` is covered, which removes from the inventory listing rather than the cart page).
