import MobileDetect from "mobile-detect";
/**
 * @name        isTablet
 * @namespace       sugar.js.is
 * @type      Function
 *
 * Detect if is a tablet device
 *
 * @return    {Boolean}    true if is a tablet, false if not
 *
 * @example 	js
 * import isTablet from '@coffeekraken/sugar/js/is/tablet'
 * if (isTablet()) {
 *   // do something cool...
 * }
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function isTablet() {
  const md = new MobileDetect(window.navigator.userAgent);
  return md.tablet() !== null;
}
