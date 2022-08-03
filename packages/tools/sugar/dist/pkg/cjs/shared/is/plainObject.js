"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                      plainObject
 * @namespace            shared.is
 * @type                      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed object (or array of objects) is/are plain object(s)
 *
 * @param         {Object|Array}            object                  The object(s) to check
 * @return        {Boolean}                                         true if is plain object(s), false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
 * isPlainObject({ hello: 'world'}); // => true
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function plainObject(object) {
    if (!object)
        return false;
    if (typeof object !== 'object')
        return false;
    if (object.constructor && object.constructor.name !== 'Object')
        return false;
    if (Object.prototype.toString.call(object) !== '[object Object]')
        return false;
    if (object !== Object(object))
        return false;
    // if (object.constructor !== Object) return false;
    return true;
}
exports.default = plainObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQXdCLFdBQVcsQ0FBQyxNQUFNO0lBQ3RDLElBQUksQ0FBQyxNQUFNO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDMUIsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDN0MsSUFBSSxNQUFNLENBQUMsV0FBVyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFFBQVE7UUFDMUQsT0FBTyxLQUFLLENBQUM7SUFDakIsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssaUJBQWlCO1FBQzVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLElBQUksTUFBTSxLQUFLLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUM1QyxtREFBbUQ7SUFDbkQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQVZELDhCQVVDIn0=