"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMobile;

var _mobileDetect = _interopRequireDefault(require("mobile-detect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name        isMobile
 * @namespace           js.is
 * @type      Function
 *
 * Detect if is a mobile device (phone or tablet)
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test *
 * @return    {Boolean}    true if is a mobile, false if not
 *
 * @example 	js
 * import isMobile from 'coffeekraken-sugar/js/is/mobile'
 * if (isMobile()) {
 *   // do something cool...
 * }
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isMobile(ua) {
  if (ua === void 0) {
    ua = navigator.userAgent;
  }

  var md = new _mobileDetect.default(ua);
  return md.mobile() !== null;
}

module.exports = exports.default;