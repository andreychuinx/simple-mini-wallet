FROM node:16.17.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm clean-install

COPY . .

EXPOSE 3000

CMD ["node", "./src/server.js"]