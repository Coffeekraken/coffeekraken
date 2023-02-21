"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        isInteger
 * @namespace            shared.is
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed value is an integer
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import { __isInteger } from '@coffeekraken/sugar/is';
 * __isInteger(10) => true
 * __isInteger('hello') => false
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isInteger(data) {
    return (typeof data === 'number' &&
        !isNaN(data) &&
        (function (x) {
            return (x | 0) === x;
        })(parseFloat(data)));
}
exports.default = __isInteger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUF3QixXQUFXLENBQUMsSUFBSTtJQUNwQyxPQUFPLENBQ0gsT0FBTyxJQUFJLEtBQUssUUFBUTtRQUN4QixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDWixDQUFDLFVBQVUsQ0FBQztZQUNSLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUN2QixDQUFDO0FBQ04sQ0FBQztBQVJELDhCQVFDIn0=