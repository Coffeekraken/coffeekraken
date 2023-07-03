"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        isBase64
 * @namespace            shared.is
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed value is a base 64 string
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a Boolean, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isBase64($1)
 *
 * @example    js
 * import { __isBase64 } from '@coffeekraken/sugar/is'
 * if (__isBase64('wfwefwefiowjfiojwiefjwoiejfiowjfi9jef98je9f3j') {
 *   // do something
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isBase64(value) {
    if (typeof value !== 'string')
        return false;
    if (value === '' || value.trim() === '')
        return false;
    const reg = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    return reg.test(value);
}
exports.default = __isBase64;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUF3QixVQUFVLENBQUMsS0FBSztJQUNwQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUM1QyxJQUFJLEtBQUssS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUN0RCxNQUFNLEdBQUcsR0FDTCxrRUFBa0UsQ0FBQztJQUN2RSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0IsQ0FBQztBQU5ELDZCQU1DIn0=