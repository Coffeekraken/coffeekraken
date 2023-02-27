// @ts-nocheck

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
 * @snippet         __methodExists($1)
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
export default function __methodExists(
    instance,
    ...methods
): boolean | string[] {
    const missingMethodsArray = [];
    if (!Array.isArray(methods)) methods = [methods];
    methods.forEach((method) => {
        if (typeof instance[method] !== 'function')
            missingMethodsArray.push(method);
    });
    return !missingMethodsArray.length ? true : missingMethodsArray;
}
