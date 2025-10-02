export const config = {
  runner: 'local',
  framework: 'mocha',
  specs: ['./tests/**/*.spec.js'],
  reporters: ['spec', ['allure', { outputDir: 'allure-results' }]],

  services: [],

  capabilities: [
    {
      maxInstances: 1,
      browserName: process.env.BROWSER || 'chrome',
      'goog:chromeOptions': {
        args: [
          '--headless=new',
          '--disable-gpu',
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--disable-extensions',
          '--remote-allow-origins=*',
          `--user-data-dir=/tmp/${process.env.BROWSER || 'chrome'}-${Date.now()}`,
        ],
      },
    },
  ],

  baseUrl: process.env.BASE_URL || 'https://telnyx.com',
  waitforTimeout: 10000,
  mochaOpts: {
    timeout: 60000,
  },
  before: async function () {
    await browser.url(process.env.BASE_URL || 'https://telnyx.com');
  },
};
