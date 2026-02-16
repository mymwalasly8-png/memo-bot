FROM node:20

# تثبيت الأدوات اللازمة للنظام
RUN apt-get update && apt-get install -y ffmpeg imagemagick webp git && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# نسخ ملف package.json
COPY package.json ./

# تثبيت المكتبات وتجاهل الأخطاء البسيطة
RUN npm install --legacy-peer-deps

# نسخ باقي الملفات
COPY . .

# تشغيل البوت
EXPOSE 3000
CMD ["node", "index.js"]
