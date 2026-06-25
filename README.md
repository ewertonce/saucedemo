# Sauce Demo E2E Tests

End-to-end test suite for [saucedemo.com](https://www.saucedemo.com), built with [Playwright](https://playwright.dev/) and JavaScript. Implemented using the Page Object Model to keep test scenarios readable and selectors maintainable.

## Tech stack

- [Playwright Test](https://playwright.dev/docs/intro)
- Node.js / JavaScript

## Prerequisites

- Node.js (LTS recommended)

## Setup

```bash
npm install
npx playwright install
```

## Running the tests

```bash
# Run the full suite headlessly
npx playwright test

# Run a single spec file
npx playwright test tests/e2e/login.spec.js

# Run a single test by name
npx playwright test -g "sucessfull login with standard user"

# Run with the Playwright UI mode
npx playwright test --ui

# Run headed, with the inspector
npx playwright test --debug

# View the HTML report after a run
npx playwright show-report
```

## Project structure

```
tests/
├── e2e/                  # Test specs, organized by feature
│   ├── login.spec.js
│   ├── products.spec.js
│   ├── cart.spec.js
│   ├── checkout.spec.js
│   └── sidemenu.spec.js
├── pages/                # Page Object Model classes
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   └── Components.js     # Shared UI fragments (cart badge, burger menu)
└── support/
    └── fixtures/         # Test data (product catalog)
```

## Coverage

- **Login**: successful login, invalid credentials, locked-out user, logout
- **Products**: inventory listing, navigating to a product's detail page, adding/removing items, sorting by name and price
- **Cart**: adding/removing products, continuing shopping
- **Checkout**: the full three-step checkout flow, including cancel paths
- **Side menu**: opening/closing the menu, navigation links, resetting app state

## Configuration

Test configuration lives in [`playwright.config.js`](./playwright.config.js), including the target `baseURL`, retry/parallelism settings, and enabled browser projects (Chromium by default).
