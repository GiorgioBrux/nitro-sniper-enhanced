FROM node:14
WORKDIR /usr/src/nitro-sniper
COPY package*.json ./
RUN npm install --only=prod
COPY . .

CMD ["./cmd.sh"]
