class githubSignUpPage {

    get signupTitle() { return $('//*[contains (text(), "Sign up for GitHub") and @class = "signup-form-fields__h2"]') }
    get email() { return $('#email') }
    get password() { return $('#password') }
    get username() { return $('#login') }
    get startcountry() { return $('.signup-form-fields__select') }
    
    async setEmailInput(value) {
        await this.email.addValue(value)
    }
    async setPasswordInput(value) {
        await this.password.addValue(value)
    }
    async setUsernameInput(value) {
        await this.username.addValue(value)
    }
    async clickStartCountry(vCountry) {
    await this.startcountry.waitForClickable()
    await this.startcountry.click()
    await browser.keys(vCountry)
    await browser.keys('Enter')
    }
}
export default new githubSignUpPage()

