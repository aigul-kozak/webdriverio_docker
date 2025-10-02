class LoginPage {
    get username() { return $('#username') }
    get password() { return $('#password') }
    get LoginButton() { return $('.radius') }

    async setUsernameInput(value) {
        await this.username.addValue(value)
    }
    async setPasswordInput(value) {
        await this.password.addValue(value)
    }
    async clickOnLoginBtn() {
        await this.LoginButton.click()
    }
}

export default new LoginPage() 