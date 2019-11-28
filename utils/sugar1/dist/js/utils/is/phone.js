"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPhone;

var _mobileDetect = _interopRequireDefault(require("mobile-detect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Detect if is a phone device
 * @return    {Boolean}    true if is a phone, false if not
 * @example 	js
 * import isPhone from '@coffeekraken/sugar/js/utils/is/phone'
 * if (isPhone()) {
 *   // do something cool...
 * }
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isPhone() {
  const md = new _mobileDetect.default(window.navigator.userAgent);
  return md.phone() !== null;
}

module.exports = exports.default;