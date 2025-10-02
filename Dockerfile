# Base image Node.js (GitHub Actions Node v22)
FROM node:22-bullseye

# Install dependencies for browsers
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    unzip \
    gnupg \
    ca-certificates \
    xvfb \
    openjdk-11-jdk \
    firefox-esr \
    && rm -rf /var/lib/apt/lists/*

# Install Chrome via official repo
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

# Add Microsoft key
RUN wget -q -O - https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg \
    && install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/ \
    && rm microsoft.gpg

# Add repository Edge
RUN sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/edge stable main" > /etc/apt/sources.list.d/microsoft-edge.list'

# Install Edge
RUN apt-get update && apt-get install -y microsoft-edge-stable

# Install npm packages for drivers (chromedriver, geckodriver, edgedriver)
RUN npm install -g chromedriver geckodriver edgedriver allure-commandline --save-dev

# Set environment variables for Java
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
ENV PATH="$JAVA_HOME/bin:$PATH"

# Create working directory
WORKDIR /usr/src/app

# Copy package.json and lock
COPY package*.json ./

# Install project dependencies
RUN npm ci

# Copy project files
COPY . .

# Default command: run tests for all browsers and generate Allure report
CMD ["sh", "-c", "\
    rm -rf allure-results && mkdir -p allure-results; \
    for BROWSER in chrome firefox edge; do \
    echo '>>> Running tests in $BROWSER...'; \
    BROWSER=$BROWSER npx wdio run ./wdio.conf.js || exit 1; \
    done; \
    allure generate allure-results --clean -o /usr/src/app/allure-report; \
    echo '>>> Opening merged Allure report...'; \
    allure open -h 0.0.0.0 -p 8080 /usr/src/app/allure-report \
    "]