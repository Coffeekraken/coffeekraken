"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function __isClassInstance(object) {
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
exports.default = __isClassInstance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxTQUF3QixpQkFBaUIsQ0FBQyxNQUFNO0lBQzVDLElBQUksQ0FBQyxNQUFNO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDMUIsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDN0MsSUFBSSxNQUFNLENBQUMsV0FBVyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFFBQVE7UUFDMUQsT0FBTyxLQUFLLENBQUM7SUFDakIsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssaUJBQWlCO1FBQzVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLElBQUksTUFBTSxDQUFDLFdBQVcsS0FBSyxNQUFNO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDaEQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQVRELG9DQVNDIn0=