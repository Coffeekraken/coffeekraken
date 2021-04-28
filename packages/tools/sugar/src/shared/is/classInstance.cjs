"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        isClassInstance
 * @namespace            shared.is
 * @type         Function
 *
 * Check if the passed item is an object class and not a plain object.
 *
 * @param       {Any}           object          The object to check
 * @return      {Boolean}                           true if is an custom object instance, false if not
 *
 * @example         js
 * import isClassInstance from '@coffeekraken/sugar/shared/is/classInstance';
 * if (isClassInstance({
 *      something: 'hello'
 * })); // => false
 * class MyClass {
 *      constructor() {}
 * }
 * if (isClassInstance(new MyClass())); // => true
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function classInstance(object) {
    if (!object)
        return false;
    if (typeof object !== 'object')
        return false;
    if (object.constructor && object.constructor.name === 'Object')
        return false;
    if (Object.prototype.toString.call(object) === '[object Object]')
        return false;
    if (object.constructor === Object)
        return false;
    return true;
}
exports.default = classInstance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3NJbnN0YW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9zaGFyZWQvaXMvY2xhc3NJbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBd0IsYUFBYSxDQUFDLE1BQU07SUFDMUMsSUFBSSxDQUFDLE1BQU07UUFBRSxPQUFPLEtBQUssQ0FBQztJQUMxQixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUM3QyxJQUFJLE1BQU0sQ0FBQyxXQUFXLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssUUFBUTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzdFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLGlCQUFpQjtRQUM5RCxPQUFPLEtBQUssQ0FBQztJQUNmLElBQUksTUFBTSxDQUFDLFdBQVcsS0FBSyxNQUFNO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDaEQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBUkQsZ0NBUUMifQ==