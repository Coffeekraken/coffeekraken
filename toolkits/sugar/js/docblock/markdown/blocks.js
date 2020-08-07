"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _class = _interopRequireDefault(require("./blocks/class"));

var _function = _interopRequireDefault(require("./blocks/function"));

var _default2 = _interopRequireDefault(require("./blocks/default"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  class: _class.default,
  function: _function.default,
  default: _default2.default
};
exports.default = _default;
module.exports = exports.default;