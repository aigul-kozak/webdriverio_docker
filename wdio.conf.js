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

      'goog:chromeOptions':
        process.env.BROWSER === 'chrome'
          ? {
              args: [
                '--headless=new',
                '--disable-gpu',
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--disable-extensions',
                `--user-data-dir=${
                  process.env.BROWSER_PROFILE || `/tmp/chrome-${process.pid}-${Date.now()}`
                }`,
              ],
            }
          : undefined,

      'moz:firefoxOptions':
        process.env.BROWSER === 'firefox' ? { args: ['-headless', '--no-sandbox'] } : undefined,

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
    // Ensure results folder exists, do not delete
    fs.mkdirSync(dir, { recursive: true });

    // Add browser label
    const browserName = process.env.BROWSER || 'chrome';
    if (browserName === 'chrome' && process.env.FALLBACK_BROWSER === 'chrome') {
      addLabel('browser', 'edge (fallback → chrome)');
    } else {
      addLabel('browser', browserName);
    }
  },

  afterTest: async function (test, context, { error }) {
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
