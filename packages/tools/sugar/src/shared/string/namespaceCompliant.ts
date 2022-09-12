import __simplifySpecialChars from './simplifySpecialChars';

/**
 * @name            namespaceCompliant
 * @namespace            shared.string
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function take a string and return a version of it that you can safely use
 * as a namespace with just dots and non special characters.
 *
 * @param       {String}        string         The string to process
 * @return      {String}                        The processed string
 *
 * @example         php
 * import { __namespaceCompliant } from '@coffeekraken/sugar/string';
 * __namespaceCompliant('Hello world'); // => hello-world
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface InamespaceCompliantSettings {
    exclude: string[];
}

export default function __namespaceCompliant(
    str: string,
    settings?: InamespaceCompliantSettings,
): string {
    settings = {
        exclude: [],
        ...(settings ?? {}),
    };

    // spaces
    str = str.replace(/\s{1,9999999999999999}/gm, '-');
    // special characters
    str = __simplifySpecialChars(str);
    // replace characters like /, etc...
    const dict = {
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
        '/': '.',
        '°': '-',
        $: '-',
        '<': '-',
        '>': '-',
        ',': '-',
        ':': '-',
        '#': '-',
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
    str = str.replace(/[^a-zA-Z0-9@]{1,999}$/, '');
    str = str.replace(/^[^a-zA-Z0-9@]{1,999}/, '');

    return str;
}
