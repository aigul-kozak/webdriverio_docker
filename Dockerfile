# Use official image WebdriverIO
FROM webdriverio/node-base:latest

# Working directory inside container 
WORKDIR /usr/src/app

# Copy dependancies and install them 
COPY package*.json ./
RUN npm ci

# Copy all project 
COPY . .

# Install environment variables 
ENV NODE_ENV=production
ENV BASE_URL=https://telnyx.com

# Run tests 
CMD ["npx", "wdio", "run", "./wdio.conf.js"]