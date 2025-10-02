import { $, $$, browser, expect } from '@wdio/globals';
describe('Telnyx', () => {
  it('should have correct title', async () => {
    await browser.url('https://telnyx.com/');

    const title = await browser.getTitle();
    console.log(title);
    await expect(browser).toHaveTitle(
      'Telnyx—Voice AI Agents with Built-In Global Telco Infrastructure',
    );
  });
});
