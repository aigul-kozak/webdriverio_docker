class githubPricingPage {

    get TryTitle() { return $('//*[contains (text(), "Try the Copilot-powered platform") and @class = "h2-mktg"]') }
    get CompareLink() { return $('//*[contains (text(), "Compare all features") and @href = "#compare-features"]') }
    get CompareFeaturesTitle() { return $('//*[contains (text(), "Compare features") and @class= "h1"]') }

    async clickCompareLink() {
        await this.CompareLink.click()
    }

}
export default new githubPricingPage()
