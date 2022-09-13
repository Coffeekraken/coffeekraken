// @ts-nocheck
import __isClass from 'is-class';
/**
 * @name                      class
 * @namespace            shared.is
 * @type                      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed variable (or array of variables) is/are plain variable(s)
 *
 * @param         {Mixed|Array}            variable                  The variable(s) to check
 * @return        {Boolean}                                         true if is class(es), false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import { __isClass } = from '@coffeekraken/sugar/is';
 * __isClass({ hello: 'world'}); // => false
 * const myCoolClass = class Coco{};
 * __isClass(myCoolClass); // => true
 *
 * @see       https://www.npmjs.com/package/is-class
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function isClass(cls) {
    if (!Array.isArray(cls))
        cls = [cls];
    for (let i = 0; i < cls.length; i++) {
        if (!__isClass(cls[i]))
            return false;
    }
    return true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFNBQVMsTUFBTSxVQUFVLENBQUM7QUFFakM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxPQUFPLENBQUMsR0FBRztJQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO0tBQ3hDO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9