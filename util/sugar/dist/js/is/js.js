"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @name                                      isJs
 * @namespace                                 sugar.js.is
 * @type                                      Function
 *
 * Check if the current script is running under javascript runtime or not...
 *
 * @return                {Boolean}                           true if running under javascript runtime, false if not...
 *
 * @example               js
 * import isJs from '@coffeekraken/sugar/js/is/js';
 * isJs(); // => true
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = () => {
  return typeof window !== 'undefined';
};

exports.default = _default;
module.exports = exports.default;