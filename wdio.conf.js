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

  capabilities: [], // leave empty, will be populated dynamically in beforeSession

  baseUrl: process.env.BASE_URL || 'https://telnyx.com',
  waitforTimeout: 10000,
  mochaOpts: { timeout: 60000 },

  /**
   * Ensure allure-results folder exists before session
   * Setup capabilities with fallback logic
   */
  beforeSession: async function (config, capabilities, specs) {
    const dir = process.env.ALLURE_RESULTS || './allure-results';
    fs.mkdirSync(dir, { recursive: true });

    let browserName = process.env.BROWSER || 'chrome';
    let actualCapabilities = {};

    try {
      if (browserName === 'edge') {
        // Try to download EdgeDriver (simulated check)
        // If it fails, throw an error to trigger fallback
        // Can be replaced with real availability check
        throw new Error('Simulate EdgeDriver download failure');
      }

      // Browser selection successful
    } catch (e) {
      console.warn('⚠ Edge driver download failed, fallback to Chrome');
      browserName = 'chrome';
      addLabel('browser', 'edge (fallback → chrome)');
    }

    addLabel('browser', browserName);

    // Unique profiles for each browser
    if (browserName === 'chrome') {
      actualCapabilities = {
        maxInstances: 1,
        browserName: 'chrome',
        'goog:chromeOptions': {
          args: ['--headless=new', `--user-data-dir=/tmp/chrome-profile-${Date.now()}`],
          prefs: { 'profile.password_manager_leak_detection': false },
        },
      };
    } else if (browserName === 'firefox') {
      actualCapabilities = {
        maxInstances: 1,
        browserName: 'firefox',
        'moz:firefoxOptions': {
          args: ['-headless'],
          profile: `/tmp/firefox-profile-${Date.now()}`,
        },
      };
    } else if (browserName === 'edge') {
      actualCapabilities = {
        maxInstances: 1,
        browserName: 'edge',
        'ms:edgeOptions': {
          args: ['--headless=new', `--user-data-dir=/tmp/edge-profile-${Date.now()}`],
        },
      };
    }

    config.capabilities = [actualCapabilities];
  },

  /**
   * Define default viewports and apply the default (base) viewport
   */
  before: async function () {
    // 💻 All available viewport types
    browser.defaultViewports = {
      base: { width: 1920, height: 1080 }, // default at the start
      desktop: { width: 1280, height: 800 },
      mobile: { width: 390, height: 844 },
    };

    // ⚙️ Apply base viewport at start
    const { width, height } = browser.defaultViewports.base;
    await browser.setWindowSize(width, height);

    console.log(`✅ Default viewport set to Base: ${width}x${height}`);
  },

  /**
   * Take screenshot on test failure and attach it to Allure
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
