"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isUcBrowser;

/**
 * @name        isUcBrowser
 * @namespace       sugar.js.is
 * @type      Function
 *
 * Detect if is the UC stock browser that is running the page
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * 
 * @example    js
 * import isUcBrowser from '@coffeekraken/sugar/js/is/ucBrowser'
 * if (isUcBrowser()) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isUcBrowser(ua = navigator.userAgent) {
  return ua.match(/UCBrowser/i) !== null;
}

module.exports = exports.default;