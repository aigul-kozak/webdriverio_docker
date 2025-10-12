# Use Node to launch WDIO
FROM node:20

WORKDIR /app
ADD . /app

# Install dependencies
RUN npm install

# Install browsers
RUN apt-get update && apt-get install -y wget gnupg2 xvfb curl unzip fontconfig \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable firefox-esr

# env var
ENV DOCKER=true

# Chrome by default
CMD ["npx", "wdio", "run", "./wdio.conf.js"]
