# Base image Node.js (as in GitHub Actions — version 22)
FROM node:22-bullseye

# Install dependencies for browsers
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    unzip \
    gnupg \
    ca-certificates \
    xvfb \
    # Chrome
    && wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && apt-get install -y ./google-chrome-stable_current_amd64.deb \
    # Firefox
    && apt-get install -y firefox-esr \
    # Edge
    && wget -q https://packages.microsoft.com/repos/edge/pool/main/m/microsoft-edge-stable/microsoft-edge-stable_126.0.2592.87-1_amd64.deb \
    && apt-get install -y ./microsoft-edge-stable_126.0.2592.87-1_amd64.deb \
    # Clear cache
    && rm -rf /var/lib/apt/lists/*

# Create directory for application 
WORKDIR /usr/src/app

# Copy package.json and lock file
COPY package*.json ./

# Install project dependencies + allure-commandline globally
RUN npm ci && npm install -g allure-commandline --save-dev

# Copy whole project
COPY . .

# Default command: run tests and generate Allure report
CMD npx wdio run ./wdio.conf.js && allure generate allure-results --clean -o allure-report