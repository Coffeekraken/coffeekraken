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
import __wait from '../../../shared/datetime/wait';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLE1BQU0sTUFBTSwrQkFBK0IsQ0FBQztBQUVuRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsaUJBQWlCLENBQ3JDLEdBQXNCLEVBQ3RCLElBQWlCLEVBQ2pCLFVBQWtCLElBQUk7SUFFdEIseUNBQXlDO0lBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLCtCQUErQjtJQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNqQyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9