class Mainpage {
  get signUp() {
    return $(
      '//*[contains (text(),"Sign up") and @href="/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home"]',
    );
  }
  get SubscribeBtn() {
    return $(
      '//*[contains(text(), "Subscribe") and @href = "https://resources.github.com/newsletter/"]',
    );
  }
  get SearchInput() {
    return $('//*[@aria-label="Search or jump to…"]');
  }
  get QueryBuilder() {
    return $('#query-builder-test');
  }
  get PricingLink() {
    return $(
      '//*[contains (text(), "Pricing") and @class = "HeaderMenu-link no-underline px-0 px-lg-2 py-3 py-lg-2 d-block d-lg-inline-block"]',
    );
  }

  async clickSignUp() {
    await this.signUp.click();
  }
  async clickSubscribeBtn() {
    await this.SubscribeBtn.click();
  }
  async clickSearchInput(vSearchword) {
    await this.SearchInput.click();
  }
  async QueryBuilderInput(vSearchword) {
    await this.QueryBuilder.addValue(vSearchword);
    await browser.keys('Enter');
  }
  async clickPricingLink() {
    await this.PricingLink.click();
  }
}
export default new githubPage();
