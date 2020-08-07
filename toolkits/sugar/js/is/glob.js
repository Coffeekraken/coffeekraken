"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isGlob = _interopRequireDefault(require("is-glob"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                                      isGlob
 * @namespace           js.is
 * @type                                      Function
 *
 * Check if the passed string is a valid glob pattern or not
 *
 * @param                 {String}        $string             The string to check
 * @return                {Boolean}                           true if is a valid glob pattern, false if not
 *
 * @example               js
 * import isGlob from '@coffeekraken/sugar/js/is/js';
 * isGlob('something/*.js); // => true
 *
 * @see       https://www.npmjs.com/package/is-glob
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = string => {
  return (0, _isGlob.default)(string);
};

exports.default = _default;
module.exports = exports.default;