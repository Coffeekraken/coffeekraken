"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = isSafari;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FmYXJpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2FmYXJpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsUUFBUSxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUMsU0FBUztJQUN4QyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNsRSxDQUFDO0FBQ0Qsa0JBQWUsUUFBUSxDQUFDIn0=