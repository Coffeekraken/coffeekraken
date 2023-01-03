import __parseRgba from './parseRgba';

/**
 * @name                  rgba2hsla
 * @namespace            shared.color
 * @type                  Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * RGBA to HSL
 *
 * @param       	{Number|String|Object}        	r 	        	The red value between 0-255 or an object representing r, b, g, a or a string representing the rgba(...) color
 * @param       	{Number}        	g 	        	The green value between 0-255
 * @param       	{Number}        	b 	        	The blue value between 0-255
 * @param       	{Number}        	a 	        	The alpha value between 0-100|0-1
 * @return 	      {object} 		                    	The hsl object representation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import { __rgbaToHsla } from '@coffeekraken/sugar/color';
 * __rgbaToHsla(10,20,50,10);
 *
 * @see         https://www.npmjs.com/package/colors-convert
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

function RGBAToHSLA(r, g, b, a) {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    // Calculate hue
    // No difference
    if (delta == 0) h = 0;
    // Red is max
    else if (cmax == r) h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g) h = (b - r) / delta + 2;
    // Blue is max
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0) h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return { h, s, l, a };
}

interface IRgbaToHslaResult {
    h: number;
    s: number;
    l: number;
    a: number;
}

export default function __rgbaToHsla(
    r: string | number | any,
    g: number,
    b: number,
    a = 1,
): IRgbaToHslaResult {
    // string support
    if (typeof r === 'string') {
        if (!r.match(/^rgba?\(/)) {
            throw new Error(
                '<red>[rgbaToHsla]</red> When passing a string to the first parameter, it MUST be formatted like: rgba?(.*)',
            );
        }
        r = __parseRgba(r);
    }

    if (typeof r === 'object') {
        g = r.g;
        b = r.b;
        a = r.a;
        r = r.r;
    }

    return RGBAToHSLA(r, g, b, a);
}
