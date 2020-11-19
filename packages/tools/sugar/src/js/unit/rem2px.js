/**
 * @name                    rem2px
 * @namespace           sugar.js.unit
 * @type                    Function
 *
 * Convert rem value to a px one
 *
 * @param         {Number}          rem           The rem value to convert
 * @return        {Number}                        The pixel value
 *
 * @example         js
 * import rem2px from '@coffeekraken/sugar/js/unit/rem2px';
 * rem2px(2);
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function rem2px(rem) {
  return (
    rem *
    parseFloat(getComputedStyle(document.documentElement).fontSize || '16px')
  );
}
