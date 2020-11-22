/**
 * @name                    parseHsl
 * @namespace           sugar.js.color
 * @type                    Function
 *
 * Parse HSL
 *
 * @param 	      {string}	        hslString			      The hsl string (hsl(h,s,l)) to parse
 * @return 	        {object} 					                  	The hsl object representation
 *
 * @example         js
 * import parseHsl from '@coffeekraken/sugar/color/parseHsl';
 * parseHsl('hsl(20,20,20)');
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function parseHsl(hslString) {
    hslString = hslString.toLowerCase();
    let string = hslString
        .replace('hsl(', '')
        .replace(')', '')
        .replace(/\s/g, '');
    let array = string.split(',');
    return {
        h: parseFloat(array[0]),
        s: parseFloat(array[1]),
        l: parseFloat(array[2])
    };
}
