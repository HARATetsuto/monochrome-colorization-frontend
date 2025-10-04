FROM node:20-alpine

ENV FAST_API_URL="http://127.0.0.1:8000/"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY dist/ ./dist

CMD [ "node", "dist/server/index.js" ]