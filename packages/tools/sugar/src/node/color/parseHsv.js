"use strict";
// @ts-nocheck
// @shared
/**
 * @name                parseHsv
 * @namespace           sugar.js.color
 * @type                Function
 * @stable
 *
 * Parse HSV
 *
 * @param         	{string}	          	hsvString		        	The hsv string (hsv(h,s,v)) to parse
 * @return        	{object}					                        		The hsv object representation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import parseHsv from '@coffeekraken/sugar/js/color/parseHsv';
 * parseHsv('hsv(10,10,10)');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function parseHsv(hsvString) {
    hsvString = hsvString.toLowerCase();
    const string = hsvString
        .replace('hsv(', '')
        .replace(')', '')
        .replace(/\s/g, '');
    const array = string.split(',');
    return {
        h: parseFloat(array[0]),
        s: parseFloat(array[1]),
        v: parseFloat(array[2])
    };
}
module.exports = parseHsv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VIc3YuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZUhzdi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7QUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsU0FBUyxRQUFRLENBQUMsU0FBUztJQUN6QixTQUFTLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BDLE1BQU0sTUFBTSxHQUFHLFNBQVM7U0FDckIsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7U0FDbkIsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7U0FDaEIsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN0QixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLE9BQU87UUFDTCxDQUFDLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixDQUFDLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixDQUFDLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN4QixDQUFDO0FBQ0osQ0FBQztBQUNELGlCQUFTLFFBQVEsQ0FBQyJ9