/**
 * @name        isSafari
 * @namespace           sugar.js.is
 * @type      Function
 *
 * Detect if is safari
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 *
 * @example 	js
 * import isSafari from '@coffeekraken/sugar/js/is/safari'
 * if (isSafari()) {
 *   // do something cool
 * }
 *
 * @return    {Boolean}    true if is safari, false if not
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function isSafari(ua = navigator.userAgent) {
    return ua.indexOf('Safari') != -1 && ua.indexOf('Chrome') == -1;
}
