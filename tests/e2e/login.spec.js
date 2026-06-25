import { test, expect } from '@playwright/test'
import { BurgerMenu } from '../pages/Components'
import { InventoryPage } from '../pages/InventoryPage'
import { LoginPage } from '../pages/LoginPage'

let loginPage
let inventoryPage
let burgerMenu

test.beforeEach( async ( { page }) => {
  loginPage = new LoginPage(page)
  inventoryPage = new InventoryPage(page)
  burgerMenu = new BurgerMenu(page)
})

test('has title', async ({ page }) => {
  await loginPage.visit()
})

test('sucessfull login with standard user', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('standard_user','secret_sauce')
  await inventoryPage.verifyUserIsOnInventoryPage()
})

test('wrong login with standard user', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('standard_user','abc123')
  const message = 'Epic sadface: Username and password do not match any user in this service'
  await loginPage.assertAlertMessage(message)
  await loginPage.verifyUserIsOnLoginPage()
})

test('login with locked user', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('locked_out_user','secret_sauce')
  const message = 'Epic sadface: Sorry, this user has been locked out.'
  await loginPage.assertAlertMessage(message)
  await loginPage.isLoginButtonVisible()
  await loginPage.verifyUserIsOnLoginPage()
})

test('sucessfull logout with standard user', async ({ page }) => {
  await loginPage.visit()
  await loginPage.submit('standard_user','secret_sauce')
  await inventoryPage.verifyUserIsOnInventoryPage()
  await burgerMenu.openMenu()
  await burgerMenu.assertMenuVisible()
  await burgerMenu.clickMenuOption('Logout')
  await loginPage.verifyUserIsOnLoginPage()
})