FROM node:18

# تثبيت المكتبات اللازمة للنظام
RUN apt-get update && apt-get install -y \
    ffmpeg \
    imagemagick \
    webp \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# نسخ ملف package.json فقط في البداية
COPY package.json ./

# تثبيت المكتبات مع تجاهل التعارضات
RUN npm install --legacy-peer-deps

# نسخ باقي الملفات
COPY . .

# المنفذ اللي اتفقنا عليه
EXPOSE 3000

# أمر تشغيل البوت
CMD ["node", "index.js"]
