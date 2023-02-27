// @ts-nocheck

/**
 * @name        isRegexp
 * @namespace            shared.is
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed value is a js Regexp
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Regexp}   true if it's a Regexp, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isRegex($1)
 * 
 * @example    js
 * import { __isRegex } from '@coffeekraken/sugar/is'
 * if (__isRegex(/^hello$/g) {
 *   // do something
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isRegex(value) {
    return value && typeof value === 'object' && value.constructor === RegExp;
}
