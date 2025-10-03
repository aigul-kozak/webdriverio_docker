FROM node:18-bullseye

# Dependencies for browsers
RUN apt-get update && apt-get install -y \
    curl unzip wget gnupg \
    default-jdk \
    firefox-esr \
    chromium chromium-driver \
    && rm -rf /var/lib/apt/lists/*

# Edge install
RUN curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg \
    && install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/ \
    && sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/edge stable main" > /etc/apt/sources.list.d/microsoft-edge.list' \
    && apt-get update && apt-get install -y microsoft-edge-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

# CMD only runs tests and writes allure-results (HTML is collected!)
CMD ["sh", "-c", "\
    echo '>>> Cleaning temporary browser profiles...'; \
    rm -rf /tmp/chrome-* /tmp/edge-* || true; \
    if [ \"$BROWSER\" = \"chrome\" ] || [ \"$BROWSER\" = \"edge\" ]; then \
    export BROWSER_PROFILE=/tmp/${BROWSER}-profile-$RANDOM-$RANDOM-$RANDOM; \
    mkdir -p $BROWSER_PROFILE; \
    fi; \
    echo '>>> Running tests in $BROWSER with profile $BROWSER_PROFILE'; \
    npx wdio run ./wdio.conf.js || echo '>>> Tests failed for $BROWSER'; \
    "]