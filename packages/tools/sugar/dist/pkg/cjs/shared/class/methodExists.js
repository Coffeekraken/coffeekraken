"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                                    methodExists
 * @namespace            shared.class
 * @type                                    Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * Check if one or more methods exists on a class instance
 *
 * @param           {Object}              instance                The instance to check the methods on
 * @param           {String}              ...methods              The methods to check
 * @return          {Boolean|Array}                               Return true if all is ok, and an array of missing methods if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * class Coco {
 *    hello() {}
 * }
 * import { __methodExists } from '@coffeekraken/sugar/class';
 * const myInstance = new Coco();
 * __methodExists(myInstance, 'hello', 'world'); // => ['world'];
 * __methodExists(myInstance, 'hello'); // => true
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __methodExists(instance, ...methods) {
    const missingMethodsArray = [];
    if (!Array.isArray(methods))
        methods = [methods];
    methods.forEach((method) => {
        if (typeof instance[method] !== 'function')
            missingMethodsArray.push(method);
    });
    return !missingMethodsArray.length ? true : missingMethodsArray;
}
exports.default = __methodExists;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUNILFNBQXdCLGNBQWMsQ0FDbEMsUUFBUSxFQUNSLEdBQUcsT0FBTztJQUVWLE1BQU0sbUJBQW1CLEdBQUcsRUFBRSxDQUFDO0lBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUFFLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pELE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUN2QixJQUFJLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLFVBQVU7WUFDdEMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQztBQUNwRSxDQUFDO0FBWEQsaUNBV0MifQ==