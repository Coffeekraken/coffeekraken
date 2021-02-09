"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        isChrome
 * @namespace           sugar.js.is
 * @type      Function
 * @stable
 *
 * Detect if is chrome
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is chrome, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import isChrome from '@coffeekraken/sugar/js/is/chrome'
 * if (isChrome()) {
 *   // do something cool
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isChrome(ua = navigator.userAgent) {
    return ua.indexOf('Chrome') > -1;
}
exports.default = isChrome;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hyb21lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hyb21lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsUUFBUSxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUMsU0FBUztJQUN4QyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUNELGtCQUFlLFFBQVEsQ0FBQyJ9