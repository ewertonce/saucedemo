import { test, expect } from '@playwright/test'

import { InventoryPage } from '../pages/InventoryPage'
import { LoginPage } from '../pages/LoginPage'
import { CartPage } from '../pages/CartPage'
import { CartBadge } from '../pages/Components'
import { CheckoutPage } from '../pages/CheckoutPage'

const products = require('../support/fixtures/products.json')

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

test('validate products listing', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('standard_user', 'secret_sauce')
  await inventoryPage.verifyUserIsOnInventoryPage()
})

test('navigate to cart page', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('standard_user', 'secret_sauce')
  await inventoryPage.verifyUserIsOnInventoryPage()
  await cartBadge.openCart()
  await cartPage.verifyUserIsOnCartPage()
})

test('navigate to item page', async ({ page }) => {
  const productName = products[0].name
  await loginPage.visit()
  await loginPage.submit('standard_user', 'secret_sauce')
  await inventoryPage.verifyUserIsOnInventoryPage()
  await inventoryPage.openItemPage(productName)
})

test('should add 6 items to cart', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('standard_user', 'secret_sauce')
  await inventoryPage.verifyUserIsOnInventoryPage()
  for (const product of products) {
    await inventoryPage.addToCart(product.name)
  }
  await cartBadge.assertItemCount(6)
  await inventoryPage.assertRemoveButtonCount(6)
})

test('should remove 6 items to cart', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('standard_user', 'secret_sauce')
  await inventoryPage.verifyUserIsOnInventoryPage()
  for (const product of products) {
    await inventoryPage.addToCart(product.name)
  }
  await cartBadge.assertItemCount(6)
  await inventoryPage.assertRemoveButtonCount(6)
  // remove all after this step
  for (const product of products) {
    await inventoryPage.removeFromCart(product.name)
  }
  await cartBadge.assertHidden()
  await inventoryPage.assertAddToCartButtonCount(6)
})

test('should sort products by name A-Z', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('standard_user', 'secret_sauce')
  await inventoryPage.verifyUserIsOnInventoryPage()
  await inventoryPage.selectSortOption('Name (A to Z)')
  const actualNames = await inventoryPage.getProductNames()
  const expectedNames = [...actualNames].sort((a, b) => a.localeCompare(b))

  expect(actualNames).toEqual(expectedNames)
  await inventoryPage.assertProductCount(6)
})

test('should sort products by name Z-A', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('standard_user', 'secret_sauce')
  await inventoryPage.verifyUserIsOnInventoryPage()
  await inventoryPage.selectSortOption('Name (Z to A)')
  const actualNames = await inventoryPage.getProductNames()
  const expectedNames = [...actualNames].sort((a, b) => b.localeCompare(a))

  expect(actualNames).toEqual(expectedNames)
  await inventoryPage.assertProductCount(6)
})

test('should sort products by price low to high', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('standard_user', 'secret_sauce')
  await inventoryPage.verifyUserIsOnInventoryPage()
  await inventoryPage.selectSortOption('Price (low to high)')
  const actualPrices = await inventoryPage.getProductPrices()
  const expectedPrices = [...actualPrices].sort((a, b) => a - b)

  expect(actualPrices).toEqual(expectedPrices)
  await inventoryPage.assertProductCount(6)
})

test('should sort products by price high to low', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('standard_user', 'secret_sauce')
  await inventoryPage.verifyUserIsOnInventoryPage()
  await inventoryPage.selectSortOption('Price (high to low)')
  const actualPrices = await inventoryPage.getProductPrices()
  const expectedPrices = [...actualPrices].sort((a, b) => b - a)

  expect(actualPrices).toEqual(expectedPrices)
  await inventoryPage.assertProductCount(6)
})