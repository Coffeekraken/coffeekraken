import __SColor from './SColor';

/**
 * @name                color
 * @namespace           sugar.js.color
 * @type                Function
 *
 * Simple wrapper to create an SColor instance quickly
 *
 * @param         {Mixed}             color           A color in any format like rgba Object, hsl Object, hsv Object, hex String, rgba String, hsl String or hsv String
 * @return        {SColor}                            An SColor instance representing your color
 *
 * @example         js
 * import color from '@coffeekraken/sugar/js/color/color';
 * const myColor = color('#ff00ff');
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function color(color) {
  return new __SColor(color);
}
