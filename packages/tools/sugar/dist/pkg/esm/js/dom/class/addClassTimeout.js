var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-nocheck
import { __wait } from '@coffeekraken/sugar/datetime';
/**
 * @name        addClassTimeout
 * @namespace            js.dom.class
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * This function add the passed class on the passed element for a certain amount of passed time.
 *
 * @param    {String}         cls       The class to add
 * @param    {HTMLElement}    $elm    The element to add the class on
 * @param    {Number}           [timeout=1000]      How many ms the class has to stay on the element
 * @return      {Promise}                   A promise resolved when the timeout has ended
 *
 * @snippet         __addClassTimeout($1, $2, $3)
 *
 * @todo        tests
 *
 * @example    js
 * import { __addClassTimeout } from '@coffeekraken/sugar/dom';
 *  __addClassTimeout('success', $myElm, 2000).then($elm => {
 * });
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __addClassTimeout(cls, $elm, timeout = 1000) {
    // make sure the cls argument is an Array
    if (!Array.isArray(cls))
        cls = [cls];
    // add the class to the element
    $elm.classList.add(...cls);
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        yield __wait(timeout);
        $elm.classList.remove(...cls);
        resolve($elm);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGlCQUFpQixDQUNyQyxHQUFzQixFQUN0QixJQUFpQixFQUNqQixVQUFrQixJQUFJO0lBRXRCLHlDQUF5QztJQUN6QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQywrQkFBK0I7SUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUMzQixPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7UUFDakMsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUM5QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==