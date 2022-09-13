/**
 * @name        isClassInstance
 * @namespace            shared.is
 * @type         Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed item is an object class and not a plain object.
 *
 * @param       {Any}           object          The object to check
 * @return      {Boolean}                           true if is an custom object instance, false if not
 *
 * @example         js
 * import { __isClassInstance } from '@coffeekraken/sugar/is';
 * if (__isClassInstance({
 *      something: 'hello'
 * })); // => false
 * class MyClass {
 *      constructor() {}
 * }
 * __isClassInstance(new MyClass());
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isClassInstance(object) {
    if (!object) return false;
    if (typeof object !== 'object') return false;
    if (object.constructor && object.constructor.name === 'Object')
        return false;
    if (Object.prototype.toString.call(object) === '[object Object]')
        return false;
    if (object.constructor === Object) return false;
    return true;
}
