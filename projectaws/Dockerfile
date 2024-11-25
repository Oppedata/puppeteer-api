FROM node:18-buster

# ติดตั้ง dependencies สำหรับ Puppeteer
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    fonts-liberation \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    xdg-utils \
    --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# ตั้งค่า working directory
WORKDIR /app

# คัดลอกไฟล์ทั้งหมดไปยัง container
COPY . .

# ติดตั้ง dependencies
RUN npm install

# ติดตั้ง Chromium ผ่าน Puppeteer
RUN npx puppeteer install

# เปิดพอร์ต 8080
EXPOSE 8080

# เริ่มต้นแอปพลิเคชัน
CMD ["npm", "start"]
