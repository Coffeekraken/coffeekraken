"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                                    methodExists
 * @namespace            js.class
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
 * import methodExists from '@coffeekraken/sugar/node/class/methodExists';
 * const myInstance = new Coco();
 * methodExists(myInstance, 'hello', 'world'); // => ['world'];
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function methodExists(instance, ...methods) {
    const missingMethodsArray = [];
    if (!Array.isArray(methods))
        methods = [methods];
    methods.forEach((method) => {
        if (typeof instance[method] !== 'function')
            missingMethodsArray.push(method);
    });
    return !missingMethodsArray.length ? true : missingMethodsArray;
}
exports.default = methodExists;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsU0FBUyxZQUFZLENBQUMsUUFBUSxFQUFFLEdBQUcsT0FBTztJQUN0QyxNQUFNLG1CQUFtQixHQUFHLEVBQUUsQ0FBQztJQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFBRSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqRCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7UUFDdkIsSUFBSSxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxVQUFVO1lBQ3RDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUM7QUFDcEUsQ0FBQztBQUNELGtCQUFlLFlBQVksQ0FBQyJ9