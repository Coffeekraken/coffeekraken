import MobileDetect from 'mobile-detect';
/**
 * @name        isMobile
 * @namespace           js.is
 * @type      Function
 *
 * Detect if is a mobile device (phone or tablet)
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test *
 * @return    {Boolean}    true if is a mobile, false if not
 *
 * @example 	js
 * import isMobile from 'coffeekraken-sugar/js/is/mobile'
 * if (isMobile()) {
 *   // do something cool...
 * }
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function isMobile(ua = navigator.userAgent) {
  const md = new MobileDetect(ua);
  return md.mobile() !== null;
}
