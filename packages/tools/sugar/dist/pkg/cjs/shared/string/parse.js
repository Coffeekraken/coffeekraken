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
 * @snippet         __parse($1)
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
    // true | false | null | undefined
    if (value === 'true')
        return true;
    if (value === 'false')
        return false;
    if (value === 'null')
        return null;
    if (value === 'undefined')
        return undefined;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsbUJBQXlCLEtBQUs7SUFDMUIsK0JBQStCO0lBQy9CLG9CQUFvQjtJQUNwQixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUU1QyxrQ0FBa0M7SUFDbEMsSUFBSSxLQUFLLEtBQUssTUFBTTtRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQ2xDLElBQUksS0FBSyxLQUFLLE9BQU87UUFBRSxPQUFPLEtBQUssQ0FBQztJQUNwQyxJQUFJLEtBQUssS0FBSyxNQUFNO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDbEMsSUFBSSxLQUFLLEtBQUssV0FBVztRQUFFLE9BQU8sU0FBUyxDQUFDO0lBRTVDLG1CQUFtQjtJQUNuQixLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFekMsOENBQThDO0lBQzlDLElBQUk7UUFDQSxPQUFPLFFBQVEsQ0FBQzs7c0JBRUYsS0FBSztTQUNsQixDQUFDLEVBQUUsQ0FBQztLQUNSO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixPQUFPLEtBQUssQ0FBQztLQUNoQjtBQUNMLENBQUM7QUF2QkQsNEJBdUJDIn0=