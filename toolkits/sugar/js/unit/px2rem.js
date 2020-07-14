"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = px2rem;

/**
 * @name                    px2rem
 * @namespace           js.unit
 * @type                    Function
 *
 * Convert rem value to a px one
 *
 * @param         {Number}          em           The rem value to convert
 * @return        {Number}                        The pixel value
 *
 * @example         js
 * import px2rem from '@coffeekraken/sugar/js/unit/px2rem';
 * px2rem(36);
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function px2rem(px) {
  return px / parseFloat(getComputedStyle(document.documentElement).fontSize || '16px');
}

module.exports = exports.default;