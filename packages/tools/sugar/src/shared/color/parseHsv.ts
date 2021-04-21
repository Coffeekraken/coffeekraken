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
