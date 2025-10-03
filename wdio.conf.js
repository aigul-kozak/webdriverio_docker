import allure from '@wdio/allure-reporter';

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
        outputDir: 'allure-results',
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
                `--user-data-dir=/tmp/chrome-${Date.now()}`,
              ],
            }
          : undefined,

      'moz:firefoxOptions':
        process.env.BROWSER === 'firefox'
          ? {
              args: ['-headless'],
            }
          : undefined,

      'ms:edgeOptions':
        process.env.BROWSER === 'edge'
          ? {
              args: ['--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage'],
            }
          : undefined,
    },
  ],

  baseUrl: process.env.BASE_URL || 'https://telnyx.com',
  waitforTimeout: 10000,

  mochaOpts: {
    timeout: 60000,
  },

  //
  // Save screenshots when crashing
  //
  afterTest: async function (test, context, { error }) {
    if (error) {
      await browser.saveScreenshot(`./allure-results/${test.title.replace(/\s+/g, '_')}.png`);
    }
  },

  //
  // Adding a Browser Label to Allure (with Fallback)
  //
  beforeSession: function (config, capabilities, specs) {
    const browser = process.env.BROWSER || 'chrome';
    if (browser === 'chrome' && process.env.FALLBACK_BROWSER === 'chrome') {
      allure.addLabel('browser', 'edge (fallback → chrome)');
    } else {
      allure.addLabel('browser', browser);
    }
  },
};
