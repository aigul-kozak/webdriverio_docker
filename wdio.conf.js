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
    },
  ],

  baseUrl: process.env.BASE_URL || 'https://telnyx.com',
  waitforTimeout: 10000,
  mochaOpts: {
    timeout: 60000,
  },
};
