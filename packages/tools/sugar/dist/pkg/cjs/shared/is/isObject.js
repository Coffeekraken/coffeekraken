"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        isObject
 * @namespace            shared.is
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed value is a js object
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a object, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __isObject } from '@coffeekraken/sugar/is'
 * if (__isObject({}) {
 *   // do something
 * }
 *
 @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isObject(value) {
    return value && typeof value === 'object' && value.constructor === Object;
}
exports.default = __isObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBd0IsVUFBVSxDQUFDLEtBQUs7SUFDcEMsT0FBTyxLQUFLLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxXQUFXLEtBQUssTUFBTSxDQUFDO0FBQzlFLENBQUM7QUFGRCw2QkFFQyJ9