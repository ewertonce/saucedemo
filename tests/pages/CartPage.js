import { todo } from 'node:test'

const { expect } = require('@playwright/test')

export class CartPage {

    constructor(page) {
        this.page = page
    }

    async verifyUserIsOnCartPage() {
        await expect(this.page).toHaveURL('/cart.html')
        await expect(
            this.page.getByTestId('title'))
            .toHaveText('Your Cart')
        await this.page.getByRole(
            'button', { name: 'Continue Shopping'})
            .click()
    }

    async clickContinueShopping() {
        await expect(this.page).toHaveURL('/cart.html')
        await this.page.getByRole('button', { name: 'Continue Shopping'}).click()
        await expect(this.page).toHaveURL('/inventory.html')
    }

    async clickCheckout() {
        await expect(this.page).toHaveURL('/cart.html')
        await this.page.getByRole('button', { name: 'Checkout'}).click()
        await expect(this.page).toHaveURL('/checkout-step-one.html')
    }

    async removeItem(name){
        todo
    }

}