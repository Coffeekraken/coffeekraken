import __simplifySpecialChars from './simplifySpecialChars';

/**
 * @name            idCompliant
 * @namespace            shared.string
 * @type            Function
 * @platform        js
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * This function take a string and return a version of it that you can safely use
 * in html id for example. It replace spaces with '-' as well as all the special characters
 * with their simple version like "à" will be replaces by "a"
 *
 * @param       {String}        string         The string to process
 * @return      {String}                        The processed string
 *
 * @example         php
 * import __idCompliant from '@coffeekraken/sugar/shared/string/idCompliant';
 * __idCompliant('Hello world'); // => hello-world
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IIdCompliantSettings {
    exclude: string[];
}

export default function idCompliant(str: string, settings?: IIdCompliantSettings): string {
    settings = {
        exclude: [],
        ...(settings ?? {}),
    };

    // spaces
    str = str.replace(' ', '-');
    // special characters
    str = __simplifySpecialChars(str);
    // replace characters like /, etc...
    const dict = {
        '/': '-',
        '\\': '-',
        '@': '',
        '(': '-',
        ')': '-',
        '.': '-',
        ',': '-',
        ':': '-',
        '#': '-',
        '!': '-',
        '?': '-',
    };

    settings.exclude.forEach((char) => {
        delete dict[char];
    });

    Object.keys(dict).forEach((char) => {
        str = str.replace(char, dict[char]);
    });
    // first and last characters + multiple ---
    str = str.replace(/^-{1,999}/gm, '');
    str = str.replace(/-{1,999}$/gm, '');
    str = str.replace(/-{2,999}/gm, '-');
    // lowercase
    str = str.toLowerCase();

    return str;
}
