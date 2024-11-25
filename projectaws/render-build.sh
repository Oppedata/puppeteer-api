#!/bin/bash

# ติดตั้ง dependencies
apt-get update && apt-get install -y wget gnupg

# เพิ่ม Chrome repository และติดตั้ง Google Chrome
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list'
apt-get update && apt-get install -y google-chrome-stable

# ตรวจสอบว่า Google Chrome ติดตั้งสำเร็จ
google-chrome-stable --version || echo "Google Chrome installation failed!"
