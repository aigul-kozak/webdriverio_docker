import { browser, expect } from '@wdio/globals';
import allure from '@wdio/allure-reporter';

describe('Telnyx', () => {
  it('should have the correct title containing "Telnyx"', async () => {
    allure.startStep('Open Telnyx homepage');
    await browser.url('https://telnyx.com/');
    allure.endStep();

    const title = await browser.getTitle();
    console.log('Page title:', title);

    allure.startStep('Check that page title contains "Telnyx"');
    await expect(browser).toHaveTitle(expect.stringContaining('Telnyx'));
    allure.endStep();

    // Скриншот для Allure на всякий случай
    allure.startStep('Take screenshot of homepage');
    await browser.saveScreenshot(`./allure-results/homepage-${Date.now()}.png`);
    allure.endStep();
  });
});
