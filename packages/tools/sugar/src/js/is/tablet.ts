// @ts-nocheck

import MobileDetect from 'mobile-detect';
/**
 * @name        isTablet
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @platform          ts
 * @status        beta
 *
 * Detect if is a tablet device
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is a tablet, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import isTablet from '@coffeekraken/sugar/js/is/tablet'
 * if (isTablet()) {
 *   // do something cool...
 * }
 *
 * @see       https://www.npmjs.com/package/mobile-detect
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isTablet(ua: string = navigator.userAgent): boolean {
  const md = new MobileDetect(ua);
  return md.tablet() !== null;
}
export default isTablet;
