# Use official lightweight Node.js image
FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy project files
COPY . .

# Environment setup
ENV NODE_ENV=production
ENV BASE_URL=https://telnyx.com

# Run tests by default
CMD ["npx", "wdio", "run", "./wdio.conf.js"]