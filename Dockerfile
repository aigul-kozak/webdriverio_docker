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
    openjdk-11-jdk \
    # Chrome
    && wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && apt-get install -y ./google-chrome-stable_current_amd64.deb \
    # Firefox
    && apt-get install -y firefox-esr \
    # Edge
    && wget -q https://packages.microsoft.com/repos/edge/pool/main/m/microsoft-edge-stable/microsoft-edge-stable_126.0.2592.87-1_amd64.deb \
    && apt-get install -y ./microsoft-edge-stable_126.0.2592.87-1_amd64.deb \
    && rm -rf /var/lib/apt/lists/*


# Install environment variables for Java
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
ENV PATH="$JAVA_HOME/bin:$PATH"

# Create directory for application 
WORKDIR /usr/src/app

# Copy package.json and lock file
COPY package*.json ./

# Install project dependencies + allure-commandline globally
RUN npm ci && npm install -g allure-commandline --save-dev

# Copy whole project
COPY . .

# Default command: run tests and generate Allure report 
CMD ["sh", "-c", "\
    if [ -n \"$BROWSER\" ]; then \
    echo '>>> Running tests in $BROWSER...'; \
    npx wdio run ./wdio.conf.js && allure generate allure-results --clean -o /usr/src/app/allure-report/$BROWSER; \
    allure open -h 0.0.0.0 -p 8080 /usr/src/app/allure-report/$BROWSER; \
    else \
    for B in chrome firefox edge; do \
    echo '>>> Running tests in $B...'; \
    BROWSER=$B npx wdio run ./wdio.conf.js || exit 1; \
    allure generate allure-results --clean -o /usr/src/app/allure-report/$B; \
    done; \
    allure open -h 0.0.0.0 -p 8080 /usr/src/app/allure-report/chrome; \
    fi \
    "]