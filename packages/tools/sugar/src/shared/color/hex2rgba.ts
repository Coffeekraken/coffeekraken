// @ts-nocheck

/**
 * @name                  hex2rgba
 * @namespace            js.color
 * @type                  Function
 * @platform          js
 * @platform          ts
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
 * import hex2rgba from '@coffeekraken/sugar/js/color/hex2rgba';
 * hex2rgba('#ff00ff');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function hex2rgba(hex) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  let a = 1;
  if (hex.length == 8) {
    a = (1 / 255) * parseInt(hex.substring(6, 8), 16);
  }
  return {
    r: r,
    g: g,
    b: b,
    a: a
  };
}
export default hex2rgba;
