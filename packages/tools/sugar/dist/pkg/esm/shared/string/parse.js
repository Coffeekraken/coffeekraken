// @ts-nocheck
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
export default function (value) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsS0FBSztJQUMxQiwrQkFBK0I7SUFDL0Isb0JBQW9CO0lBQ3BCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRTVDLGtDQUFrQztJQUNsQyxJQUFJLEtBQUssS0FBSyxNQUFNO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDbEMsSUFBSSxLQUFLLEtBQUssT0FBTztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQ3BDLElBQUksS0FBSyxLQUFLLE1BQU07UUFBRSxPQUFPLElBQUksQ0FBQztJQUNsQyxJQUFJLEtBQUssS0FBSyxXQUFXO1FBQUUsT0FBTyxTQUFTLENBQUM7SUFFNUMsbUJBQW1CO0lBQ25CLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUV6Qyw4Q0FBOEM7SUFDOUMsSUFBSTtRQUNBLE9BQU8sUUFBUSxDQUFDOztzQkFFRixLQUFLO1NBQ2xCLENBQUMsRUFBRSxDQUFDO0tBQ1I7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0wsQ0FBQyJ9