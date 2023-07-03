// @ts-nocheck

/**
 * @name        isBoolean
 * @namespace            shared.is
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed value is a js Boolean
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a Boolean, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isBoolean($1)
 *
 * @example    js
 * import { __isBoolean } from '@coffeekraken/sugar/is'
 * if (__isBoolean(true) {
 *   // do something
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isBoolean(value) {
    return typeof value === 'boolean';
}
