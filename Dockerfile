FROM node:16-alpine AS development
USER node
WORKDIR /home/node
COPY --chown=node:node package*.json ./

ARG NPM_TOKEN

EXPOSE 4200

RUN npm install
