#!/bin/bash

# อัปเดตและติดตั้ง dependency
apt-get update && apt-get install -y wget gnupg

# เพิ่ม Google Chrome repository
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list'

# ติดตั้ง Google Chrome และ dependencies อื่น ๆ
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

# ตรวจสอบการติดตั้ง Google Chrome
google-chrome-stable --version || echo "Google Chrome is not installed!"

# ตั้งค่า permission ให้ไฟล์
chmod +x /usr/bin/google-chrome-stable
