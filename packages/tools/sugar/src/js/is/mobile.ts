// @ts-nocheck

import MobileDetect from 'mobile-detect';
/**
 * @name        isMobile
 * @namespace           sugar.js.is
 * @type      Function
 * @stable
 *
 * Detect if is a mobile device (phone or tablet)
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test *
 * @return    {Boolean}    true if is a mobile, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import isMobile from 'coffeekraken-sugar/js/is/mobile'
 * if (isMobile()) {
 *   // do something cool...
 * }
 *
 * @see       https://www.npmjs.com/package/mobile-detect
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isMobile(ua = navigator.userAgent) {
  const md = new MobileDetect(ua);
  return md.mobile() !== null;
}
export = isMobile;
