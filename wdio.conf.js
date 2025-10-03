import allure from '@wdio/allure-reporter';
import fs from 'fs';
import path from 'path';

export const config = {
  runner: 'local',
  framework: 'mocha',
  specs: ['./tests/**/*.spec.js'],
  logLevel: 'info',

  reporters: [
    'spec',
    [
      'allure',
      {
        // Обязательно указываем папку, которая смонтирована из Docker
        outputDir: process.env.ALLURE_RESULTS || '/usr/src/app/allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  services: [],

  capabilities: [
    {
      maxInstances: 1,
      browserName: process.env.BROWSER || 'chrome',

      'goog:chromeOptions':
        process.env.BROWSER === 'chrome'
          ? {
              args: [
                '--headless=new',
                '--disable-gpu',
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--disable-extensions',
                '--remote-allow-origins=*',
                `--user-data-dir=${
                  process.env.BROWSER_PROFILE || `/tmp/chrome-${process.pid}-${Date.now()}`
                }`,
              ],
            }
          : undefined,

      'moz:firefoxOptions':
        process.env.BROWSER === 'firefox'
          ? {
              args: ['-headless', '--no-sandbox'],
            }
          : undefined,

      'ms:edgeOptions':
        process.env.BROWSER === 'edge'
          ? {
              args: [
                '--headless=new',
                '--disable-gpu',
                '--no-sandbox',
                '--disable-dev-shm-usage',
                `--user-data-dir=${
                  process.env.BROWSER_PROFILE || `/tmp/edge-${process.pid}-${Date.now()}`
                }`,
              ],
            }
          : undefined,
    },
  ],

  baseUrl: process.env.BASE_URL || 'https://telnyx.com',
  waitforTimeout: 10000,

  mochaOpts: {
    timeout: 60000,
  },

  afterTest: async function (test, context, { error }) {
    if (error) {
      const screenshotDir = process.env.ALLURE_RESULTS || '/usr/src/app/allure-results';
      if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });
      await browser.saveScreenshot(
        path.join(screenshotDir, `${test.title.replace(/\s+/g, '_')}.png`),
      );
    }
  },

  beforeSession: function (config, capabilities, specs) {
    const browserName = process.env.BROWSER || 'chrome';
    if (browserName === 'chrome' && process.env.FALLBACK_BROWSER === 'chrome') {
      allure.addLabel('browser', 'edge (fallback → chrome)');
    } else {
      allure.addLabel('browser', browserName);
    }
  },
};
