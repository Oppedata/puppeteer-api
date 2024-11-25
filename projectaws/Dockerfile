# ใช้ Node.js base image
FROM node:18-buster

# ติดตั้ง dependencies พื้นฐาน
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# กำหนด working directory
WORKDIR /app

# Copy ไฟล์โค้ดทั้งหมด
COPY . .

# ติดตั้ง Puppeteer พร้อม dependencies
RUN npm install puppeteer --unsafe-perm=true --allow-root

# ติดตั้ง dependencies ของโปรเจกต์
RUN npm install

# เปิดใช้งานแอป
CMD ["npm", "start"]
