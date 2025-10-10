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

    // save tabs
    const oldHandles = await browser.getWindowHandles();

    await setiLink.click();
    await browser.pause(2000);

    // check new tab
    const newHandles = await browser.getWindowHandles();

    if (newHandles.length > oldHandles.length) {
      // move to new tab
      const newHandle = newHandles.find((h) => !oldHandles.includes(h));
      console.log('🪟 Switching to new tab:', newHandle);
      await browser.switchToWindow(newHandle);
    } else {
      // Firefox headless often opens in the same tab
      console.log('No new window detected — continuing in current tab');
    }

    await browser.pause(3000);

    // accept cookies, if any
    const cookieBtn = await $('button[id="onetrust-pc-btn-handler"]');
    if (await cookieBtn.isDisplayed()) {
      await cookieBtn.click();
      await browser.pause(1000);
    }

    // make search
    const searchInput = await $("(//input[@id='search'])[1]");
    await searchInput.waitForExist({ timeout: 10000 });
    await searchInput.waitForDisplayed({ timeout: 10000 });

    await searchInput.setValue(query);
    await searchInput.click();

    // click autosugestion
    const resultMark = await $('//a[contains(text(), "SIP Trunking")]');
    await resultMark.waitForExist({ timeout: 10000 });
    await resultMark.scrollIntoView();
    await browser.pause(200);
    await browser.execute((el) => el.click(), resultMark);

    // check header
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
