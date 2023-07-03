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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsbUJBQXlCLEtBQUs7SUFDMUIsK0JBQStCO0lBQy9CLG9CQUFvQjtJQUNwQixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUU1QyxtQkFBbUI7SUFDbkIsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRXpDLDhDQUE4QztJQUM5QyxJQUFJO1FBQ0EsT0FBTyxRQUFRLENBQUM7O3NCQUVGLEtBQUs7U0FDbEIsQ0FBQyxFQUFFLENBQUM7S0FDUjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDTCxDQUFDO0FBakJELDRCQWlCQyJ9