// @ts-nocheck

/**
 * @name        lowerFirst
 * @namespace            shared.string
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Lower first letter
 *
 * @param    {String}    string    The string to lower the first letter
 * @return    {String}    The string with the first letter lowered
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __lowerFirst } from '@coffeekraken/sugar/string'
 * __lowerFirst('Hello world') // hello world
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __lowerFirst(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}
