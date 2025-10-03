import { browser, expect } from '@wdio/globals';
import allure from '@wdio/allure-reporter';

describe('Telnyx Homepage', () => {
  it('should open homepage and validate title', async () => {
    allure.startStep('Open Telnyx homepage');
    await browser.url('https://telnyx.com/');
    allure.endStep();

    allure.startStep('Get and log page title');
    const title = await browser.getTitle();
    console.log('Page title:', title);
    allure.addAttachment('Page Title', title, 'text/plain');
    allure.endStep();

    allure.startStep('Check that page title contains Telnyx');
    await expect(browser).toHaveTitle(expect.stringContaining('Telnyx'));
    allure.endStep();

    // Скриншот — прикрепляем как attachment (Allure увидит!)
    const screenshot = await browser.takeScreenshot();
    allure.addAttachment('Homepage Screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
  });
});
