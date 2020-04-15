import MobileDetect from "mobile-detect";
/**
 * @name        isPhone
 * @namespace       sugar.js.is
 * @type      Function
 *
 * Detect if is a phone device
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * 
 * @return    {Boolean}    true if is a phone, false if not
 *
 * @example 	js
 * import isPhone from '@coffeekraken/sugar/js/is/phone'
 * if (isPhone()) {
 *   // do something cool...
 * }
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function isPhone(ua = navigator.userAgent) {
  const md = new MobileDetect(ua);
  return md.phone() !== null;
}
