FROM node:lts-slim AS builder

RUN mkdir /app
WORKDIR /app

COPY package*.json /app

RUN npm install

FROM node:lts-slim

RUN mkdir /app
WORKDIR /app

COPY . /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 6000

CMD node server.js 