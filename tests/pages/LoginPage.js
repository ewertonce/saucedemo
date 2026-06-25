const { expect } = require('@playwright/test')

export class LoginPage {

    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('/')
        await expect(this.page).toHaveTitle('Swag Labs')
        await this.verifyUserIsOnLoginPage()
    }

    async verifyUserIsOnLoginPage() {
        await expect(this.page).toHaveTitle('Swag Labs')
        await expect(this.page.locator('.login_logo')).toHaveText('Swag Labs')
        await expect(this.page.getByRole('button', { name: 'Login' })).toBeVisible()
    }

    async submit(username, password) {
        await this.page.getByPlaceholder('Username').fill(username)
        await this.page.getByPlaceholder('Password').fill(password)
        await this.page.getByText('Login').click()
    }

    async assertAlertMessage(message){
        const alert = this.page.locator('h3[data-test$=error]')
        await expect(alert).toHaveText(message)
    }

    async isLoginButtonVisible(){
        await expect(this.page.getByTestId('login-button')).toBeVisible()
    }
}