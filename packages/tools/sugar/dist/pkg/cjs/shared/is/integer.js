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
 * import isInteger from '@coffeekraken/sugar/shared/is/integer';
 * isInteger(10) => true
 * isInteger('hello') => false
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function isInteger(data) {
    return (typeof data === 'number' &&
        !isNaN(data) &&
        (function (x) {
            return (x | 0) === x;
        })(parseFloat(data)));
}
exports.default = isInteger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxJQUFJO0lBQ25CLE9BQU8sQ0FDSCxPQUFPLElBQUksS0FBSyxRQUFRO1FBQ3hCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUNaLENBQUMsVUFBVSxDQUFDO1lBQ1IsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQ3ZCLENBQUM7QUFDTixDQUFDO0FBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=