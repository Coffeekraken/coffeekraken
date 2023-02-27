// @ts-nocheck

/**
 * @name                      isPlainObject
 * @namespace            shared.is
 * @type                      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed object (or array of objects) is/are plain object(s)
 *
 * @param         {Object|Array}            object                  The object(s) to check
 * @return        {Boolean}                                         true if is plain object(s), false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isPlainObject($1)
 * 
 * @example           js
 * import { __isPlainObject } from '@coffeekraken/sugar/is';
 * __isPlainObject({ hello: 'world'}); // => true
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isPlainObject(object) {
    if (!object) return false;
    if (typeof object !== 'object') return false;
    if (object.constructor && object.constructor.name !== 'Object')
        return false;
    if (Object.prototype.toString.call(object) !== '[object Object]')
        return false;
    if (object !== Object(object)) return false;
    // if (object.constructor !== Object) return false;
    return true;
}
