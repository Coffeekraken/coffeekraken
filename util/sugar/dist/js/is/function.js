"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFunction;

/**
 * @name        isFunction
 * @namespace       sugar.js.is
 * @type      Function
 *
 * Check if the passed value is a js function
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a function, false if not
 *
 * @example    js
 * import isFunction from '@coffeekraken/sugar/js/is/function'
 * if (isFunction(function() {})) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isFunction(value) {
  return value && {}.toString.call(value) === "[object Function]";
}

module.exports = exports.default;