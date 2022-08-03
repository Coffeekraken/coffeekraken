// @ts-nocheck
import __hex2rgba from './hex2rgba';
import __hsla2rgba from './hsla2rgba';
import __parseHsla from './parseHsla';
import __parseRgba from './parseRgba';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSxZQUFZLENBQUM7QUFDcEMsT0FBTyxXQUFXLE1BQU0sYUFBYSxDQUFDO0FBQ3RDLE9BQU8sV0FBVyxNQUFNLGFBQWEsQ0FBQztBQUN0QyxPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7QUFDdEMsT0FBTyxXQUFXLE1BQU0sYUFBYSxDQUFDO0FBRXRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sR0FBRyxNQUFNO0lBQ2pDLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNqQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7UUFDNUIsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM5QjtTQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtRQUNuQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNsRDtTQUFNLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFO1FBQ3JDLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDN0I7SUFFRCxRQUFRLE1BQU0sRUFBRTtRQUNaLEtBQUssTUFBTSxDQUFDO1FBQ1osS0FBSyxLQUFLO1lBQ04sT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUIsTUFBTTtRQUNWLEtBQUssTUFBTSxDQUFDO1FBQ1osS0FBSyxLQUFLLENBQUM7UUFDWDtZQUNJLE9BQU8sS0FBSyxDQUFDO1lBQ2IsTUFBTTtLQUNiO0FBQ0wsQ0FBQztBQUNELGVBQWUsS0FBSyxDQUFDIn0=