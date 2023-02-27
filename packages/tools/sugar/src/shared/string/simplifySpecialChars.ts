/**
 * @name            simplifySpecialChars
 * @namespace            shared.string
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function take a string and replace all the special chars like "é", "à", etc...
 * with their simple version like "a", "e", etc...
 *
 * @param       {String}        str         The string to process
 * @return      {String}                        The processed string
 *
 * @snippet         __simplifySpecialChars($1)
 * 
 * @example         php
 * import { __simplifySpecialChars } from '@coffeekraken/sugar/string';
 * __simplifySpecialChars('É'); // E
 *
 * @see             https://stackoverflow.com/questions/14114411/remove-all-special-characters-from-a-string/14114443
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __simplifySpecialChars(str) {
    const utf8 = {
        a: /[áàâãªä]/gm,
        A: /[ÁÀÂÃÄ]/gm,
        I: /[ÍÌÎÏ]/gm,
        i: /[íìîï]/gm,
        e: /[éèêë]/gm,
        E: /[ÉÈÊË]/gm,
        o: /[óòôõºö]/gm,
        O: /[ÓÒÔÕÖ]/gm,
        u: /[úùûü]/gm,
        U: /[ÚÙÛÜ]/gm,
        c: /ç/gm,
        C: /Ç/gm,
        n: /ñ/gm,
        N: /Ñ/gm,
        '-': /–/gm,
        ' ': /[’‘‹›‚“”«»„[] ]/gm,
    };

    Object.keys(utf8).forEach((char) => {
        str = str.replace(utf8[char], char);
    });

    return str;
}
