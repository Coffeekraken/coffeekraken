"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simplifySpecialChars_js_1 = __importDefault(require("../string/simplifySpecialChars.js"));
/**
 * @name            isIdCompliant
 * @namespace            shared.string
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function check if the passed value is "id" compliant.
 * This mean that it has no special characters, no spaces and that it is lowercase
 *
 * @param       {String}        string         The string to process
 * @return      {Boolean}                        true if compliant, false if not
 *
 * @snippet         __isIdCompliant($1)
 *
 * @example         php
 * import { __isIdCompliant } from '@coffeekraken/sugar/string';
 * __isIdCompliant('Hello world'); // => false
 * __isIdCompliant('hello-world'); // => true
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isIdCompliant(str) {
    // "" empty
    if (!str) {
        return false;
    }
    // spaces
    if (str.match(/\s/gm)) {
        return false;
    }
    // special characters
    if (str !== (0, simplifySpecialChars_js_1.default)(str)) {
        return false;
    }
    // replace characters like /, etc...
    const dict = {
        '/': '-',
        '@': '',
        '.': '-',
        ',': '-',
        '\\': '-',
        '(': '-',
        ')': '-',
        '{': '-',
        '}': '-',
        '[': '-',
        ']': '-',
        '=': '-',
        '?': '-',
        '!': '-',
        '&': '-',
        '%': '-',
        '*': '-',
        '"': '-',
        "'": '-',
        '`': '-',
        '+': '-',
        '°': '-',
        $: '-',
        '<': '-',
        '>': '-',
        ':': '-',
        '#': '-',
    };
    for (let [char, v] of Object.entries(dict)) {
        if (str.includes(char)) {
            return false;
        }
    }
    // lowercase
    if (str !== str.toLowerCase()) {
        return false;
    }
    return true;
}
exports.default = __isIdCompliant;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0dBQXVFO0FBRXZFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILFNBQXdCLGVBQWUsQ0FBQyxHQUFXO0lBQy9DLFdBQVc7SUFDWCxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ04sT0FBTyxLQUFLLENBQUM7S0FDaEI7SUFFRCxTQUFTO0lBQ1QsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0lBRUQscUJBQXFCO0lBQ3JCLElBQUksR0FBRyxLQUFLLElBQUEsaUNBQXNCLEVBQUMsR0FBRyxDQUFDLEVBQUU7UUFDckMsT0FBTyxLQUFLLENBQUM7S0FDaEI7SUFFRCxvQ0FBb0M7SUFDcEMsTUFBTSxJQUFJLEdBQUc7UUFDVCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxFQUFFO1FBQ1AsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLElBQUksRUFBRSxHQUFHO1FBQ1QsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLENBQUMsRUFBRSxHQUFHO1FBQ04sR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7S0FDWCxDQUFDO0lBRUYsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDeEMsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO0tBQ0o7SUFFRCxZQUFZO0lBQ1osSUFBSSxHQUFHLEtBQUssR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFFO1FBQzNCLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQTNERCxrQ0EyREMifQ==