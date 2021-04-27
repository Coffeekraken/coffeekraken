// @ts-nocheck
/**
 * @name                parseHsv
 * @namespace            js.color
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
export default parseHsv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VIc3YuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvc2hhcmVkL2NvbG9yL3BhcnNlSHN2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsU0FBUyxRQUFRLENBQUMsU0FBUztJQUN6QixTQUFTLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BDLE1BQU0sTUFBTSxHQUFHLFNBQVM7U0FDckIsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7U0FDbkIsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7U0FDaEIsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN0QixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLE9BQU87UUFDTCxDQUFDLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixDQUFDLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixDQUFDLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN4QixDQUFDO0FBQ0osQ0FBQztBQUNELGVBQWUsUUFBUSxDQUFDIn0=