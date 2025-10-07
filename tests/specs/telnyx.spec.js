// test/specs/telnyx.e2e.js
import MainPage from '../pages/mainpage.js';
import ContactUsPage from '../pages/contactus.js';

describe('Telnyx', () => {
  beforeEach(async () => {
    await browser.reloadSession();
    await MainPage.open();
    await browser.pause(2000);
  });

  it('Open the app and check the Main page title', async () => {
    await expect(browser).toHaveTitle(
      'Telnyx—Voice AI Agents with Built-In Global Telco Infrastructure',
      await browser.pause(2000),
    );
  });

  it('Check Navigation menu in Header (Desktop)', async () => {
    await browser.setWindowSize(1280, 800);
    await MainPage.acceptCookies();
    const menuItems = [
      ' button[type="button"][id="radix-_R_4b9divb_"]',
      ' button[type="button"][id="radix-_R_4j9divb_"]',
      ' button[type="button"][id="radix-_R_539divb_"]',
      ' button[type="button"][id="radix-_R_5b9divb_"]',
      ' button[type="button"][id="radix-_R_5j9divb_"]',
    ];
    await MainPage.checkHeaderMenu(menuItems);
    const pricing = await $('a[href="/pricing"] span');
    await expect(pricing).toBeDisplayed();
  });

  it('Check Navigation menu in Header (Mobile)', async () => {
    await browser.setWindowSize(390, 844);
    await MainPage.acceptCookies();

    // open burger-menu
    const burger = await $('button[aria-controls="main-menu-content"]');
    await burger.click();

    const menuItems = [
      ' button[type="button"][id="radix-_R_4b9divb_"]',
      ' button[type="button"][id="radix-_R_4j9divb_"]',
      ' button[type="button"][id="radix-_R_539divb_"]',
      ' button[type="button"][id="radix-_R_5b9divb_"]',
      ' button[type="button"][id="radix-_R_5j9divb_"]',
    ];
    await MainPage.checkHeaderMenu(menuItems);
    const pricing = await $('a[href="/pricing"] span');
    await expect(pricing).toBeDisplayed();
  });

  it('Navigate to Pricing (Desktop)', async () => {
    await browser.setWindowSize(1280, 800);
    await MainPage.acceptCookies();
    await MainPage.navigateToPricing();
  });

  it('Navigate to Products via dropdown (Desktop)', async () => {
    await browser.setWindowSize(1280, 800);
    await MainPage.acceptCookies();
    await MainPage.navigateToProductsViaDropdown();
  });

  it('Check SignUp button, signup url, error messages', async () => {
    await MainPage.acceptCookies();
    await MainPage.signUpAndCheckErrors();
  });

  it('Check footer columns and social media links (Desktop)', async () => {
    await browser.setWindowSize(1280, 800);
    await MainPage.acceptCookies();

    const footer = await $('footer[class*="pb-xxl"] ');
    await footer.scrollIntoView();

    await MainPage.checkFooterMenu('p=Company', 7);
    await MainPage.checkFooterMenu('p=Legal', 10);
    await MainPage.checkFooterMenu('p=Compare', 9);
    await MainPage.checkFooterMenu('p=Social', 0, [
      'https://www.linkedin.com/company/telnyx',
      'https://x.com/telnyx',
      'https://www.facebook.com/Telnyx/',
    ]);
  });

  it('Check footer columns and social media links (Mobile)', async () => {
    await browser.setWindowSize(390, 844);
    await MainPage.acceptCookies();
    const footer = await $('footer');
    await footer.scrollIntoView();

    await MainPage.checkFooterMenu('p=Company', 7);
    await MainPage.checkFooterMenu('p=Legal', 10);
    await MainPage.checkFooterMenu('p=Compare', 9);
    await MainPage.checkFooterMenu('p=Social', 0, [
      'https://www.linkedin.com/company/telnyx',
      'https://x.com/telnyx',
      'https://www.facebook.com/Telnyx/',
    ]);
  });

  describe('Telnyx Contact us', () => {
    beforeEach(async () => {
      await browser.reloadSession();
      await ContactUsPage.open();
      await browser.pause(2000);
    });

    it('Search (Desktop)', async () => {
      await browser.setWindowSize(1280, 800);
      await ContactUsPage.acceptCookies();
      await ContactUsPage.checkSetiLinkAndSearch('SIP');
    });

    it('Navigate to Contact us, check Talk to an expert text (Desktop)', async () => {
      await browser.setWindowSize(1280, 800);
      await ContactUsPage.acceptCookies();
      await ContactUsPage.navigateToContactUs();
    });
  });
});
