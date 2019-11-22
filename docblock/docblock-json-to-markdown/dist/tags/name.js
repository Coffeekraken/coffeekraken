"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = name;

function name(name) {
  return `\n${Array(this._titleLevel() + 1).join("#")} ${name}\n`;
}

module.exports = exports.default;