#!/bin/bash
npm install \
&& pm2 startOrRestart --no-daemon ecosystem.config.js --env development
