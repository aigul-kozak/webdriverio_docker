import { $, $$, browser, expect } from '@wdio/globals';

describe('Telnyx', () => {
  it('should have the correct title containing "Telnyx"', async () => {
    await browser.url('https://telnyx.com/');

    const title = await browser.getTitle();
    console.log('Page title:', title);

    await expect(browser).toHaveTitleContaining('Telnyx');
  });
});
