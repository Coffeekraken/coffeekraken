// @ts-nocheck
import __parseRgba from './parseRgba';
import __parseHsla from './parseHsla';
import __hsla2rgba from './hsla2rgba';
import __hex2rgba from './hex2rgba';
import __rgba2hsla from './rgba2hsla';
/**
 * @name            parse
 * @namespace            js.color
 * @type            Function
 * @platform          js
 * @platform          node
 * @status          beta
 * @private
 *
 * Parse a string and return you the wanted object format like "rgba", "hsl" or "hsv".
 *
 * @param       {Object}      color       The color to parse like (#ff0000 | rgba(...) | hsl(...) | hsv(...))
 * @param       {String}      [format='rgba']       The object format wanted. Can be "rgba", "hsl" or "hsv"
 * @return      {Object}                  The rgba representation of the passed color
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import parse from '@coffeekraken/sugar/js/color/parse';
 * parse('rgba(10,20,30,100)'); // => { r: 10, b: 20, b: 30, a: 100 }
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function parse(color, format = 'rgba') {
    color = color.replace(/\s/g, '');
    if (color.indexOf('rgb') != -1) {
        color = __parseRgba(color);
    }
    else if (color.indexOf('hsl') != -1) {
        color = __parseHsla(color);
        color = __hsla2rgba(color.h, color.s, color.l);
    }
    else if (color.substring(0, 1) == '#') {
        color = __hex2rgba(color);
    }
    switch (format) {
        case 'hsla':
        case 'hsl':
            return __rgba2hsla(color);
            break;
        case 'rgba':
        case 'rgb':
        default:
            return color;
            break;
    }
}
export default parse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0sYUFBYSxDQUFDO0FBR3RDLE9BQU8sV0FBVyxNQUFNLGFBQWEsQ0FBQztBQUN0QyxPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7QUFDdEMsT0FBTyxVQUFVLE1BQU0sWUFBWSxDQUFDO0FBQ3BDLE9BQU8sV0FBVyxNQUFNLGFBQWEsQ0FBQztBQUd0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLEdBQUcsTUFBTTtJQUNqQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDakMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1FBQzVCLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDOUI7U0FBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7UUFDbkMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbEQ7U0FBTSxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRTtRQUNyQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzdCO0lBRUQsUUFBUSxNQUFNLEVBQUU7UUFDWixLQUFLLE1BQU0sQ0FBQztRQUNaLEtBQUssS0FBSztZQUNOLE9BQU8sV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFCLE1BQU07UUFDVixLQUFLLE1BQU0sQ0FBQztRQUNaLEtBQUssS0FBSyxDQUFDO1FBQ1g7WUFDSSxPQUFPLEtBQUssQ0FBQztZQUNiLE1BQU07S0FDYjtBQUNMLENBQUM7QUFDRCxlQUFlLEtBQUssQ0FBQyJ9