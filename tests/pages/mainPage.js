import { footerSections } from '../../project_root/config/helpers.js';
import { navigateTo } from '../../project_root/config/helpers.js';

class MainPage {
  get url() {
    return 'https://telnyx.com/';
  }
  get acceptBtn() {
    return $('button[id = "onetrust-accept-btn-handler"]');
  }
  get header() {
    return $('div[id="main-menu"]');
  }
  get menuItems() {
    return [
      "//span[normalize-space()='Products']",
      "//span[normalize-space()='Solutions']",
      "//span[normalize-space()='Why Telnyx']",
      "//span[normalize-space()='Resources']",
      "//span[normalize-space()='Developers']",
    ];
  }
  get pricing() {
    return $('a[href="/pricing"] span');
  }
  get burger() {
    return $('button[aria-controls="main-menu-content"]');
  }
  get productsButton() {
    return $("//span[normalize-space()='Products']");
  }
  get dropdown() {
    return $("//p[normalize-space()='See all products']");
  }
  get signUpBtn() {
    return $("(//span[@class='c-bhURco'][normalize-space()='Sign up'])[2]");
  }
  get submitBtn() {
    return $('button[type="submit"] span[data-content="SIGN UP"]');
  }
  get emailError() {
    return $('#email_message');
  }
  get firstnameError() {
    return $('#first_name_message');
  }
  get lastnameError() {
    return $('#last_name_message');
  }
  get passwordError() {
    return $('#required');
  }
  get termsError() {
    return $('#terms_and_conditions_message');
  }
  get footer() {
    return $('footer[class*="pb-xxl"] ');
  }
  async open() {
    await browser.url(this.url);
  }

  async waitForPageLoad(timeout) {
    await browser.waitUntil(
      async () => {
        const state = await browser.execute(() => document.readyState);
        return state === 'complete';
      },
      {
        timeout,
        timeoutMsg: 'Page did not load within timeout',
        interval: 500,
      },
    );
  }

  async acceptCookies() {
    if (await this.acceptBtn.isExisting()) {
      try {
        await cookieBtn.waitForDisplayed({ timeout: 3000 });
        await cookieBtn.click();
      } catch {}
    }
  }

  async checkPageTitle(timeout = 10000) {
    await expect(browser).toHaveTitle(
      'Telnyx—Voice AI Agents with Built-In Global Telco Infrastructure',
    );
  }

  async checkHeaderMenu(items) {
    for (const selector of this.menuItems) {
      const element = await $(selector);
      await expect(element).toExist();
      await expect(element).toBeDisplayedInViewport();
    }
  }

  async pricingToShow() {
    await expect(this.header).toBeDisplayed();
    await expect(this.pricing).toBeDisplayed();
  }

  async burgerClick() {
    await this.burger.click();
  }

  async navigateToPricing() {
    await expect(this.header).toBeDisplayed({ timeout: 20000 });
    await navigateTo(this.pricing, '/pricing');
  }

  async navigateToProductsViaDropdown() {
    await this.productsButton.waitForDisplayed({ timeout: 20000 });
    await this.productsButton.click();

    await this.dropdown.waitForDisplayed({ timeout: 20000 });
    await this.dropdown.scrollIntoView({ block: 'center' });
    await navigateTo(this.dropdown, '/products');
  }

  async signUpAndCheckErrors() {
    await this.signUpBtn.scrollIntoView({ timeout: 20000 });
    await this.signUpBtn.waitForDisplayed({ timeout: 20000 });
    await navigateTo(this.signUpBtn, '/sign-up');

    await this.submitBtn.click();
    const emailErrorText = await this.emailError.getText();
    expect(emailErrorText).toContain('This field is required.');
    const firstnameErrorText = await this.firstnameError.getText();
    expect(firstnameErrorText).toContain('This field is required.');
    const lastnameErrorText = await this.lastnameError.getText();
    expect(lastnameErrorText).toContain('This field is required.');
    const passwordErrorText = await this.passwordError.getText();
    expect(passwordErrorText).toContain('This field is required.');
    const termsErrorText = await this.termsError.getText();
    expect(termsErrorText).toContain('Please accept the terms and conditions');
  }

  async checkFooterMenu(sectionName) {
    const section = footerSections[sectionName];
    await this.footer.waitForDisplayed({ timeout: 10000 });
    await this.footer.scrollIntoView();

    const footerColumn = await $(section.selector);
    const parent = await footerColumn.parentElement();

    const linksArray = section.links || [];
    const minLinks = section.minLinks || 0;

    const la = await parent.$$('li a');
    expect(la.length).toBeGreaterThanOrEqual(minLinks);

    for (const link of linksArray) {
      const found = await parent.$(`a[href="${link}"]`);
      await expect(found).toExist();
    }
  }
}

export default new MainPage();
