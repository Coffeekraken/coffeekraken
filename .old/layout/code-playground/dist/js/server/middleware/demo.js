"use strict";

const __merge = require('lodash/merge');

module.exports = function (req, res, next) {
  if (!req.query.demo) {
    next();
    return;
  }

  const demo = req.query.demo;
  const demoObj = req.config.demos[demo];

  if (!demoObj) {
    throw `The demo requested "${demo}" does not exist...`;
  } // merge this with the editors


  req.config.editors = __merge({}, req.config.editors, demoObj.editors); // next

  next();
};