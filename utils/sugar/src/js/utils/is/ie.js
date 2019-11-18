/**
 * Detect if is ie (internet explorer)
 * @example 	js
 * import isIe from 'coffeekraken-sugar/js/utils/is/ie'
 * if (isIe()) {
 *   // do something cool
 * }
 *
 * @return    {Boolean}    true if is ie, false if not
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function isIe() {
  return navigator.userAgent.indexOf("MSIE") > -1;
}
