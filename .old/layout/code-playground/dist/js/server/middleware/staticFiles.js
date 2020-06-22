"use strict";

const __url = require('url');

const __fs = require('fs');

const __path = require('path');

module.exports = function (req, res, next) {
  if (req.url === '/') {
    next();
    return;
  }

  const url = __url.parse(req.url).pathname;

  if (url && url !== '/') {
    if (__fs.existsSync(req.config.pwd + url)) {
      return res.sendFile(req.config.pwd + url);
    } else if (__fs.existsSync(__path.resolve(__dirname + '/../') + url)) {
      return res.sendFile(__path.resolve(__dirname + '/../') + url);
    }
  }

  next();
};