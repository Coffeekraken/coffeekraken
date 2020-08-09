"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isIe;

/**
 * @name        isIe
 * @namespace           js.is
 * @type      Function
 *
 * Detect if is ie (internet explorer)
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 *
 * @example 	js
 * import isIe from '@coffeekraken/sugar/js/is/ie'
 * if (isIe()) {
 *   // do something cool
 * }
 *
 * @return    {Boolean}    true if is ie, false if not
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isIe(ua) {
  if (ua === void 0) {
    ua = navigator.userAgent;
  }

  return ua.indexOf('MSIE') > -1;
}

module.exports = exports.default;