"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = implementsTag;

function implementsTag(implementsStack) {
  return `Implements **${implementsStack.join(', ')}**\n`;
}

module.exports = exports.default;