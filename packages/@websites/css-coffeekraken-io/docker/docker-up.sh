#!/bin/sh
cd /data/web/coffeekraken/coffeekraken && cd packages/@websites/css-coffeekraken-io
npm install pm2 -g
pm2 start docker-start.sh
