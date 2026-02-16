FROM node:20

RUN apt-get update && apt-get install -y ffmpeg imagemagick webp git && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package.json ./

# المرة هادي حطينا الأمر اللي طلبه npm بالظبط
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
