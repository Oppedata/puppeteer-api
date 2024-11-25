# เริ่มจาก Node.js base image
FROM node:18-buster

# ติดตั้ง dependencies ที่ Puppeteer ต้องการ
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk1.0-0 \
    libatspi2.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# กำหนด working directory
WORKDIR /app

# คัดลอกไฟล์ทั้งหมด
COPY . .

# ติดตั้ง npm dependencies รวม Puppeteer
RUN npm install

# บังคับ Puppeteer ดาวน์โหลด Chromium
RUN npx puppeteer install

# เปิดพอร์ตสำหรับเซิร์ฟเวอร์
EXPOSE 8080

# รันแอปพลิเคชัน
CMD ["npm", "start"]
