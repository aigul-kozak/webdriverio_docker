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

⚙️ Installation

Install Node.js v22 or newer.

git clone https://github.com/aigul-kozak/webdriverio_docker.git
cd webdriverio_docker
npm ci

⚠️ If you face issues with EdgeDriver, check connectivity to
https://msedgedriver.azureedge.net

🚀 Running Tests Locally
Run All Tests (default: Chrome)
npm test

Run Tests on Specific Browsers
npm run test:chrome
npm run test:firefox
npm run test:edge

Run a Specific Test File
npx wdio run wdio.conf.js --spec ./tests/telnyx.e2e.js

Run with Environment Variables
BROWSER=firefox BASE_URL=https://telnyx.com npx wdio run ./wdio.conf.js

🧭 Fallback Mechanism

If EdgeDriver is unavailable, tests automatically fall back to Chrome.

Allure reports will include a label:

edge (fallback → chrome) — if Edge failed and Chrome was used

chrome or firefox — for normal runs

This ensures the CI/CD pipeline never breaks due to driver issues.

📊 Allure Reporting
Generate Allure Report
npm run allure:generate

Open Allure Report Locally
npm run allure:open

After each test run, results are saved in:

allure-results/

The HTML report is generated into:

allure-report/

🐳 Run Tests in Docker

Run inside Docker to ensure consistent environments locally and in CI:

docker build -t wdio-telnyx .
docker run -it --rm \
 -e BROWSER=chrome \
 -e BASE_URL=https://telnyx.com \
 -v $(pwd)/reports:/usr/src/app/allure-report \
 wdio-telnyx

This container includes:

Node.js

Chrome, Firefox, Edge

Allure CLI

⚙️ GitHub Actions CI/CD

The workflow .github/workflows/wdio-e2e-tests.yaml:

Runs tests on Chrome, Firefox, and Edge in parallel.

Uploads each Allure report as an artifact.

Combines them and deploys to GitHub Pages (gh-pages branch).

You can view the latest Allure reports here:
👉 https://aigul-kozak.github.io/webdriverio_docker/

✅ Setup Checklist

Enable Workflow permissions → Read & Write in repo settings.

Create an empty gh-pages branch before the first deploy.

Verify reports/ is added to .gitignore.

🧩 Scripts Summary
Command Description
npm test Run all tests (default: Chrome)
npm run test:chrome Run tests in Chrome
npm run test:firefox Run tests in Firefox
npm run test:edge Run tests in Edge
npm run allure:generate Generate Allure HTML report
npm run allure:open Open the generated Allure report
