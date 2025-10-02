WebdriverIO Tests for Telnyx Website

This project contains automated E2E tests for Telnyx
using WebdriverIO, Mocha, and Selenium Standalone. The tests run on Chrome, Firefox, and Edge both locally and in CI/CD using Docker.

Project Structure
project/
├─ tests/ # Test files (\*.spec.js)
├─ wdio.conf.js # WebdriverIO main config
├─ package.json # Dependencies and scripts
├─ Dockerfile # Docker image for running tests
├─ gh.yaml # GitHub Actions workflow
└─ README.md

Installation

Install Node.js
(v22 recommended).

Clone the repository:

git clone <your-repo-url>
cd wdio_tests_telnyx

Install dependencies:

npm ci

⚠️ If you face issues with msedgedriver download, ensure your internet connection allows access to https://msedgedriver.azureedge.net.

Running Tests Locally
All Tests (default: Chrome)
npm test

Run Tests on Specific Browsers
npm run test:chrome
npm run test:firefox
npm run test:edge

Using Environment Variables
BROWSER=firefox BASE_URL=https://telnyx.com npx wdio run ./wdio.conf.js

Reporting with Allure
Generate Allure Report
npm run allure:generate

Open Allure Report
npm run allure:open

In CI, reports are saved as artifacts instead of opening a GUI.

Docker

You can run tests inside Docker to ensure consistent environment locally and in CI:

docker build -t wdio-telnyx .
docker run -it --rm \
 -e BROWSER=chrome \
 -e BASE_URL=https://telnyx.com \
 -v $(pwd)/reports:/usr/src/app/allure-report \
 wdio-telnyx

The container includes Node.js, Chrome, Firefox, Edge, and Allure CLI.

GitHub Actions CI/CD

The project is configured to run tests on Chrome, Firefox, and Edge using a matrix strategy:

strategy:
matrix:
env: [prod]
browser: [chrome, firefox, edge]

Results are saved as artifacts (allure-report) for each browser.

Docker ensures the same environment on CI as locally.

Notes

selenium-standalone-service automatically installs required drivers for Chrome, Firefox, and Edge.

maxInstances is set to 1 per browser to avoid conflicts.

Currently targeting production environment (https://telnyx.com).

Future environments (dev/staging) can be added by creating separate WDIO configs and expanding the CI matrix.
