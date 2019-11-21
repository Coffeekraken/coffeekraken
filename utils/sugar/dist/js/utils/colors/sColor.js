"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sColor;

var _SColor = _interopRequireDefault(require("../../classes/SColor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sColor(color) {
  return new _SColor.default(color);
}

module.exports = exports.default;