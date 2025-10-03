# Node base image
FROM node:22-bullseye

# Install dependencies
RUN apt-get update && apt-get install -y \
    wget curl unzip gnupg ca-certificates xvfb openjdk-11-jdk firefox-esr \
    && rm -rf /var/lib/apt/lists/*

# Install Chrome
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list' \
    && apt-get update && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

# Install Edge
RUN wget -q -O - https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg \
    && install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/ \
    && rm microsoft.gpg \
    && sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/edge stable main" > /etc/apt/sources.list.d/microsoft-edge.list' \
    && apt-get update && apt-get install -y microsoft-edge-stable

# Install drivers & Allure CLI
RUN npm install -g chromedriver geckodriver edgedriver allure-commandline --save-dev

# Java env
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
ENV PATH="$JAVA_HOME/bin:$PATH"

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .

# CMD: run tests + generate Allure report
CMD ["sh", "-c", "\
    echo '>>> Cleaning temp profiles...'; \
    rm -rf /tmp/chrome-* /tmp/edge-* || true; \
    if [ \"$BROWSER\" = \"chrome\" ] || [ \"$BROWSER\" = \"edge\" ]; then \
    export BROWSER_PROFILE=/tmp/${BROWSER}-profile-$RANDOM-$RANDOM-$RANDOM; \
    mkdir -p $BROWSER_PROFILE; \
    fi; \
    echo '>>> Running tests in $BROWSER with profile $BROWSER_PROFILE'; \
    npx wdio run ./wdio.conf.js || echo '>>> Tests failed for $BROWSER'; \
    allure generate /usr/src/app/allure-results --clean -o /usr/src/app/allure-report; \
    echo '>>> Allure report generated in /usr/src/app/allure-report' \
    "]