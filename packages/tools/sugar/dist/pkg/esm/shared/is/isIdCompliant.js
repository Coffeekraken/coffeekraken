import __simplifySpecialChars from '../string/simplifySpecialChars.js';
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
export default function __isIdCompliant(str) {
    // "" empty
    if (!str) {
        return false;
    }
    // spaces
    if (str.match(/\s/gm)) {
        return false;
    }
    // special characters
    if (str !== __simplifySpecialChars(str)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sc0JBQXNCLE1BQU0sbUNBQW1DLENBQUM7QUFFdkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBRUgsTUFBTSxDQUFDLE9BQU8sVUFBVSxlQUFlLENBQUMsR0FBVztJQUMvQyxXQUFXO0lBQ1gsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNOLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0lBRUQsU0FBUztJQUNULElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNuQixPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUVELHFCQUFxQjtJQUNyQixJQUFJLEdBQUcsS0FBSyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNyQyxPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUVELG9DQUFvQztJQUNwQyxNQUFNLElBQUksR0FBRztRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsSUFBSSxFQUFFLEdBQUc7UUFDVCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsQ0FBQyxFQUFFLEdBQUc7UUFDTixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztLQUNYLENBQUM7SUFFRixLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN4QyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEIsT0FBTyxLQUFLLENBQUM7U0FDaEI7S0FDSjtJQUVELFlBQVk7SUFDWixJQUFJLEdBQUcsS0FBSyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDM0IsT0FBTyxLQUFLLENBQUM7S0FDaEI7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=