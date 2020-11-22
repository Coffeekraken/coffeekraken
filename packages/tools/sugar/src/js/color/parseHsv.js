/**
 * @name                parseHsv
 * @namespace           sugar.js.color
 * @type                Function
 *
 * Parse HSV
 *
 * @param         	{string}	          	hsvString		        	The hsv string (hsv(h,s,v)) to parse
 * @return        	{object}					                        		The hsv object representation
 *
 * @example       js
 * import parseHsv from '@coffeekraken/sugar/js/color/parseHsv';
 * parseHsv('hsv(10,10,10)');
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function parseHsv(hsvString) {
    hsvString = hsvString.toLowerCase();
    let string = hsvString
        .replace('hsv(', '')
        .replace(')', '')
        .replace(/\s/g, '');
    let array = string.split(',');
    return {
        h: parseFloat(array[0]),
        s: parseFloat(array[1]),
        v: parseFloat(array[2])
    };
}
