// @ts-nocheck

/**
 * @name        isJson
 * @namespace            shared.is
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed value is a valid json
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a valid json, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isJson($1)
 * 
 * @example    js
 * import { __isJson } from '@coffeekraken/sugar/is'
 * if (__isJson('[{id:10}]')) {
 *   // do something
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isJson(value) {
    try {
        const res = JSON.parse(value);
        if (Object.keys(res).length) return true;
        return false;
    } catch (e) {
        return false;
    }
    return true;
}
