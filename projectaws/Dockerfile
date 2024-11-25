FROM node:18-buster

# Install Chromium dependencies
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set Puppeteer to skip Chromium download
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Clean cache and remove lock files
WORKDIR /app
RUN rm -rf package-lock.json node_modules
RUN npm cache clean --force

# Install Puppeteer
RUN npm install puppeteer --unsafe-perm=true --allow-root --force

# Copy project files
COPY . .
RUN npm install

# Start the application
CMD ["npm", "start"]
