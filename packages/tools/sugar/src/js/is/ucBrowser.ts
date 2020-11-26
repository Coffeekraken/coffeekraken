// @ts-nocheck

/**
 * @name        isUcBrowser
 * @namespace           sugar.js.is
 * @type      Function
 * @stable
 *
 * Detect if is the UC stock browser that is running the page
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import isUcBrowser from '@coffeekraken/sugar/js/is/ucBrowser'
 * if (isUcBrowser()) {
 *   // do something
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isUcBrowser(ua = navigator.userAgent) {
  return ua.match(/UCBrowser/i) !== null;
}
export = isUcBrowser;
