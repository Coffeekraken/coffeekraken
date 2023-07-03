"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
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
function __getMethods(toCheck) {
    let props = [];
    let obj = toCheck;
    do {
        const _props = Object.getOwnPropertyNames(obj);
        if (_props.indexOf('__defineGetter__') !== -1)
            continue;
        props = props.concat(_props);
    } while ((obj = Object.getPrototypeOf(obj)));
    return props.sort().filter(function (e, i, arr) {
        if (e != arr[i + 1] && typeof toCheck[e] == 'function')
            return true;
    });
}
exports.default = __getMethods;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JHO0FBQ0gsU0FBd0IsWUFBWSxDQUFDLE9BQU87SUFDeEMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2YsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDO0lBQ2xCLEdBQUc7UUFDQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0MsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUUsU0FBUztRQUN4RCxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNoQyxRQUFRLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtJQUU3QyxPQUFPLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUc7UUFDMUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxVQUFVO1lBQUUsT0FBTyxJQUFJLENBQUM7SUFDeEUsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBWkQsK0JBWUMifQ==