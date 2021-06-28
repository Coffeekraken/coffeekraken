// @ts-nocheck

/**
 * @name                        parseRgba
 * @namespace            js.color
 * @type                        Function
 * @platform          js
 * @platform          ts
 * @platform          node
 * @status            beta
 *
 * Parse RGBA string and return an object
 *
 * @param 	          {string}	            rgbaString		            The rgba string (rgba(r,g,b,a)) to parse
 * @return 	          {object} 				                              	The rgba object representation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import parseRgba from '@coffeekraken/sugar/js/color/parseRgba';
 * parseRgba('rgba(20,10,100,20)');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function parseRgba(rgbaString) {
  rgbaString = rgbaString.toLowerCase();
  const string = rgbaString
    .replace('rgba(', '')
    .replace(')', '')
    .replace(/\s/g, '');
  const array = string.split(',');
  return {
    r: parseInt(array[0]),
    g: parseInt(array[1]),
    b: parseInt(array[2]),
    a: parseInt(array[3])
  };
}
export default parseRgba;
