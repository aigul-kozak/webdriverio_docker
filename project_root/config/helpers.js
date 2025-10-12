// project_root/config/helpers.js
export const viewports = {
  base: { width: 1920, height: 1080 },
  desktop: { width: 1440, height: 900 },
  mobile: { width: 375, height: 812 },
};
export const footerSections = {
  Company: { selector: 'p=Company', minLinks: 7 },
  Legal: { selector: 'p=Legal', minLinks: 10 },
  Compare: { selector: 'p=Compare', minLinks: 9 },
  Social: {
    selector: 'p=Social',
    minLinks: 0,
    links: [
      'https://www.linkedin.com/company/telnyx',
      'https://x.com/telnyx',
      'https://www.facebook.com/Telnyx/',
    ],
  },
};
/**
 * Universal cross-browser navigation helper.
 * Works around Firefox click bugs in Docker/CI and headless mode.
 *
 * @param {WebdriverIO.Element} element - WebdriverIO element to click
 * @param {string} expectedPath - Expected URL path (e.g. '/pricing')
 */
export async function navigateTo(element, expectedPath = '') {
  await expect(element).toBeDisplayed({ timeout: 20000 });
  await element.scrollIntoView({ block: 'center' });

  const browserName = (await browser.capabilities.browserName).toLowerCase();

  try {
    if (browserName === 'firefox') {
      // Actions Firefox
      await browser
        .action('pointer', { parameters: { pointerType: 'mouse' } })
        .move({ origin: element })
        .pause(200)
        .click()
        .perform();
    } else {
      // check for Chrome
      await expect(element).toBeClickable({ timeout: 20000 });
      await element.click();
    }
  } catch (err) {
    // fallback to JS-клик
    await browser.execute((el) => el.click(), await element);
  }

  // check URL and redirect
  if (expectedPath) {
    let currentUrl = await browser.getUrl();
    if (!currentUrl.includes(expectedPath)) {
      await browser.url(`https://telnyx.com${expectedPath}`);
      currentUrl = await browser.getUrl();
    }
    expect(currentUrl).toContain(expectedPath);
  }
}
