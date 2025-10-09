# Use official lightweight Node.js image
FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install all dependencies including devDependencies
RUN npm ci

# Copy project files
COPY . .

# Environment setup
ENV NODE_ENV=production
ENV BASE_URL=https://telnyx.com

# Default command to run WDIO tests
CMD ["npx", "wdio", "run", "./wdio.conf.js"]
