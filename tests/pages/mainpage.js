class MainPage {
  async open() {
    await browser.url('/');
  }

  async acceptCookies() {
    const acceptBtn = await $('button[id = "onetrust-accept-btn-handler"]');

    if (await acceptBtn.isDisplayed()) {
      await acceptBtn.click();
      await browser.pause(2000);
    }
  }

  async checkHeaderMenu(items) {
    const header = await $('div[id="main-menu"]');
    await expect(header).toBeDisplayed();

    for (const item of items) {
      console.log('222');
      const element = await $('div[id="main-menu"]' + item); //header.$(`=${item}`);
      //div[id="main-menu"] button[type="button"][id="radix-_R_4b9divb_"]

      console.log('Element = ' + (await element.getText()));
      await expect(element).toBeDisplayed();
    }
  }

  async navigateToPricing() {
    const pricingBtn = await $('a[href="/pricing"] span');
    await pricingBtn.click();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain('/pricing');
  }

  async navigateToProductsViaDropdown() {
    const dropdown = await $(
      'div[id="main-menu-content"] button[type="button"][id="radix-_R_4b9divb_"]',
    );
    await dropdown.click();

    const productsLink = await $('a[href="/products"][id="6jHN9mFfQcIhxxfroZW0p8"]');
    await productsLink.scrollIntoView();
    await expect(productsLink).toBeDisplayed();
    await productsLink.click();

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain('/products');
  }

  async signUpAndCheckErrors() {
    const signUpBtn = await $('a[href="/sign-up"]');
    await signUpBtn.click();

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain('/sign-up');
    const submitBtn = await $('button[type="submit"] span[data-content="SIGN UP"]');
    await submitBtn.click();
    const emailError = await $('#email_message').getText();
    expect(emailError).toContain('This field is required.');
    const firstnameError = await $('#first_name_message').getText();
    expect(firstnameError).toContain('This field is required.');
    const lastnameError = await $('#last_name_message').getText();
    expect(lastnameError).toContain('This field is required.');
    const passwordError = await $('#required').getText();
    expect(passwordError).toContain('This field is required.');
    const termsError = await $('#terms_and_conditions_message').getText();
    expect(termsError).toContain('Please accept the terms and conditions');
  }

  async checkFooterMenu(title, numLinks, links = []) {
    const footerColumn = await $(title);
    const parent = await footerColumn.parentElement();
    console.log('Parent Tag = ' + (await parent.getTagName()));
    await browser.pause(2000);
    const la = await parent.$$('li a');
    console.log('la length = ' + la.length);

    expect(la.length).toBeGreaterThanOrEqual(numLinks);

    for (const link of links) {
      const found = await parent.$('a[href="' + link + '"]');
      console.log('found link = ' + (await found.getProperty('href')));
      await expect(found).toExist();
    }
  }

  async clickSignUp() {
    const signUpBtn = await $('a[href="/sign-up"]');
    await signUpBtn.click();
  }
}

export default new MainPage();
