/**
 * @name                  hexToRgba
 * @namespace            shared.color
 * @type                  Function
 * @platform          js
 * @platform          node
 * @status            beta
 *
 * Hex to RGBA
 *
 * @param	              {string}       	hex         		The hex string to convert
 * @return            	{object} 			                  	The rgba object representation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import { __hexToRgba } from '@coffeekraken/sugar/color';
 * __hexToRgba('#ff00ff');
 *
 * @see         https://www.npmjs.com/package/colors-convert
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function hexToRGBA(h) {
    let r = 0,
        g = 0,
        b = 0;

    // 3 digits
    if (h.length == 4) {
        r = '0x' + h[1] + h[1];
        g = '0x' + h[2] + h[2];
        b = '0x' + h[3] + h[3];

        // 6 digits
    } else if (h.length == 7) {
        r = '0x' + h[1] + h[2];
        g = '0x' + h[3] + h[4];
        b = '0x' + h[5] + h[6];
    }
    return { r, g, b, a: 1 };
}

interface IHexToToRbaResult {
    r: number;
    g: number;
    b: number;
    a: number;
}

export default function __hexToRgba(hex: string): IHexToToRbaResult {
    // return hexToRgba(hex, 1);
    return hexToRGBA(hex);
}
