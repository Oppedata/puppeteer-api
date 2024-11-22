# Use Node.js as the base image
FROM node:16

# Install Chrome dependencies
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    --no-install-recommends && \
    wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list' && \
    apt-get update && apt-get install -y google-chrome-stable && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy application code
COPY . .

# Set environment variables for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Expose the application port
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
