FROM node:16.14.0-alpine3.14

RUN apk update && apk add git

USER node
WORKDIR /home/node/app