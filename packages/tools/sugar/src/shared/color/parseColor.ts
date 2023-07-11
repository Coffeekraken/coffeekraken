// @ts-nocheck

import __hexToRgba from './hexToRgba.js';
import __hslaToRgba from './hslaToRgba.js';
import __parseHsla from './parseHsla.js';
import __parseRgba from './parseRgba.js';
import __rgbaToHsla from './rgbaToHsla.js';

/**
 * @name            parseColor
 * @namespace            shared.color
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
 * @snippet         __parseColor($1)
 *
 * @example         js
 * import { __parseColor } from '@coffeekraken/sugar/color';
 * __parseColor('rgba(10,20,30,100)'); // => { r: 10, b: 20, b: 30, a: 100 }
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __parseColor(color, format = 'rgba') {
    color = color.replace(/\s/g, '');
    if (color.startsWith('rgb')) {
        color = __parseRgba(color);
    } else if (color.startsWith('hsl')) {
        color = __parseHsla(color);
        // console.log('CC__CC', color);
        color = __hslaToRgba(color.h, color.s, color.l);
    } else if (color.startsWith('#')) {
        // console.log('parseHEx0, col', color);
        color = __hexToRgba(color);
    }

    switch (format) {
        case 'hsla':
        case 'hsl':
            return __rgbaToHsla(color);
            break;
        case 'rgba':
        case 'rgb':
        default:
            return color;
            break;
    }
}
