#!/bin/bash

set -e

# ติดตั้ง dependencies
npm install

# บังคับ Puppeteer ให้ดาวน์โหลด Chromium
npx puppeteer install
