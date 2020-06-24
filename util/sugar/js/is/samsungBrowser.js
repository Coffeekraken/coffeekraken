"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isSamsumgBrowser;

var _mobileDetect = _interopRequireDefault(require("mobile-detect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name        isSamsumgBrowser
 * @namespace           js.is
 * @type      Function
 *
 * Detect if is the samsung stock browser that is running the page
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 *
 * @example    js
 * import isSamsumgBrowser from '@coffeekraken/sugar/js/is/samsungBrowser'
 * if (isSamsumgBrowser()) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isSamsumgBrowser(ua = navigator.userAgent) {
  return ua.match(/SamsungBrowser/i) !== null;
}

module.exports = exports.default;