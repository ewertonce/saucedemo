const { expect } = require('@playwright/test')

export class CheckoutPage {

    constructor(page) {
        this.page = page
    }

    async verifyUserIsOnCheckoutStepOnePage() {
        await expect(this.page).toHaveURL('/checkout-step-one.html')
        await expect(
            this.page.getByTestId('title'))
            .toHaveText('Checkout: Your Information')
    }

    async verifyUserIsOnCheckoutStepTwoPage() {
        await expect(this.page).toHaveURL('/checkout-step-two.html')
        await expect(
            this.page.getByTestId('title'))
            .toHaveText('Checkout: Overview')
        await expect(this.page.getByRole('button', { name: 'finish'})).toBeVisible()
    }

    async verifyUserIsOnCheckoutCompletePage() {
        await expect(this.page).toHaveURL('/checkout-complete.html')
        await expect(
            this.page.getByTestId('title'))
            .toHaveText('Checkout: Complete!')
        await expect(this.page.getByRole('heading')).toHaveText('Thank you for your order!')
        await expect(this.page.getByRole('button', { name: 'Back Home'})).toBeVisible()
    }

    async submitYourInformation(firstName, lastName, zipcode){
        await this.page.getByPlaceholder('First Name').fill(firstName)
        await this.page.getByPlaceholder('Last Name').fill(lastName)
        await this.page.getByPlaceholder('Zip/Postal Code').fill(zipcode)
        await this.page.getByRole('button', { name: 'continue'} ).click()
    }

    async finishCheckout(){
        await this.verifyUserIsOnCheckoutStepTwoPage()
        await this.page.getByRole('button', { name: 'finish' }).click()
    }

    async goBackHome(){
        await this.page.getByRole('button', { name: 'Back Home'}).click()
    }

    async cancel(){
        await this.page.getByRole('button', { name: 'cancel'}).click()
    }

}