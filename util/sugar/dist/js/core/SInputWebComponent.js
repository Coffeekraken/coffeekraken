"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sNativeWebComponent = _interopRequireDefault(require("./sNativeWebComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SInputWebComponent extends (0, _sNativeWebComponent.default)(HTMLInputElement) {}

exports.default = SInputWebComponent;
module.exports = exports.default;