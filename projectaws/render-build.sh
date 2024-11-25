#!/bin/bash
set -e

# ติดตั้ง dependencies
npm install

# ติดตั้ง Puppeteer
npx puppeteer install

# ให้สิทธิ์ Puppeteer
chmod -R 755 /usr/bin/chromium-browser
