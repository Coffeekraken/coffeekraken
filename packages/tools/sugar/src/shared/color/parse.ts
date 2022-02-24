// @ts-nocheck

import __parseRgba from './parseRgba';
import __parseHsv from './parseHsv';
import __hsv2rgba from './hsva2rgba';
import __parseHsla from './parseHsla';
import __hsla2rgba from './hsla2rgba';
import __hex2rgba from './hex2rgba';
import __rgba2hsla from './rgba2hsla';
import __rgba2hsv from './rgba2hsv';

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
    } else if (color.indexOf('hsl') != -1) {
        color = __parseHsla(color);
        color = __hsla2rgba(color.h, color.s, color.l);
    } else if (color.substring(0, 1) == '#') {
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
