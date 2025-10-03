export const config = {
  runner: 'local',
  specs: ['./tests/specs/**/*.js'],
  maxInstances: 1,
  capabilities: [
    {
      browserName: process.env.BROWSER || 'chrome',
      'goog:chromeOptions': {
        args: ['--headless', '--disable-gpu', '--no-sandbox'],
      },
      'moz:firefoxOptions': {
        args: ['-headless'],
      },
      'ms:edgeOptions': {
        args: ['--headless', '--disable-gpu', '--no-sandbox'],
      },
    },
  ],
  logLevel: 'info',
  framework: 'mocha',
  reporters: [
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],
};
