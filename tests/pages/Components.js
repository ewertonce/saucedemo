import { expect } from '@playwright/test'

export class CartBadge {
    constructor(page){
        this.page = page

        this.cartIcon = page.locator('.shopping_cart_link')
        this.badge = page.locator('.shopping_cart_badge')
    }

    async openCart(){
        await this.cartIcon.click()
        await expect(this.page).toHaveURL('/cart.html')
        await expect(this.page.getByTestId('title')).toHaveText('Your Cart')
        await expect(this.page.getByTestId('checkout')).toBeVisible()
        await expect(this.page.getByTestId('continue-shopping')).toBeVisible()
    }

    async assertItemCount(expectedCount){
        await expect(this.badge).toHaveText(expectedCount.toString())
    }

    async assertVisible(){
        await expect(this.badge).toBeVisible()
    }

    async assertHidden(){
        await expect(this.badge).toBeHidden()
    }

    async getItemCount(){
        const text = await this.badge.textContent()
        return Number(text)
    }


}

export class BurgerMenu {
    constructor(page) {
        this.page = page
        this.menuButton = page.getByRole('button', { name: 'Open Menu' })
        this.closeMenuIcon = page.getByRole('button', { name: 'Close Menu' })
        this.allItemsLink = page.getByRole('link', { name: 'All Items' })
        this.aboutLink = page.getByRole('link', { name: 'About' })
        this.logoutLink = page.getByRole('link', { name: 'Logout' })
        this.resetAppState = page.getByRole('link', { name: 'Reset App State' })
    }

    async openMenu() {
        await this.menuButton.click()
    }

    async closeMenu() {
        await this.closeMenuIcon.click()
    }

    async clickLogout(){
        await this.logoutLink.click()
    }

    async clickAllItems(){
        await this.allItemsLink.click()
    }

    async clickAbout(){
        await this.aboutLink.click()
    }

    async clickMenuOption(optionName){
        await this.page
            .getByRole('link', { name: optionName })
            .click()
    }

    async assertMenuVisible(){
        await expect(this.allItemsLink).toBeVisible()
        await expect(this.aboutLink).toBeVisible()
        await expect(this.logoutLink).toBeVisible()
        await expect(this.resetAppState).toBeVisible()
        await expect(this.closeMenuIcon).toBeVisible()
    }

    async assertHidden(){
        await expect(this.closeMenuIcon).toBeHidden()
        await expect(this.allItemsLink).toBeHidden()
        await expect(this.aboutLink).toBeHidden()
        await expect(this.logoutLink).toBeHidden()
        await expect(this.resetAppState).toBeHidden()
    }
}