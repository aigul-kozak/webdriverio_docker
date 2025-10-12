class ContactUsPage {
  get url() {
    return 'https://telnyx.com/contact-us';
  }
  get acceptBtn() {
    return $('button[id = "onetrust-accept-btn-handler"]');
  }
  get setiLink() {
    return $('//*[contains (text(), "SETI")]');
  }
  get cookieBtn() {
    return $('button[id="onetrust-pc-btn-handler"]');
  }
  get searchInput() {
    return $("(//input[@id='search'])[1]");
  }
  get resultMark() {
    return $('//a[contains(text(), "SIP Trunking")]');
  }
  get sipHeading() {
    return $('//h1[normalize-space()="SIP Trunking"]');
  }
  get expertHeading() {
    return $("//h1[normalize-space()='Talk to an expert']");
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
    if ((await this.acceptBtn.isExisting()) && (await this.acceptBtn.isDisplayed())) {
      await this.acceptBtn.click();
      await this.acceptBtn.waitForDisplayed({ reverse: true, timeout: 5000 });
    }
  }

  async checkSetiLinkAndSearch(query = 'SIP') {
    await this.setiLink.waitForExist({ timeout: 10000 });
    await this.setiLink.waitForDisplayed({ timeout: 10000 });

    // save tabs
    const oldHandles = await browser.getWindowHandles();

    await this.setiLink.click({
      timeout: 10000,
    });

    // check new tab
    const newHandles = await browser.getWindowHandles();

    if (newHandles.length > oldHandles.length) {
      // move to new tab
      const newHandle = newHandles.find((h) => !oldHandles.includes(h));
      await browser.switchToWindow(newHandle);
    }
    // accept cookies, if any
    if (await this.cookieBtn.isDisplayed()) {
      await this.cookieBtn.click({
        timeout: 3000,
      });
    }

    // make search
    await this.searchInput.waitForExist({ timeout: 10000 });
    await this.searchInput.waitForDisplayed({ timeout: 10000 });

    await this.searchInput.setValue(query);
    await this.searchInput.click();

    // click autosuggestion
    await this.resultMark.waitForExist({ timeout: 10000 });
    await this.resultMark.scrollIntoView();
    await browser.pause({
      timeout: 200,
    });
    await browser.execute((el) => el.click(), await this.resultMark);

    // check header
    await this.sipHeading.waitForDisplayed({ timeout: 10000 });
    await expect(this.sipHeading).toBeDisplayed();
    await browser.pause({
      timeout: 2000,
    });
  }

  // navigate to Contact Us and check "Talk to an expert"
  async navigateToContactUs() {
    await this.expertHeading.waitForDisplayed({ timeout: 15000 });
    await expect(this.expertHeading).toHaveText('Talk to an expert');
  }
}

export default new ContactUsPage();
