# Use the base Node.js image
FROM node:18-buster

# Update and install dependencies for Puppeteer and Chromium
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Chromium manually
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' \
    && apt-get update && apt-get install -y google-chrome-stable \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set up the app directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN npm install

# Add permissions for Puppeteer and Chromium
RUN chmod -R 755 /app
RUN chmod -R 755 /usr/bin/google-chrome-stable

# Start the app
CMD ["npm", "start"]
