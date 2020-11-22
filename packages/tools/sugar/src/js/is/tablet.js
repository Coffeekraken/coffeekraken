import MobileDetect from 'mobile-detect';
/**
 * @name        isTablet
 * @namespace           sugar.js.is
 * @type      Function
 *
 * Detect if is a tablet device
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
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
export default function isTablet(ua = navigator.userAgent) {
    const md = new MobileDetect(ua);
    return md.tablet() !== null;
}
