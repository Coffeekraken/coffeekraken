/**
 * @name        isIe
 * @namespace           sugar.js.is
 * @type      Function
 * @stable
 *
 * Detect if is ie (internet explorer)
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is ie, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import isIe from '@coffeekraken/sugar/js/is/ie'
 * if (isIe()) {
 *   // do something cool
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function isIe(ua = navigator.userAgent) {
  return ua.indexOf('MSIE') > -1;
}
