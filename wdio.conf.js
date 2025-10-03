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

  //
  // Capabilities: выбираем браузер из ENV
  //
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
  // Сохраняем скриншоты при падении
  //
  afterTest: async function (test, context, { error }) {
    if (error) {
      await browser.saveScreenshot(`./allure-results/${test.title.replace(/\s+/g, '_')}.png`);
    }
  },
};
