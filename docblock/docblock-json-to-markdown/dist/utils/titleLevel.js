"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = titleLevel;
let _titleLevel = 1;

function titleLevel(add = null) {
  if (add !== null) {
    _titleLevel += add;
  }

  if (_titleLevel < 1) _titleLevel = 1; // return level

  return _titleLevel;
}

module.exports = exports.default;