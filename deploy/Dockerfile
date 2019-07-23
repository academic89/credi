FROM node:lts

ARG APP_DIR_ARG

ENV APP_DIR ${APP_DIR_ARG}

RUN apt-get update && apt-get install -y \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

RUN mkdir -p ${APP_DIR_ARG}

WORKDIR ${APP_DIR}

COPY . $APP_DIR

RUN npm install -g pm2
