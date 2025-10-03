# Base image Node.js
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
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

# Add Microsoft key & Edge repo
RUN wget -q -O - https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg \
    && install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/ \
    && rm microsoft.gpg \
    && sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/edge stable main" > /etc/apt/sources.list.d/microsoft-edge.list'

# Install Edge
RUN apt-get update && apt-get install -y microsoft-edge-stable

# Install npm packages for drivers + Allure
RUN npm install -g chromedriver geckodriver edgedriver allure-commandline --save-dev

# Set environment variables for Java
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
ENV PATH="$JAVA_HOME/bin:$PATH"

# Create working directory
WORKDIR /usr/src/app

# Copy package.json and lockfile
COPY package*.json ./

# Install project dependencies
RUN npm ci

# Copy project files
COPY . .

# Default command: run tests for a single browser (via ENV BROWSER)
CMD ["sh", "-c", "\
    export BROWSER_PROFILE=/tmp/${BROWSER}-profile-$RANDOM-$RANDOM-$RANDOM; \
    echo '>>> Cleaning temporary browser profiles...'; \
    rm -rf /tmp/chrome-* /tmp/edge-* /tmp/firefox-* || true; \
    mkdir -p $BROWSER_PROFILE; \
    rm -rf allure-results && mkdir -p allure-results; \
    echo '>>> Running tests in $BROWSER with profile $BROWSER_PROFILE'; \
    npx wdio run ./wdio.conf.js || echo '>>> Tests failed for $BROWSER'; \
    allure generate allure-results --clean -o /usr/src/app/allure-report; \
    cp -r /usr/src/app/allure-report/* /usr/src/app/allure-results/; \
    echo '>>> Allure report generated in /usr/src/app/allure-report' \
    "]