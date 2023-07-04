#!/bin/sh

cd /data/web/coffeekraken/coffeekraken && cd packages/@websites/css-coffeekraken-io
npm run static.serve &
npm run doc.serve
