// @ts-nocheck

/**
 * @name                    parseHsla
 * @namespace            shared.color
 * @type                    Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * Parse HSL
 *
 * @param 	      {string}	        hslaString			      The hsl string (hsl(h,s,l)) to parse
 * @return 	        {object} 					                  	The hsl object representation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import { __parseHsla } from '@coffeekraken/sugar/color';
 * __parseHsla('hsl(20,20,20)');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __parseHsla(hslaString) {
    hslaString = hslaString.toLowerCase();
    const string = hslaString
        .replace('hsla(', '')
        .replace('hsl(', '')
        .replace(')', '')
        .replace(/\s/g, '');
    const array = string.split(',');

    return {
        h: parseFloat(array[0]),
        s: parseFloat(array[1]),
        l: parseFloat(array[2]),
        a: array[3] ? parseFloat(array[3]) : 1,
    };
}
