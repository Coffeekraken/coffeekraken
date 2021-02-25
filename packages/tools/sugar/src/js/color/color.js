// @ts-nocheck
// @shared
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
function color(color) {
    return new __SColor(color);
}
export default color;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTtBQUVWLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQUVoQzs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxTQUFTLEtBQUssQ0FBQyxLQUFLO0lBQ2xCLE9BQU8sSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQUNELGVBQWUsS0FBSyxDQUFDIn0=