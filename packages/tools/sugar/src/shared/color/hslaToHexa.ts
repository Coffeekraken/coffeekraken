import __parseHsla from './parseHsla';

/**
 * @name              hslaToHexa
 * @namespace            shared.color
 * @type              Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * HSLA to HEX
 *
 * @param	        {Number|String|Object}        	h		        The hue value between 0-360 an object representing h, s, l, (a) or a string representing the hsla(...) color
 * @param	        {Number}        	s 	        	The saturation value between 0-100|0-1
 * @param	        {Number}        	l 	        	The luminence value between 0-100|0-1
 * @param	        {Number}        	a 	        	The alpha value between 0-100|0-1
 * @return 	      {String} 		                  	The hex string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import { __hslaToHexa } from '@coffeekraken/sugar/color';
 * __hslaToHexa(10,20,30,1);
 *
 * @see         https://www.npmjs.com/package/colors-convert
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function HSLAToHexA(h, s, l, a) {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);
    a = Math.round(a * 255).toString(16);

    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;
    if (a.length == 1) a = '0' + a;

    return '#' + r + g + b + a;
}

export default function __hslaToHexa(
    h: string | number | any,
    s,
    l,
    a = 1,
): string {
    // string support
    if (typeof h === 'string') {
        if (!h.match(/^hsla?\(/)) {
            throw new Error(
                '<red>[hslaToRgba]</red> When passing a string to the first parameter, it MUST be formatted like: hsla?(.*)',
            );
        }
        h = __parseHsla(h);
    }

    // object support
    if (typeof h === 'object') {
        h = h.h;
        s = h.s;
        l = h.l;
        a = h.a;
    }

    return HSLAToHexA(h, s, l, a);
}
