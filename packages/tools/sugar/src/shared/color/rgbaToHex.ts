import __parseRgba from './parseRgba.js';

/**
 * @name                rgba2hex
 * @namespace            shared.color
 * @type                Function
 * @platform          js
 * @platform          node
 * @status            beta
 *
 * RGBA to HEX
 *
 * @param       	{Number|String|Object}        	r	          	The red value between 0-255 or an object representing r, g, b, a or a string representing the rgba(...) color
 * @param       	{Number}        	g	          	The green value between 0-255
 * @param       	{Number}        	b	          	The blue value between 0-255
 * @param       	{Number}        	a	          	The alpha value between 0-100|0-1
 * @return      	{string}		                    The hex string representation like #ff004f
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __rgbaToHex($1)
 *
 * @example         js
 * import { __rgbaToHex } from '@coffeekraken/sugar/color';
 * __rgbaToHex(10,20,30,10);
 *
 * @see         https://www.npmjs.com/package/colors-convert
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function RGBToHex(r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;

    return '#' + r + g + b;
}

export default function __rgbaToHex(
    r: string | number | any,
    g: number,
    b: number,
    a = 1,
): string {
    // string support
    if (typeof r === 'string') {
        if (!r.match(/^rgba?\(/)) {
            throw new Error(
                '<red>[rgbaToHex]</red> When passing a string to the first parameter, it MUST be formatted like: rgba?(.*)',
            );
        }
        r = __parseRgba(r);
    }

    // object support
    if (typeof r === 'object') {
        r = r.r;
        g = r.g;
        b = r.b;
    }

    return RGBToHex(r, g, b);
}
