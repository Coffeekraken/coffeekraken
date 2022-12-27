"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                                  parse
 * @namespace            shared.string
 * @type                                  Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Parse a string and convert it into his native data type like date, number, boolean, etc...
 *
 * @param             {String}                        value                                 The value to convert
 * @return            {Mixed}                                                               The converted value
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import { __parse } from '@coffeekraken/sugar/string';
 *  __parse('10'); // => 10
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1(value) {
    // if the value is not a string
    // return it as he's
    if (typeof value !== 'string')
        return value;
    // small dirty hack
    value = value.split('⠀').join('').trim();
    // try to parse the string into a native value
    try {
        return Function(`
            "use strict";
            return (${value});
        `)();
    }
    catch (e) {
        return value;
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILG1CQUF5QixLQUFLO0lBQzFCLCtCQUErQjtJQUMvQixvQkFBb0I7SUFDcEIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFNUMsbUJBQW1CO0lBQ25CLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUV6Qyw4Q0FBOEM7SUFDOUMsSUFBSTtRQUNBLE9BQU8sUUFBUSxDQUFDOztzQkFFRixLQUFLO1NBQ2xCLENBQUMsRUFBRSxDQUFDO0tBQ1I7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0wsQ0FBQztBQWpCRCw0QkFpQkMifQ==