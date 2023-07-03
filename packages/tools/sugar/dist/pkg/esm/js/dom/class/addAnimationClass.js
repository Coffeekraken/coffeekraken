// @ts-nocheck
import __removeClassesOnAnimationEnd from './removeClassOnAnimationEnd';
/**
 * @name        addAnimationClass
 * @namespace            js.dom.class
 * @type      Function
 * @platform          js
 * @status        stable
 *
 * Add a class that trigger an animation and remove it at the end
 *
 * @param    {HTMLElement}    $elm    The element to take care of
 * @param    {String|Array}    cls    The class or classes (Array) to apply
 * @return    {Promise<HTMLElement>}               A promise that will be resolved once the class have been removed and the animation finished
 *
 * @snippet         __addAnimationClass($1, $2)
 *
 * @todo        tests
 *
 * @example    js
 * import { __addAnimationClass } from '@coffeekraken/sugar/dom';
 *  __addAnimationClass(myElm, 'my-cool-class').then($elm => {
 *    // do something at the animation end...
 * });
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __addAnimationClass($elm, cls) {
    // make sure the cls argument is an Array
    if (!Array.isArray(cls))
        cls = [cls];
    // add the class to the element
    cls.forEach((_cls) => {
        $elm.classList.add(_cls);
    });
    // remove the class at the end of the animation
    return __removeClassesOnAnimationEnd($elm, cls);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLDZCQUE2QixNQUFNLDZCQUE2QixDQUFDO0FBQ3hFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxtQkFBbUIsQ0FDdkMsSUFBaUIsRUFDakIsR0FBc0I7SUFFdEIseUNBQXlDO0lBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLCtCQUErQjtJQUMvQixHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDSCwrQ0FBK0M7SUFDL0MsT0FBTyw2QkFBNkIsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDcEQsQ0FBQyJ9