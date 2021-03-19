// @ts-nocheck

import __em2px from './em2px';
import __rem2px from './em2px';
import __px2em from './px2em';
import __px2rem from './px2rem';

/**
 * @name                  convert
 * @namespace           sugar.js.unit
 * @type                  Function
 * @stable
 *
 * Convert a passed unit to the wanted one. If the passed unit is a number and not a string like "10rem", the unit is take as pixels
 *
 * @param         {String|Number}           from            The base value to convert
 * @param         {String}                  [to='px']       The value unit you want back
 * @return        {Number}                                  The converted value
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import convert from '@coffeekraken/sugar/js/unit/convert';
 * convert('2rem', 'px');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function convert(from, to = 'px', $elm) {
  let fromUnit = 'px';
  if (typeof from === 'string' && parseFloat(from).toString() !== from) {
    fromUnit = from.replace(/[0-9.,]+/g, '');
  }
  const fromNumber = parseFloat(from);
  let pxValue;
  switch (fromUnit) {
    case 'px':
      pxValue = fromNumber;
      break;
    case 'rem':
      pxValue = __rem2px(fromNumber);
      break;
    case 'em':
      pxValue = __em2px(fromNumber, $elm);
      break;
    default:
      return from;
      break;
  }
  switch (to) {
    case 'px':
      return pxValue;
      break;
    case 'rem':
      return __px2rem(pxValue);
      break;
    case 'em':
      return __px2em(pxValue, $elm);
      break;
    default:
      return from;
      break;
  }
}
export default convert;
