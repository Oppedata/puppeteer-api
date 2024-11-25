FROM node:18-slim

# ติดตั้ง dependencies ที่จำเป็น
RUN apt-get update && apt-get install -y \
  wget gnupg \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk1.0-0 \
  libcups2 \
  libx11-xcb1 \
  libxcomposite1 \
  libxrandr2 \
  xdg-utils && \
  wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list' && \
  apt-get update && apt-get install -y google-chrome-stable && \
  rm -rf /var/lib/apt/lists/*

# ตั้งค่าโฟลเดอร์
WORKDIR /usr/src/app

# คัดลอกไฟล์
COPY package*.json ./
RUN npm install
COPY . .

# เปิดพอร์ต
EXPOSE 8080

# เริ่มเซิร์ฟเวอร์
CMD ["npm", "start"]
