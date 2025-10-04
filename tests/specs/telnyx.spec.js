import { browser, expect } from '@wdio/globals';
import { addAttachment } from '@wdio/allure-reporter';

describe('Telnyx Homepage', () => {
  it('should open homepage and validate title', async () => {
    // Открываем страницу
    await browser.url('https://telnyx.com/');

    // Получаем заголовок страницы
    const title = await browser.getTitle();
    console.log('Page title:', title);

    // Добавляем attachment с текстом
    addAttachment('Page Title', title, 'text/plain');

    // Проверяем заголовок
    await expect(browser).toHaveTitle(expect.stringContaining('Telnyx'));

    // Скриншот
    const screenshot = await browser.takeScreenshot();
    addAttachment('Homepage Screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
  });
});
