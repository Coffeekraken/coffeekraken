// @ts-nocheck

/**
 * @name        isSafari
 * @namespace           sugar.js.is
 * @type      Function
 * @stable
 *
 * Detect if is safari
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is safari, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import isSafari from '@coffeekraken/sugar/js/is/safari'
 * if (isSafari()) {
 *   // do something cool
 * }
 *
 * @since         1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isSafari(ua = navigator.userAgent) {
  return ua.indexOf('Safari') != -1 && ua.indexOf('Chrome') == -1;
}
export = isSafari;