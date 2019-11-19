"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderTag;

function renderTag(name, value) {
  if (this._config.tags[name] && name !== 'constructor') {
    return this._config.tags[name](value);
  }

  return '';
}

module.exports = exports.default;