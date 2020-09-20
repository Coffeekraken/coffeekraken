"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @name                                      isNode
 * @namespace           sugar.js.is
 * @type                                      Function
 *
 * Check if the current script is running under node runtime or not...
 *
 * @return                {Boolean}                           true if running under javascript runtime, false if not...
 *
 * @example               js
 * import isNode from '@coffeekraken/sugar/js/is/node';
 * isNode(); // => true
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = () => {
  return typeof process !== 'undefined' && process.release.name === 'node';
};

exports.default = _default;
module.exports = exports.default;