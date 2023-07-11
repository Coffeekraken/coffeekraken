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

export default function __isIdCompliant(str: string): boolean {
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
