// @ts-nocheck

import __SColor from './SColor';

/**
 * @name                color
 * @namespace           sugar.node.color
 * @type                Function
 * @stable
 *
 * Simple wrapper to create an SColor instance quickly
 *
 * @param         {Mixed}             color           A color in any format like rgba Object, hsl Object, hsv Object, hex String, rgba String, hsl String or hsv String
 * @return        {SColor}                            An SColor instance representing your color
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import color from '@coffeekraken/sugar/node/color/color';
 * const myColor = color('#ff00ff');
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function color(color) {
  return new __SColor(color);
}
export default color;
