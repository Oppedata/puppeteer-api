#!/bin/bash

# ติดตั้ง dependencies
apt-get update && apt-get install -y wget gnupg

# ดาวน์โหลด Chromium ด้วย Puppeteer
npm install puppeteer
npx puppeteer install
