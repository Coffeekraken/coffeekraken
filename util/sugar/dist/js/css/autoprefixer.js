"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = autoprefixer;

var _inlineStylePrefixer = require("inline-style-prefixer");

function autoprefixer(style) {
  return (0, _inlineStylePrefixer.prefix)(style);
}

module.exports = exports.default;