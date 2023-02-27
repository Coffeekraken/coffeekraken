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
    if (typeof value !== 'string') return value;

    // small dirty hack
    value = value.split('⠀').join('').trim();

    // try to parse the string into a native value
    try {
        return Function(`
            "use strict";
            return (${value});
        `)();
    } catch (e) {
        return value;
    }
}
