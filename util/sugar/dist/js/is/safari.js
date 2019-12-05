"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSafari;

/**
 * @name        isSafari
 * @namespace       sugar.js.is
 * @type      Function
 *
 * Detect if is safari
 *
 * @example 	js
 * import isSafari from '@coffeekraken/sugar/js/is/safari'
 * if (isSafari()) {
 *   // do something cool
 * }
 *
 * @return    {Boolean}    true if is safari, false if not
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isSafari() {
  return navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") == -1;
}

module.exports = exports.default;