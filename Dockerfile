# Base Node image
FROM node:22-bullseye

# Install system dependencies (browsers + Java)
RUN apt-get update && apt-get install -y \
    wget curl unzip gnupg ca-certificates xvfb openjdk-11-jdk firefox-esr \
    && rm -rf /var/lib/apt/lists/*

# Install Chrome
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update && apt-get install -y google-chrome-stable && rm -rf /var/lib/apt/lists/*

# Install Edge
RUN wget -q -O - https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg \
    && install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/ \
    && rm microsoft.gpg \
    && echo "deb [arch=amd64] https://packages.microsoft.com/repos/edge stable main" > /etc/apt/sources.list.d/microsoft-edge.list \
    && apt-get update && apt-get install -y microsoft-edge-stable

# Install browser drivers globally
RUN npm install -g chromedriver geckodriver edgedriver --save-dev

# Java environment (required for Allure CLI outside the container)
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
ENV PATH="$JAVA_HOME/bin:$PATH"

# Set working directory
WORKDIR /usr/src/app

# Copy dependencies and install project
COPY package*.json ./
RUN npm ci && npm install --save-dev cross-env
COPY . .

# Run tests (Allure HTML generation happens in CI)
CMD ["sh", "-c", "\
    echo '>>> Cleaning temporary browser profiles...'; \
    rm -rf /tmp/chrome-* /tmp/edge-* || true; \
    if [ \"$BROWSER\" = \"chrome\" ] || [ \"$BROWSER\" = \"edge\" ]; then \
    export BROWSER_PROFILE=/tmp/${BROWSER}-profile-$RANDOM-$RANDOM-$RANDOM; \
    mkdir -p $BROWSER_PROFILE; \
    fi; \
    echo '>>> Running tests in $BROWSER with profile $BROWSER_PROFILE'; \
    npx cross-env BROWSER=$BROWSER npx wdio run ./wdio.conf.js \
    "]
