import { test, expect } from '@playwright/test'
import { InventoryPage } from '../pages/InventoryPage'
import { LoginPage } from '../pages/LoginPage'
import { CartBadge } from '../pages/Components'
import { CartPage } from '../pages/CartPage'

const products = require('../support/fixtures/products.json')

let loginPage
let inventoryPage
let cartBadge
let cartPage

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  inventoryPage = new InventoryPage(page)
  cartBadge = new CartBadge(page)
  cartPage = new CartPage(page)
})


test('add product to cart', async ({ page }) => {
  const productName = products[0].name
  await loginPage.visit()
  await loginPage.submit('standard_user', 'secret_sauce')
  await inventoryPage.verifyUserIsOnInventoryPage()
  await cartBadge.assertHidden()
  await inventoryPage.addToCart(productName)
  await cartBadge.assertVisible()
  await cartBadge.assertItemCount(1)
})

test('remove product from cart', async ({ page }) => {
  const productName = products[1].name
  await loginPage.visit()
  await loginPage.submit('standard_user', 'secret_sauce')
  await inventoryPage.verifyUserIsOnInventoryPage()
  await cartBadge.assertHidden()
  await inventoryPage.addToCart(productName)
  await cartBadge.assertVisible()
  await cartBadge.assertItemCount(1)
  await inventoryPage.removeFromCart(productName)
  await cartBadge.assertHidden()
})

test('continue shopping redirects back to inventory page', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('standard_user', 'secret_sauce')
  await inventoryPage.verifyUserIsOnInventoryPage()
  await cartBadge.openCart()
  await cartPage.clickContinueShopping()
  await inventoryPage.verifyUserIsOnInventoryPage()
})

