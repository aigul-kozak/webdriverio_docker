WDIO Tests
Automated end-to-end tests for the Telnyx website using WebdriverIO, Allure Reports, Docker, and GitHub Actions CI/CD.

Project Structure
project/
├─ tests/ # Test files (\*.spec.js)
├─ pages/ # Page Object classes
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

Running Tests Locally
Run All Tests (default: Chrome)
npm test
Run Tests on Specific Browsers
npm run test:chrome
npm run test:firefox
npm run test:edge
Run a Specific Test File
npx wdio run wdio.conf.js --spec ./tests/specs/telnyx.spec.js
Run with Environment Variables
BROWSER=firefox BASE_URL=https://telnyx.com npx wdio run ./wdio.conf.js
Note:
All browsers run in headless mode by default for CI and Docker environments.

Fallback Mechanism
In CI/CD (GitHub Actions), if EdgeDriver is unavailable, tests automatically fall back to Chrome.
Note for local runs: The Edge → Chrome fallback is not implemented locally. If EdgeDriver cannot be downloaded, you will need to manually run tests in Chrome using:
npm run test:chrome

Allure reports include a browser label:
edge (fallback → chrome) — if Edge failed and Chrome was used
chrome or firefox — for normal runs
This ensures the CI/CD pipeline never breaks due to driver issues.

Allure Reporting
Generate and View Allure Report Locally
npm run allure:generate
npm run allure:open
Results after each test run:
Raw results: allure-results/
HTML report: allure-report/
In CI, Allure reports are generated per browser:
reports/chrome/
reports/firefox/
reports/edge/
Locally, reports are combined in allure-report/.

Run Tests in Docker
Build Docker Image
docker build -t wdio-telnyx .
Run Tests per Browser
Chrome:
docker run -it --rm \
 -e BROWSER=chrome \
 -e BASE_URL=https://telnyx.com \
 -v $(pwd)/reports:/usr/src/app/allure-report \
 wdio-telnyx
Firefox:
docker run -it --rm \
 -e BROWSER=firefox \
 -e BASE_URL=https://telnyx.com \
 -v $(pwd)/reports:/usr/src/app/allure-report \
 wdio-telnyx
Edge:
docker run -it --rm \
 -e BROWSER=edge \
 -e BASE_URL=https://telnyx.com \
 -v $(pwd)/reports:/usr/src/app/allure-report \
 wdio-telnyx
After execution, Allure raw results will appear inside your local ./reports folder.

GitHub Actions CI/CD
The workflow .github/workflows/wdio-e2e-tests.yaml:
Runs tests on Chrome, Firefox, and Edge in parallel
Uploads each Allure report as an artifact
Combines and deploys them to GitHub Pages (gh-pages branch)

View the latest reports:
https://aigul-kozak.github.io/webdriverio_docker/

Scripts Summary
Command Description
npm test Run all tests (default: Chrome)
npm run test:chrome Run tests in Chrome
npm run test:firefox Run tests in Firefox
npm run test:edge Run tests in Edge
npm run allure:generate Generate Allure HTML report
npm run allure:open Open generated Allure report
