"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _class = _interopRequireDefault(require("./templates/class"));

var _function = _interopRequireDefault(require("./templates/function"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  class: _class.default,
  function: _function.default
};
exports.default = _default;
module.exports = exports.default;