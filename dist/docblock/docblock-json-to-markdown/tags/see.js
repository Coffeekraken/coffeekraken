"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = see;

function see(see) {
  return `See : **${see.label}** : [${see.url}](${see.url})\n`;
}

module.exports = exports.default;