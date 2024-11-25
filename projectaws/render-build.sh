#!/bin/bash
set -e

# Install dependencies
echo "Installing dependencies..."
npm install

# Install Puppeteer and set up Chromium
echo "Installing Puppeteer..."
npx puppeteer install || echo "Puppeteer installation failed"

# Add permissions for Puppeteer
chmod -R 755 /usr/bin/google-chrome-stable
