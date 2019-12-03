"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMobile;

var _mobileDetect = _interopRequireDefault(require("mobile-detect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name        isMobile
 * @namespace       sugar.js.is
 * @type      Function
 *
 * Detect if is a mobile device (phone or tablet)
 *
 * @return    {Boolean}    true if is a mobile, false if not
 *
 * @example 	js
 * import isMobile from 'coffeekraken-sugar/js/is/mobile'
 * if (isMobile()) {
 *   // do something cool...
 * }
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isMobile() {
  const md = new _mobileDetect.default(window.navigator.userAgent);
  return md.mobile() !== null;
}

module.exports = exports.default;