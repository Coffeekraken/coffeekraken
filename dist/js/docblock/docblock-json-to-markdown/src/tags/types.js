"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = types;

function types(types) {
  return `Type : **${this._renderTypes(types)}**\n`;
}

module.exports = exports.default;