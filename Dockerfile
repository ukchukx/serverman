FROM node:12.10.0-alpine

WORKDIR /app

RUN npm i express

COPY --chown=node:node . .

EXPOSE 13000
CMD ["node", "server.js"]
