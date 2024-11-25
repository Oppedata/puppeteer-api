#!/bin/bash

# อัปเดตและติดตั้ง Dependency ที่จำเป็น
apt-get update && apt-get install -y wget gnupg

# เพิ่ม Google Chrome Repository
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list'

# ติดตั้ง Google Chrome Stable และ dependencies อื่น ๆ
apt-get update && apt-get install -y \
  google-chrome-stable \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk1.0-0 \
  libcups2 \
  libx11-xcb1 \
  libxcomposite1 \
  libxrandr2 \
  xdg-utils

# ติดตั้ง Puppeteer
npm install puppeteer puppeteer-core chrome-aws-lambda
