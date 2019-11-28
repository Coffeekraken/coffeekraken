"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SSelectComponent = _interopRequireDefault(require("./js/SSelectComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _SSelectComponent.default.define('s-select', _SSelectComponent.default, 'select');

exports.default = _default;
module.exports = exports.default;