// test/specs/telnyx.e2e.js
import { viewports, footerSections } from '../../project_root/config/helpers.js';
import MainPage from '../pages/mainPage.js';
import ContactUsPage from '../pages/contactUs.js';

describe('Telnyx Main (desktop tests)', () => {
  before(async () => {
    await MainPage.open();
    await MainPage.waitForPageLoad(15000);
    const { width, height } = viewports.desktop;
    await browser.setWindowSize(width, height);
    await MainPage.acceptCookies();
  });

  it('Open the app and check the Main page title', async () => {
    await MainPage.checkPageTitle();
  });

  it('Check Navigation menu in Header (Desktop)', async () => {
    await MainPage.checkHeaderMenu();
    await MainPage.pricingToShow();
  });

  it('Check footer columns and social media links (Desktop)', async () => {
    await MainPage.checkFooterMenu('Company');
    await MainPage.checkFooterMenu('Legal');
    await MainPage.checkFooterMenu('Compare');
    await MainPage.checkFooterMenu('Social');
  });

  it('Navigate to Pricing (Desktop)', async () => {
    await MainPage.navigateToPricing();
  });

  it('Navigate to Products via dropdown (Desktop)', async () => {
    await MainPage.navigateToProductsViaDropdown();
  });

  it('Check SignUp button, signup url, error messages', async () => {
    await MainPage.signUpAndCheckErrors();
  });
});

const browserName = (await browser.capabilities.browserName).toLowerCase();
if (browserName !== 'firefox') {
  describe('Telnyx Main (mobile tests)', () => {
    before(async () => {
      await browser.reloadSession();
      const { width, height } = viewports.mobile;
      await browser.setWindowSize(width, height);
      await MainPage.open();
      await MainPage.waitForPageLoad(15000);
      await MainPage.acceptCookies();
    });
    it('Check Navigation menu in Header (Mobile)', async () => {
      // open burger-menu
      await MainPage.burgerClick();
      await MainPage.checkHeaderMenu();
      await MainPage.pricingToShow();
    });

    it('Check footer columns and social media links (Mobile)', async () => {
      await MainPage.checkFooterMenu('Company');
      await MainPage.checkFooterMenu('Legal');
      await MainPage.checkFooterMenu('Compare');
      await MainPage.checkFooterMenu('Social');
    });
  });
}

describe('Telnyx Contact us', () => {
  beforeEach(async () => {
    await ContactUsPage.open();
    await ContactUsPage.waitForPageLoad(15000);
    const { width, height } = viewports.desktop;
    await browser.setWindowSize(width, height);
    await ContactUsPage.acceptCookies();
  });

  it('Search (Desktop)', async () => {
    await ContactUsPage.checkSetiLinkAndSearch('SIP');
  });

  it('Navigate to Contact us, check Talk to an expert text (Desktop)', async () => {
    await ContactUsPage.navigateToContactUs();
  });
});
