// @ts-nocheck

import __parse from './parse';
import __hsl2rgba from './hsl2rgba';
import __hsv2rgba from './hsv2rgba';
import __rgba2hsl from './rgba2hsl';
import __rgba2hsv from './rgba2hsv';
import __rgba2hex from './rgba2hex';

/**
 * @name                  convert
 * @namespace            js.color
 * @type                  Function
 * @stable
 *
 * This function take as input any color format like rgba Object, hsl Object, hsv Object, hex String, rgba String, hsl String or hsv String
 * and convert it into the wanted format like "rgba", "hsl", "hsv", "hex", "rgbaString", "hslString" or "hsvString"
 *
 * @param           {Mixed}               input           The input color to convert
 * @param           {String}              [format="rgba"]     The format wanted
 * @return          {Mixed}                               The converted color
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import convert from '@coffeekraken/sugar/js/color/convert';
 * convert('rgba(10,20,30,100)', 'rgba'); // => { r: 10, g: 20, b: 30, a: 100 }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function convert(input, format = 'rgba') {
  // transforming the input into rgba object
  let rgbaObj = {};
  if (typeof input === 'string') {
    rgbaObj = __parse(input, 'rgba');
  } else if (typeof input === 'object') {
    if (
      input.r !== undefined &&
      input.g !== undefined &&
      input.b !== undefined
    ) {
      rgbaObj = input;
    } else if (
      input.h !== undefined &&
      input.s !== undefined &&
      input.l !== undefined
    ) {
      rgbaObj = __hsl2rgba(input);
    } else if (
      input.h !== undefined &&
      input.s !== undefined &&
      input.v !== undefined
    ) {
      rgbaObj = __hsv2rgba(input);
    }
  }

  switch (format) {
    case 'rgba':
      return rgbaObj;
    case 'hsl':
      return __rgba2hsl(rgbaObj);
    case 'hsv':
      return __rgba2hsv(rgbaObj);
    case 'hex':
    case 'hexString':
      return __rgba2hex(rgbaObj);
    case 'rgbaString':
      return `rgba(${rgbaObj.r},${rgbaObj.g},${rgbaObj.b},${rgbaObj.a})`;
    case 'hslString':
      const hslObj = convert(rgbaObj, 'hsl');
      return `hsl(${hslObj.h},${hslObj.s},${hslObj.l})`;
    case 'hsvString':
      const hsvObj = convert(rgbaObj, 'hsv');
      return `hsv(${hsvObj.h},${hsvObj.s},${hsvObj.v})`;
  }

  // if nothing supported
  return undefined;
}
export default convert;
