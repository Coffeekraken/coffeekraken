// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __whenAnimationEnd from '../detect/whenAnimationEnd';
/**
 * @name      removeClassOnAnimationEnd
 * @namespace            js.dom.class
 * @type      Function
 * @platform          js
 * @status      stable
 *
 * Remove some class on animation end
 *
 * @param    {HTMLElement}    $elm    The element to take care of
 * @param    {String|String[]}    cls    The class or classes (Array) to remove
 * @return   {Promise<HTMLElement>}                  A promise that will be resolved once the class has been removed and the animation finished
 *
 * @snippet         __removeClassOnAnimationEnd($1, $2)
 *
 * @todo      tests
 *
 * @example    js
 * import { __removeClassOnAnimationEnd } from '@coffeekraken/sugar/dom';
 *  __removeClassOnAnimationEnd(myCoolElm, 'my-class');
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __removeClassOnAnimationEnd($elm, cls) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        // wait end of animation
        yield __whenAnimationEnd($elm);
        // remove class
        if (!Array.isArray(cls))
            cls = [cls];
        // remove the cls
        cls.forEach((_cls) => {
            $elm.classList.remove(_cls);
        });
        // resolve the process
        resolve($elm);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGtCQUFrQixNQUFNLDRCQUE0QixDQUFDO0FBRTVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsMkJBQTJCLENBQy9DLElBQWlCLEVBQ2pCLEdBQXNCO0lBRXRCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNqQyx3QkFBd0I7UUFDeEIsTUFBTSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixlQUFlO1FBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsaUJBQWlCO1FBQ2pCLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNILHNCQUFzQjtRQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==