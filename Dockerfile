FROM node:20

RUN apt-get update && apt-get install -y ffmpeg imagemagick webp git && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package.json ./

# أمر تثبيت نظيف ومباشر
RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
