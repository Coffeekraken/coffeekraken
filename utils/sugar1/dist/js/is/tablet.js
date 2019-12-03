"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isTablet;

var _mobileDetect = _interopRequireDefault(require("mobile-detect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name        isTablet
 * @namespace       sugar.js.is
 * @type      Function
 *
 * Detect if is a tablet device
 *
 * @return    {Boolean}    true if is a tablet, false if not
 *
 * @example 	js
 * import isTablet from '@coffeekraken/sugar/js/is/tablet'
 * if (isTablet()) {
 *   // do something cool...
 * }
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isTablet() {
  const md = new _mobileDetect.default(window.navigator.userAgent);
  return md.tablet() !== null;
}

module.exports = exports.default;