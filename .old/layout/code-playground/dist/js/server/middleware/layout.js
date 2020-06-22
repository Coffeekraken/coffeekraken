"use strict";

module.exports = function (req, res, next) {
  // layout parameter
  if (req.query.layout) {
    req.config.layout = req.query.layout;
  }

  next();
};