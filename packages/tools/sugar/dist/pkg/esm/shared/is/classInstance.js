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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function classInstance(object) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxhQUFhLENBQUMsTUFBTTtJQUN4QyxJQUFJLENBQUMsTUFBTTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzFCLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzdDLElBQUksTUFBTSxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxRQUFRO1FBQzFELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLGlCQUFpQjtRQUM1RCxPQUFPLEtBQUssQ0FBQztJQUNqQixJQUFJLE1BQU0sQ0FBQyxXQUFXLEtBQUssTUFBTTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQ2hELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==