// @ts-nocheck

/**
 * @name            parseAuthorString
 * @namespace            shared.package
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function simply take an author string like "Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)" and
 * transform it into a plain object with these properties: name, email and url
 *
 * @param       {String}          string          The string to parse
 * @return      {Object}                          The plain object version of the string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __parseAuthorString($1)
 * 
 * @example       js
 * import { __parseAuthorString } from '@coffeekraken/sugar/package';
 *  __parseAuthorString("Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)")
 * // => {
 *   "name": "Olivier Bossel",
 *   "email": "olivier.bossel@gmail.com",
 *   "url": "https://olivierbossel.com"
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __parseAuthorString(string) {
    const reg = /(.*)\s?<(.*)>\s?\((.*)\)/gm;
    const matches = reg.exec(string.trim());
    const authorObj = {};
    if (matches) {
        if (matches[1]) {
            authorObj.name = matches[1].trim();
        }
        if (matches[2]) {
            authorObj.email = matches[2].trim();
        }
        if (matches[3]) {
            authorObj.url = matches[3].trim();
        }
    }
    return authorObj;
}
