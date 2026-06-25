import { test, expect } from '@playwright/test'
import { InventoryPage } from '../pages/InventoryPage'
import { LoginPage } from '../pages/LoginPage'
import { BurgerMenu, CartBadge } from '../pages/Components'
import { CartPage } from '../pages/CartPage'

const products = require('../support/fixtures/products.json')

let loginPage
let inventoryPage
let cartBadge
let cartPage
let burgerMenu

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  inventoryPage = new InventoryPage(page)
  cartBadge = new CartBadge(page)
  cartPage = new CartPage(page)
  burgerMenu = new BurgerMenu(page)
})


test('open side menu', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('standard_user', 'secret_sauce')
    await inventoryPage.verifyUserIsOnInventoryPage()
    await burgerMenu.openMenu()
    await burgerMenu.assertMenuVisible()
})

test('close side menu', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('standard_user', 'secret_sauce')
    await inventoryPage.verifyUserIsOnInventoryPage()
    await burgerMenu.openMenu()
    await burgerMenu.assertMenuVisible()
    await burgerMenu.closeMenu()
    await burgerMenu.assertHidden()
})

test('open menu All items option', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('standard_user', 'secret_sauce')
    await inventoryPage.verifyUserIsOnInventoryPage()
    await burgerMenu.openMenu()
    await burgerMenu.assertMenuVisible()
    await burgerMenu.clickMenuOption('All Items')
    await inventoryPage.verifyUserIsOnInventoryPage()
})

test('open menu About option', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('standard_user', 'secret_sauce')
    await inventoryPage.verifyUserIsOnInventoryPage()
    await burgerMenu.openMenu()
    await burgerMenu.assertMenuVisible()
    await burgerMenu.clickMenuOption('About')
    await expect(page).toHaveURL('https://saucelabs.com/')
})

test('click on Reset App State option', async ({ page }) => {
    const productName = products[0].name
    await loginPage.visit()
    await loginPage.submit('standard_user', 'secret_sauce')
    await inventoryPage.verifyUserIsOnInventoryPage()
    await cartBadge.assertHidden()
    await inventoryPage.addToCart(productName)
    await cartBadge.assertVisible()
    await cartBadge.assertItemCount(1)
    await burgerMenu.openMenu()
    await burgerMenu.assertMenuVisible()
    await burgerMenu.clickMenuOption('Reset App State')
    await cartBadge.assertHidden()
})