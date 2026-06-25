import { test, expect } from '@playwright/test'

import { InventoryPage } from '../pages/InventoryPage'
import { LoginPage } from '../pages/LoginPage'
import { CartPage } from '../pages/CartPage'
import { CartBadge } from '../pages/Components'
import { CheckoutPage } from '../pages/CheckoutPage'


let loginPage
let inventoryPage
let cartPage
let checkoutPage
let cartBadge

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  inventoryPage = new InventoryPage(page)
  cartPage = new CartPage(page)
  checkoutPage = new CheckoutPage(page)
  cartBadge = new CartBadge(page)
})


test('checkout button redirects to checkout step one page', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('standard_user', 'secret_sauce')
  await inventoryPage.verifyUserIsOnInventoryPage()
  await cartBadge.openCart()
  await cartPage.clickCheckout()
  await checkoutPage.verifyUserIsOnCheckoutStepOnePage()
})

test('redirects to checkout step two page', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('standard_user', 'secret_sauce')
  await inventoryPage.verifyUserIsOnInventoryPage()
  await cartBadge.openCart()
  await cartPage.clickCheckout()
  await checkoutPage.verifyUserIsOnCheckoutStepOnePage()
  await checkoutPage.submitYourInformation('Adam', 'Smith', '31233')
  await checkoutPage.verifyUserIsOnCheckoutStepTwoPage()
})

test('completes checkout flow with empty cart', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('standard_user', 'secret_sauce')
  await inventoryPage.verifyUserIsOnInventoryPage()
  await cartBadge.openCart()
  await cartPage.clickCheckout()
  await checkoutPage.verifyUserIsOnCheckoutStepOnePage()
  await checkoutPage.submitYourInformation('Adam', 'Smith', '31233')
  await checkoutPage.verifyUserIsOnCheckoutStepTwoPage()
  await checkoutPage.finishCheckout()
  await checkoutPage.verifyUserIsOnCheckoutCompletePage()
})

test('completes checkout flow and return home', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('standard_user', 'secret_sauce')
  await inventoryPage.verifyUserIsOnInventoryPage()
  await cartBadge.openCart()
  await cartPage.clickCheckout()
  await checkoutPage.verifyUserIsOnCheckoutStepOnePage()
  await checkoutPage.submitYourInformation('Adam', 'Smith', '31233')
  await checkoutPage.verifyUserIsOnCheckoutStepTwoPage()
  await checkoutPage.finishCheckout()
  await checkoutPage.verifyUserIsOnCheckoutCompletePage()
  await checkoutPage.goBackHome()
  await inventoryPage.verifyUserIsOnInventoryPage()
})

test('cancel checkout step1 flow and return to cart', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('standard_user', 'secret_sauce')
  await inventoryPage.verifyUserIsOnInventoryPage()
  await cartBadge.openCart()
  await cartPage.clickCheckout()
  await checkoutPage.verifyUserIsOnCheckoutStepOnePage()
  await checkoutPage.cancel()
  await cartPage.verifyUserIsOnCartPage()
})

test('cancel checkout step2 flow and return to inventory', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('standard_user', 'secret_sauce')
  await inventoryPage.verifyUserIsOnInventoryPage()
  await cartBadge.openCart()
  await cartPage.clickCheckout()
  await checkoutPage.verifyUserIsOnCheckoutStepOnePage()
  await checkoutPage.submitYourInformation('Adam', 'Smith', '31233')
  await checkoutPage.verifyUserIsOnCheckoutStepTwoPage()
  await checkoutPage.cancel()
  await inventoryPage.verifyUserIsOnInventoryPage()
})