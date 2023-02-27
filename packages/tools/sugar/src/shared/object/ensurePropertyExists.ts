// @ts-nocheck

import __get from './get';
import __set from './set';

/**
 * @name                        ensurePropertyExists
 * @namespace            shared.object
 * @type                        Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Pass a string like "my.cool.object" and the value it has to be and this function will ensure that this deep object exist
 *
 * @param           {Object}            obj                           The object on which to check the path existence
 * @param           {String}            path                           The dotted object path to check
 * @param           {Mixed}             value                         The value to set to the object path created if not already exist
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __ensurePropertyExists($1, $2)
 * 
 * @example           js
 * import { __ensureProperyExists } from '@coffeekraken/sugar/object';
 * const myObj = { hello: 'world' }«
 * __ensureProperyExists(myObj, 'cool.object', {});
 * // { hello: 'world', cool: { object: {} } }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __ensureProperyExists(obj, path, value = {}) {
    const v = __get(obj, path);
    if (v === undefined) {
        __set(obj, path, value);
    }
}
