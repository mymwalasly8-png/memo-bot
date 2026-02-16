FROM node:16

# تثبيت الأدوات الأساسية
RUN apt-get update && apt-get install -y ffmpeg imagemagick webp git && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# نسخ الملفات
COPY package.json ./

# تنظيف الكاش وتثبيت المكتبات بالقوة
RUN npm cache clean --force
RUN npm install --save --legacy-peer-deps || npm install --only=prod --legacy-peer-deps

COPY . .

EXPOSE 3000

# تشغيل الملف الرئيسي مباشرة
CMD ["node", "index.js"]
