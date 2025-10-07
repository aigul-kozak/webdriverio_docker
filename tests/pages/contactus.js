class ContactUsPage {
  async open() {
    await browser.url('/contact-us');
  }

  async acceptCookies() {
    const acceptBtn = await $('button[id = "onetrust-accept-btn-handler"]');

    if (await acceptBtn.isDisplayed()) {
      await acceptBtn.click();
      await browser.pause(2000);
    }
  }

  async checkSetiLinkAndSearch(query = 'SIP') {
    const setiLink = await $('//*[contains (text(), "SETI")]');
    await setiLink.waitForExist({ timeout: 10000 });
    await setiLink.waitForDisplayed({ timeout: 10000 });

    await setiLink.click();
    await browser.switchWindow('https://seti.telnyx.com');
    await browser.pause(3000);

    const cookieBtn = await $('button[id="onetrust-pc-btn-handler"]');
    if (await cookieBtn.isDisplayed()) {
      await cookieBtn.click();
    }

    // make search
    const searchInput = await $("(//input[@id='search'])[1]");
    await searchInput.waitForExist({ timeout: 10000 });
    await searchInput.waitForDisplayed({ timeout: 10000 });

    await searchInput.setValue(query);
    await searchInput.click();
    //await browser.keys('Enter');

    // wait for autosuggest and click
    const resultMark = await $('//a[contains(text(), "SIP Trunking")]');
    await resultMark.waitForExist({ timeout: 10000 });
    await resultMark.scrollIntoView();
    await browser.pause(200);
    await browser.execute((el) => el.click(), resultMark);

    // check "SIP Trunking" header
    const sipHeading = await $('//h1[normalize-space()="SIP Trunking"]');
    await sipHeading.waitForDisplayed({ timeout: 10000 });
    await browser.pause(2000);
    await expect(sipHeading).toBeDisplayed();
    await browser.pause(2000);
  }

  // navigate to Contact Us and check "Talk to an expert"
  async navigateToContactUs() {
    const expertHeading = await $("//h1[normalize-space()='Talk to an expert']");
    await expertHeading.waitForDisplayed({ timeout: 15000 });
    await expect(expertHeading).toHaveText('Talk to an expert');
  }
}

export default new ContactUsPage();
