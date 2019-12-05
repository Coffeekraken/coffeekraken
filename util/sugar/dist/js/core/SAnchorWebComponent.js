"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sNativeWebComponent = _interopRequireDefault(require("./sNativeWebComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SAnchorWebComponent extends (0, _sNativeWebComponent.default)(HTMLAnchorElement) {}

exports.default = SAnchorWebComponent;
module.exports = exports.default;