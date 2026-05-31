FROM node:24-alpine

WORKDIR /app
RUN apk update && apk add --no-cache netcat-openbsd

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

COPY script.sh ./
RUN chmod +x script.sh

CMD ["sh","./script.sh"]