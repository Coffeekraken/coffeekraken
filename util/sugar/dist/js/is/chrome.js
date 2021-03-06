"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isChrome;

/**
 * @name        isChrome
 * @namespace       sugar.js.is
 * @type      Function
 *
 * Detect if is chrome
 *
 * @example 	js
 * import isChrome from '@coffeekraken/sugar/js/is/chrome'
 * if (isChrome()) {
 *   // do something cool
 * }
 *
 * @return    {Boolean}    true if is chrome, false if not
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isChrome() {
  return navigator.userAgent.indexOf("Chrome") > -1;
}

module.exports = exports.default;