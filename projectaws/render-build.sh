#!/bin/bash

# ติดตั้ง dependencies
echo "Updating and installing required dependencies..."
apt-get update && apt-get install -y wget gnupg

# ติดตั้ง Puppeteer
echo "Installing Puppeteer..."
npm install puppeteer

# ให้สิทธิ์การรันไฟล์ Chromium
echo "Granting execution permission for Puppeteer and Chromium..."
chmod -R 755 /opt/render/project/src/node_modules/puppeteer
