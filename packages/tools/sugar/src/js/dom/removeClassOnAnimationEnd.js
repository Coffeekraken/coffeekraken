// @ts-nocheck
import __addEventListenerOnce from './addEventListenerOnce';
import __SPromise from '@coffeekraken/s-promise';
/**
 * @name      removeClassOnAnimationEnd
 * @namespace            js.dom
 * @type      Function
 * @stable
 *
 * Remove some class on animation end
 *
 * @param    {HTMLElement}    elm    The element to take care of
 * @param    {String|Array}    class    The class or classes (Array) to remove
 * @return   {Promise}                  A promise that will be resolved once the class has been removed and the animation finished
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import removeClassOnAnimationEnd from '@coffeekraken/sugar/js/dom/removeClassOnAnimationEnd'
 * removeClassOnAnimationEnd(myCoolElm, 'my-class');
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function removeClassOnAnimationEnd($elm, cls) {
    return new __SPromise(({ resolve }) => {
        // listen for animation end on the element just once
        __addEventListenerOnce($elm, 'animationend', (e) => {
            if (!Array.isArray(cls))
                cls = [cls];
            // remove the cls
            cls.forEach((_cls) => {
                $elm.classList.remove(_cls);
            });
            // resolve the process
            resolve(e);
        });
    }, {
        id: 'removeClassOnAnimationEnd'
    });
}
export default removeClassOnAnimationEnd;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlQ2xhc3NPbkFuaW1hdGlvbkVuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlbW92ZUNsYXNzT25BbmltYXRpb25FbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sc0JBQXNCLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUFTLHlCQUF5QixDQUFDLElBQUksRUFBRSxHQUFHO0lBQzFDLE9BQU8sSUFBSSxVQUFVLENBQ25CLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1FBQ2Qsb0RBQW9EO1FBQ3BELHNCQUFzQixDQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNqRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckMsaUJBQWlCO1lBQ2pCLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7WUFDSCxzQkFBc0I7WUFDdEIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLEVBQ0Q7UUFDRSxFQUFFLEVBQUUsMkJBQTJCO0tBQ2hDLENBQ0YsQ0FBQztBQUNKLENBQUM7QUFDRCxlQUFlLHlCQUF5QixDQUFDIn0=