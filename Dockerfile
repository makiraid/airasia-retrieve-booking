FROM node:10-stretch-slim

WORKDIR /usr/app

COPY package.json .

RUN npm install --quiet

COPY . .