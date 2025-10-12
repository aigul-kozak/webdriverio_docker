WDIO Tests
Automated end-to-end tests for the Telnyx website using WebdriverIO, Allure Reports, Docker, and GitHub Actions CI/CD.

Project Structure
project/
tests/
├─ pages/
│ └─ mainPage.js
├─ specs/
│ └─ telnyx.spec.js
└─ project_root/config
│ └─ helpers.js
├─ wdio.conf.js # WebdriverIO main config
├─ package.json # Dependencies and scripts
├─ Dockerfile # Docker image for running tests
├─ .github/workflows/
│ └─ wdio-e2e-tests.yaml # GitHub Actions workflow
└─ README.md

Installation
Install Node.js v22 or newer.
Clone the repository and install dependencies:
git clone https://github.com/aigul-kozak/webdriverio_docker.git
cd webdriverio_docker
npm ci

Running Tests Locally:
Run All Tests (default: Chrome)
npm test
Run Tests on Specific Browsers
npm run test:chrome
npm run test:firefox

Run a Specific Test File
npx wdio run wdio.conf.js --spec ./tests/specs/telnyx.spec.js
Run with Environment Variables
BROWSER=firefox BASE_URL=https://telnyx.com npx wdio run ./wdio.conf.js
Note:
All browsers run in headless mode by default for CI and Docker environments.

Allure reports:
uses the official @wdio/allure-reporter package
Reports are generated per browser in CI/CD:
reports/chrome/
reports/firefox/
Note: Do not create index.html manually — the Allure CLI generates the report structure automatically.

Generate and View Allure Report Locally
npm run allure:generate
npm run allure:open

Run Tests in Docker
Build Docker Image
docker build -t wdio-telnyx .
Run Tests per Browser
Windows Chrome: cmd:
npm run docker:chrome:win
Windows Firefox:cmd:
npm run docker:firefox:win
Linux / macOS:
npm run docker:chrome:unix
npm run docker:firefox:unix

GitHub Actions CI/CD
The workflow .github/workflows/wdio-e2e-tests.yaml:
Runs tests on Chrome, Firefox in parallel
Uploads each Allure report as an artifact
Combines and deploys them to GitHub Pages (gh-pages branch)

View the latest reports:
https://aigul-kozak.github.io/webdriverio_docker/

Scripts Summary
npm test Run all tests (default: Chrome)
npm run test:chrome Run tests in Chrome
npm run test:firefox Run tests in Firefox
npm run allure:generate Generate Allure HTML report
npm run allure:open Open generated Allure report
