#!/bin/bash

# อัปเดตและติดตั้ง Dependency ที่จำเป็น
apt-get update && apt-get install -y wget gnupg

# เพิ่ม Google Chrome Repository
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list'

# ติดตั้ง Google Chrome Stable
apt-get update && apt-get install -y google-chrome-stable

# ติดตั้ง Puppeteer Dependencies
npm install puppeteer
