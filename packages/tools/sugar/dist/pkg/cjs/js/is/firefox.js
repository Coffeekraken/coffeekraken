"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        isFirefox
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Detect if is firefox
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 * @return    {Boolean}    true if is firefox, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import isFirefox from '@coffeekraken/sugar/js/is/firefox'
 * if (isFirefox()) {
 *   // do something cool
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function isFirefox(ua = navigator.userAgent) {
    return ua.indexOf('Firefox') > -1;
}
exports.default = isFirefox;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxLQUFhLFNBQVMsQ0FBQyxTQUFTO0lBQy9DLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN0QyxDQUFDO0FBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=