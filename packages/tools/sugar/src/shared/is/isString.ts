// @ts-nocheck

/**
 * @name        isString
 * @namespace            shared.is
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed value is a js String
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a String, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isString($1)
 * 
 * @example    js
 * import { __isString } from '@coffeekraken/sugar/is'
 * if (__isString({}) {
 *   // do something
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isString(value) {
    return typeof value === 'string' || value instanceof String;
}
