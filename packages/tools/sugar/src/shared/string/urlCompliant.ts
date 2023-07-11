import __simplifySpecialChars from './simplifySpecialChars.js';

/**
 * @name            urlCompliant
 * @namespace            shared.string
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function take a string and return a version of it that you can safely use
 * in url for example. It replace spaces with '-' as well as all the special characters
 * with their simple version like "à" will be replaces by "a"
 *
 * @param       {String}        string         The string to process
 * @return      {String}                        The processed string
 *
 * @snippet         __urlCompliant($1)
 *
 * @example         php
 * import { __urlCompliant } from '@coffeekraken/sugar/string';
 * __urlCompliant('Hello world'); // => hello-world
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IurlCompliantSettings {
    exclude: string[];
}

export default function __urlCompliant(
    str: string,
    settings?: IurlCompliantSettings,
): string {
    settings = {
        exclude: [],
        ...(settings ?? {}),
    };

    // spaces
    str = str.replace(/\s/gm, '-');

    // special characters
    str = __simplifySpecialChars(str);
    // replace characters like /, etc...
    const dict = {
        '\\': '-',
        '@': '',
        '(': '-',
        ')': '-',
        '[': '-',
        ']': '-',
        ',': '-',
        ':': '-',
    };

    settings.exclude.forEach((char) => {
        delete dict[char];
    });

    Object.keys(dict).forEach((char) => {
        str = str.split(char).join(dict[char]);
    });
    // first and last characters + multiple ---
    str = str.replace(/\.{2,999}/gm, '.');
    str = str.replace(/^-{1,999}/gm, '');
    str = str.replace(/-{1,999}$/gm, '');
    str = str.replace(/-{2,999}/gm, '-');

    // lowercase
    str = str.toLowerCase();

    return str;
}
