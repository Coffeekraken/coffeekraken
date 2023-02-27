// @ts-nocheck

/**
 * @name              getMethods
 * @namespace            shared.class
 * @type              Function
 * @platform          js
 * @platform          node
 * @status            beta
 *
 * This function take an instance as parameter and return all the methods in array format
 *
 * @param         {Object}        instance        The instance of the object to get the methods names of
 * @return        {Array}                         A simple array of all the methods names
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __getMethods($1)
 * 
 * @example         js
 * import { __getMethods } from '@coffeekraken/sugar/class';
 * myClass {
 *  constructor() {}
 *  hello() {}
 *  world() {}
 * }
 * const myInstance = new myClass();
 * __getMethods(myInstance); // => ['hello','world']
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __getMethods(toCheck) {
    let props = [];
    let obj = toCheck;
    do {
        const _props = Object.getOwnPropertyNames(obj);
        if (_props.indexOf('__defineGetter__') !== -1) continue;
        props = props.concat(_props);
    } while ((obj = Object.getPrototypeOf(obj)));

    return props.sort().filter(function (e, i, arr) {
        if (e != arr[i + 1] && typeof toCheck[e] == 'function') return true;
    });
}
