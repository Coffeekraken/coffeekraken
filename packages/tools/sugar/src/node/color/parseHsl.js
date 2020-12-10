"use strict";
// @ts-nocheck
// @shared
/**
 * @name                    parseHsl
 * @namespace           sugar.js.color
 * @type                    Function
 * @stable
 *
 * Parse HSL
 *
 * @param 	      {string}	        hslString			      The hsl string (hsl(h,s,l)) to parse
 * @return 	        {object} 					                  	The hsl object representation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import parseHsl from '@coffeekraken/sugar/color/parseHsl';
 * parseHsl('hsl(20,20,20)');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function parseHsl(hslString) {
    hslString = hslString.toLowerCase();
    const string = hslString
        .replace('hsl(', '')
        .replace(')', '')
        .replace(/\s/g, '');
    const array = string.split(',');
    return {
        h: parseFloat(array[0]),
        s: parseFloat(array[1]),
        l: parseFloat(array[2])
    };
}
module.exports = parseHsl;
//# sourceMappingURL=module.js.map