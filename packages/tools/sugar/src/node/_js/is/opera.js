"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isOpera;

/**
 * @name        isOpera
 * @namespace           sugar.js.is
 * @type      Function
 *
 * Detect if is opera
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 *
 * @example 	js
 * import isOpera from '@coffeekraken/sugar/js/is/opera'
 * if (isOpera()) {
 *   // do something cool
 * }
 *
 * @return    {Boolean}    true if is opera, false if not
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isOpera(ua) {
  if (ua === void 0) {
    ua = navigator.userAgent;
  }

  return ua.toLowerCase().indexOf('op') > -1;
}

module.exports = exports.default;