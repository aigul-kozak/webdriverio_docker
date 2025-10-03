# WebdriverIO Tests for Telnyx Website

This project contains automated E2E tests for Telnyx
using WebdriverIO, Mocha, and Docker.  
The tests run on Chrome, Firefox, and Edge locally and in CI/CD.

---

## Project Structure

project/
├─ tests/ # Test files (\*.spec.js)
├─ wdio.conf.js # WebdriverIO main config
├─ package.json # Dependencies and scripts
├─ Dockerfile # Docker image for running tests
├─ wdio-e2e-tests.yaml # GitHub Actions workflow
└─ README.md

---

## Installation

Install **Node.js v22**.  
Clone the repository:

```sh
git clone <your-repo-url>
cd wdio_tests_telnyx
Install dependencies:

sh
Copy code
npm ci
⚠️ If you face issues with EdgeDriver download, check connectivity to https://msedgedriver.azureedge.net.

Running Tests Locally
All Tests (default: Chrome)

sh
Copy code
npm test
Run Tests on Specific Browsers

sh
Copy code
npm run test:chrome
npm run test:firefox
npm run test:edge
Using Environment Variables

sh
Copy code
BROWSER=firefox BASE_URL=https://telnyx.com npx wdio run ./wdio.conf.js
Fallback Mechanism
If EdgeDriver cannot be downloaded, tests automatically fallback to Chrome.

Allure reports will include a label:

"edge (fallback → chrome)" if Edge failed and Chrome was used

"chrome" or "firefox" for normal runs

This ensures tests continue in CI even if Edge is unavailable.

Reporting with Allure
Generate Allure Report:

sh
Copy code
npm run allure:generate
Open Allure Report:

sh
Copy code
npm run allure:open
In CI, reports are saved as artifacts and deployed to GitHub Pages.

Docker
Run tests inside Docker to ensure consistent environment locally and in CI:

sh
Copy code
docker build -t wdio-telnyx .
docker run -it --rm \
  -e BROWSER=chrome \
  -e BASE_URL=https://telnyx.com \
  -v $(pwd)/reports:/usr/src/app/allure-report \
  wdio-telnyx
The container includes Node.js, Chrome, Firefox, Edge, and Allure CLI.

GitHub Actions CI/CD
Tests run in a matrix (Chrome, Firefox, Edge).

Allure reports are uploaded as artifacts and deployed to GitHub Pages branch gh-pages.

Workflow automatically falls back to Chrome if EdgeDriver is unavailable.

Make sure to enable Workflow permissions → Read & Write in repo settings and create an empty gh-pages branch before the first deploy.
```
