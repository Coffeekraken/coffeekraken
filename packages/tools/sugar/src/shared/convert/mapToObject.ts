/**
 * @name          mapToObject
 * @namespace            shared.convert
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function simply take a Map object and convert it to a plain object
 *
 * @param       {Map}         map       The map object to convert into object
 * @return      {Object}                The plain object
 *
 * @example       js
 * import { __mapToObject } from '@coffeekraken/sugar/convert';
 * const myMap = new Map();
 * myMap.set('hello', 'world');
 * __mapToObject(myMap);
 * // {
 * //   hello: 'world'
 * // }
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __mapToObject(map: any): object {
    const obj = {};
    for (const [k, v] of map) obj[k] = v;
    return obj;
}
