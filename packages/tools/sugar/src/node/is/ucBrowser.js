"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = isUcBrowser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWNCcm93c2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidWNCcm93c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBUyxXQUFXLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxTQUFTO0lBQzNDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxJQUFJLENBQUM7QUFDekMsQ0FBQztBQUNELGtCQUFlLFdBQVcsQ0FBQyJ9