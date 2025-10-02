class iHerbPage {

    get signIn() { return $('.username-sign-in') }
    get acceptCookies() {return $('//*[contains(@class,"truste-button2") and text() = "Accept All "]')}
    get noThanks() {return $('.welcome-no-thanks')}
    get Supplements() {return $('//*[contains(@class,"link-bar-item") and @href="https://bg.iherb.com/c/supplements"]')}
    get AminoAcid() {return $('[href="https://bg.iherb.com/c/amino-acids-blends"]')}
    get TNO() {return $('//*[contains(@class,"new-brand-logo") and @alt = "TNO"]')}

    async clickSignIn() {
        await this.signIn.click()
    }
    async clickAcceptCookies() {
        await this.acceptCookies.waitForClickable()
        await this.acceptCookies.click()
    }
    async clickNoThanks() {
        await this.noThanks.waitForClickable()
        await this.noThanks.click()
    }
    async clickmoveToSupplements() {
        await this.Supplements.moveTo()
    }
    async clickAminoAcid() {
        await this.AminoAcid.waitForClickable()
        await this.AminoAcid.click()
    }
    async clickTNO() {
        await this.TNO.moveTo()
        await this.TNO.click()
    }

}
export default new iHerbPage()