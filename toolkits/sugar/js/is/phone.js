"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPhone;

var _mobileDetect = _interopRequireDefault(require("mobile-detect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name        isPhone
 * @namespace           js.is
 * @type      Function
 *
 * Detect if is a phone device
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 *
 * @return    {Boolean}    true if is a phone, false if not
 *
 * @example 	js
 * import isPhone from '@coffeekraken/sugar/js/is/phone'
 * if (isPhone()) {
 *   // do something cool...
 * }
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isPhone(ua) {
  if (ua === void 0) {
    ua = navigator.userAgent;
  }

  var md = new _mobileDetect.default(ua);
  return md.phone() !== null;
}

module.exports = exports.default;