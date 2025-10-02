class githubNewsletterPage {

    get NewsletterTitle() { return $('//*[contains(text(), "Subscribe to our developer newsletter") and @class = "Primer_Brand__Heading-module__Heading___IVpmp Primer_Brand__Heading-module__Heading-font--mona-sans___SCnTx Primer_Brand__Heading-module__Heading--1___Ufc7G Primer_Brand__Hero-module__Hero-heading___QuVBH"]') }
    get WorkEmailTitle() { return $('//*[contains (text(), "Work Email") and @class = "Primer_Brand__FormControl-module__FormControl-label___meeuB Primer_Brand__FormControl-module__FormControl-label--medium___inrKd"]') }
    get EmailInput() { return $('.//span[contains(@class, "TextInput-wrapper")]//input') }
    get countrySelect() { return $('#FormControl--country') }
    get checkBox() { return $('#gated-agree-marketingEmailOptin1') }
    get subscribe() { return $('(//*[contains(text(), "Subscribe") and contains(@class, "Button--label-primary")])[1]') }



    async setEmailInput(value) {
        await this.EmailInput.addValue(value)
    }
    async clickOncountrySelect(vCountry) {
        await this.countrySelect.click()
        await browser.keys(vCountry)
        await browser.keys('Enter')
    }
    async clickOnCheckbox() {
        await this.checkBox.click()
    }
    async clickOnSubscribe() {
        await this.subscribe.click()
    }

}
export default new githubNewsletterPage()