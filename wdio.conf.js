import fs from 'fs';
import path from 'path';
import { addAttachment, addLabel } from '@wdio/allure-reporter';

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
        outputDir: process.env.ALLURE_RESULTS || './allure-results',
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

      // Chrome options
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

      // Firefox options
      'moz:firefoxOptions':
        process.env.BROWSER === 'firefox'
          ? {
              args: ['-headless', '--no-sandbox'],
            }
          : undefined,

      // Edge options
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
  mochaOpts: { timeout: 60000 },

  beforeSession: function () {
    const dir = process.env.ALLURE_RESULTS || './allure-results';

    // Clean up old Allure results
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
    fs.mkdirSync(dir, { recursive: true });

    // Add Allure label for browser (including fallback)
    const browserName = process.env.BROWSER || 'chrome';
    if (browserName === 'chrome' && process.env.FALLBACK_BROWSER === 'chrome') {
      addLabel('browser', 'edge (fallback → chrome)');
    } else {
      addLabel('browser', browserName);
    }
  },

  afterTest: async function (test, context, { error }) {
    // Take a screenshot on failure
    if (error) {
      const screenshot = await browser.takeScreenshot();
      addAttachment(
        `${test.title.replace(/\s+/g, '_')}-screenshot`,
        Buffer.from(screenshot, 'base64'),
        'image/png',
      );
    }
  },
};
