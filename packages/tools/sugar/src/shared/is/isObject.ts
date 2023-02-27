// @ts-nocheck

/**
 * @name        isObject
 * @namespace            shared.is
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed value is a js object
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a object, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isObject($1)
 * 
 * @example    js
 * import { __isObject } from '@coffeekraken/sugar/is'
 * if (__isObject({}) {
 *   // do something
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isObject(value) {
    return value && typeof value === 'object' && value.constructor === Object;
}
