const { expect } = require('@playwright/test')

export class InventoryPage {

    constructor(page) {
        this.page = page
    }

    async verifyUserIsOnInventoryPage() {
        await expect(this.page).toHaveURL('/inventory.html')
        await expect(
            this.page.locator('[data-test="title"]')).
            toHaveText('Products')
        const products = this.page.locator('.inventory_item')
        await expect(products).toHaveCount(6)
        const buttons = this.page.locator('//button[text()="Add to cart"]')
        await expect(buttons).toHaveCount(6)
    }

    async logout(){
        await this.page.locator('#react-burger-menu-btn').click()
        await this.page.getByText('Logout').click()
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL('/')
        await expect(this.page.locator('[data-test="login-button"]')).toBeVisible()
    }

    async openItemPage(itemName){
        await this.page.locator('.inventory_item_name').filter({ hasText: itemName}).click()
        await expect(this.page).toHaveURL(/.*inventory-item.*/)
        await expect(this.page.getByTestId('back-to-products')).toBeVisible()
        await expect(this.page.getByText(itemName)).toBeVisible()
    }

    async addToCart(itemName){
        await this.page.locator('.inventory_item')
            .filter({ hasText: itemName})
            .getByRole('button', { name: 'Add to cart' })
            .click()
        await expect(this.page.locator('.inventory_item')
            .filter( {hasText: itemName})
            .getByRole('button', {name: 'Remove' })
        ).toBeVisible()
    }

    async removeFromCart(itemName){
        await this.page.locator('.inventory_item')
            .filter({ hasText: itemName})
            .getByRole('button', { name: 'Remove' })
            .click()
        await expect(this.page.locator('.inventory_item')
            .filter( {hasText: itemName})
            .getByRole('button', {name: 'Add to cart' })
        ).toBeVisible()
    }

    async selectSortOption(optionText){
        await this.page.getByTestId('product-sort-container').selectOption({ label: optionText })
    }

    async getProductNames(){
        return await this.page
            .getByTestId('inventory_item_name')
            .allTextContents()
    }

    async getProductPrices(){
        const prices = await this.page
            .locator('.inventory_item_price')
            .allTextContents()

        return prices.map(price =>
            Number(price.replace('$', ''))
        )
    }

    async assertProductCount(count){
        await expect(this.page.getByTestId('inventory-item')).toHaveCount(count)
    }

    async assertAddToCartButtonCount(count){
        await expect(this.page.getByRole('button', { name: 'Add to cart' })).toHaveCount(count)
    }

    async assertRemoveButtonCount(count){
        await expect(this.page.getByRole('button', { name: 'Remove' })).toHaveCount(count)
    }

}