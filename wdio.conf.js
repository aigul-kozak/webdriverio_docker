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

  // Capabilities per browser
  capabilities: [
    {
      maxInstances: 1,
      browserName: process.env.BROWSER || 'chrome',

      // Chrome headless options
      'goog:chromeOptions':
        process.env.BROWSER === 'chrome' ? { args: ['--headless=new'] } : undefined,

      // Firefox headless options
      'moz:firefoxOptions': process.env.BROWSER === 'firefox' ? { args: ['-headless'] } : undefined,

      // Edge headless options
      'ms:edgeOptions': process.env.BROWSER === 'edge' ? { args: ['--headless=new'] } : undefined,
    },
  ],

  // Base URL for tests
  baseUrl: process.env.BASE_URL || 'https://telnyx.com',
  waitforTimeout: 10000,
  mochaOpts: { timeout: 60000 },

  /**
   * Ensure allure-results folder exists before session
   * Add browser label for Allure report
   */
  beforeSession: function () {
    const dir = process.env.ALLURE_RESULTS || './allure-results';
    fs.mkdirSync(dir, { recursive: true });

    const browserName = process.env.BROWSER || 'chrome';
    if (browserName === 'chrome' && process.env.FALLBACK_BROWSER === 'chrome') {
      addLabel('browser', 'edge (fallback → chrome)');
    } else {
      addLabel('browser', browserName);
    }
  },

  /**
   * Take screenshot on test failure and attach to Allure
   */
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
