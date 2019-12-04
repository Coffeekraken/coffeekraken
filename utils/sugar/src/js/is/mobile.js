import MobileDetect from "mobile-detect";
/**
 * @name        isMobile
 * @namespace       sugar.js.is
 * @type      Function
 *
 * Detect if is a mobile device (phone or tablet)
 *
 * @return    {Boolean}    true if is a mobile, false if not
 *
 * @example 	js
 * import isMobile from 'coffeekraken-sugar/js/is/mobile'
 * if (isMobile()) {
 *   // do something cool...
 * }
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function isMobile() {
  const md = new MobileDetect(window.navigator.userAgent);
  return md.mobile() !== null;
}
