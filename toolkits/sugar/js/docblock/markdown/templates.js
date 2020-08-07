"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _class = _interopRequireDefault(require("./templates/class"));

var _function = _interopRequireDefault(require("./templates/function"));

var _default2 = _interopRequireDefault(require("./templates/default"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  default: _default2.default,
  class: _class.default,
  function: _function.default
};
exports.default = _default;
module.exports = exports.default;