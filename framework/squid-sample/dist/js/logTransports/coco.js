"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (message, type = 'info') => {
  return new Promise((resolve, reject) => {
    console.warn('coco', message);
    resolve();
  });
};

exports.default = _default;
module.exports = exports.default;