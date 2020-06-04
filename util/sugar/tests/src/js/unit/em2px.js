/**
 * @name                    em2px
 * @namespace               sugar.js.unit
 * @type                    Function
 * 
 * Convert rem value to a px one
 * 
 * @param         {Number}          em           The rem value to convert
 * @param         {HTMLElement}     [$elm=document.documentElement]         The HTMLElement to take as source for calculating the em
 * @return        {Number}                        The pixel value
 * 
 * @example         js
 * import em2px from '@coffeekraken/sugar/js/unit/em2px';
 * em2px(2);
 * 
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function em2px(em, $elm = document.documentElement) {
  return em * parseFloat(getComputedStyle($elm).fontSize || '16px');
}