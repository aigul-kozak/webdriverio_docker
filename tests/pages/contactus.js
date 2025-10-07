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
    const setiLink = await $('a[href="https://seti.telnyx.com"][class="c-hzhYFJ"]');

    await setiLink.click();
    await browser.switchWindow('https://seti.telnyx.com');

    const cookieBtn = await $('button[id="onetrust-pc-btn-handler"]');
    if (await cookieBtn.isDisplayed()) {
      await cookieBtn.click();
    }

    // make search
    const searchInput = await $('input[aria-label="Search"]');
    await searchInput.setValue(query);
    await browser.keys('Enter');

    // wait for result and click
    const resultMark = await $('span[class="typography-paragraph-md"]');
    await resultMark.waitForDisplayed({ timeout: 20000 });
    await resultMark.click();

    // check "SIP Trunking" header
    const sipHeading = await $('//h1[normalize-space()="SIP Trunking"]');
    await expect(sipHeading).toBeDisplayed();
  }

  // navigate to Contact Us and check "Talk to an expert"
  async navigateToContactUs() {
    const contactLink = await $('a[href="https://telnyx.com/contact-us"]');
    await contactLink.click();

    await expect(browser).toHaveUrlContaining('/contact-us');

    const expertHeading = await $('//h3[normalize-space()="Talk to a product expert"]');
    await expertHeading.waitForDisplayed({ timeout: 15000 });
    await expect(expertHeading).toHaveText('Talk to an expert');
  }
}

export default new ContactUsPage();
