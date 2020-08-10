"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  type: {
    type: 'String',
    required: true
  },
  required: {
    type: 'Boolean'
  },
  description: {
    type: 'String'
  },
  default: {
    type: null
  },
  static: {
    type: 'Boolean'
  },
  values: {
    type: 'Array'
  },
  regexp: {
    type: 'RegExp'
  },
  validator: {
    type: 'Function'
  },
  alias: {
    type: 'String'
  },
  level: {
    type: 'Integer'
  }
};
exports.default = _default;
module.exports = exports.default;