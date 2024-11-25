#!/bin/bash

# อัปเดตระบบ
echo "Updating system..."
apt-get update && apt-get install -y wget gnupg

# ติดตั้ง Puppeteer
echo "Installing Puppeteer..."
npm install puppeteer

# ดาวน์โหลด Chromium
echo "Downloading Chromium..."
npx puppeteer install
