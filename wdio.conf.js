import fs from 'fs';
import path from 'path';
import os from 'os';
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

  hostname: process.env.SELENIUM_HOST || 'localhost',
  port: parseInt(process.env.SELENIUM_PORT || 4444, 10),
  path: '/wd/hub',

  capabilities: [
    {
      maxInstances: 1,
      browserName: process.env.BROWSER || 'chrome',

      'goog:chromeOptions':
        process.env.BROWSER === 'chrome'
          ? {
              args: [
                '--headless',
                '--disable-gpu',
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--disable-extensions',
                '--remote-allow-origins=*',
                `--user-data-dir=${
                  process.env.BROWSER_PROFILE ||
                  path.join(os.tmpdir(), `chrome-profile-${Date.now()}`)
                }`,
              ],
            }
          : undefined,

      'moz:firefoxOptions':
        process.env.BROWSER === 'firefox'
          ? {
              args: ['-headless', '--no-sandbox'],
              prefs: {
                'dom.webnotifications.enabled': false,
              },
            }
          : undefined,

      'ms:edgeOptions':
        process.env.BROWSER === 'edge'
          ? {
              args: [
                '--headless',
                '--disable-gpu',
                '--no-sandbox',
                '--disable-dev-shm-usage',
                `--user-data-dir=${
                  process.env.BROWSER_PROFILE ||
                  path.join(os.tmpdir(), `edge-profile-${Date.now()}`)
                }`,
              ],
            }
          : undefined,
    },
  ],

  baseUrl: process.env.BASE_URL || 'https://telnyx.com',
  waitforTimeout: 10000,
  mochaOpts: { timeout: 60000 },

  beforeSession: function (config, capabilities, specs) {
    const dir = process.env.ALLURE_RESULTS || './allure-results';
    if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });

    const browserName = process.env.BROWSER || 'chrome';
    addLabel('browser', browserName);
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
