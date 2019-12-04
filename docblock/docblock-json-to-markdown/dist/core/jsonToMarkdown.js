"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = jsonToMarkdown;

var _processJson = _interopRequireDefault(require("./processJson"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function jsonToMarkdown(json) {
  // reset title level between files processing
  // (this title level management has to be rewriten when possible)
  this._titleLevel(-100); // process the json first


  json = (0, _processJson.default)(json); // template

  const template = this._config.templates[this._config.language] || this._config.templates.default;
  const tpl = template(json); // return markdown

  return tpl.trim();
}

module.exports = exports.default;