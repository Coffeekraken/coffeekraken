// @ts-nocheck
import __addEventListenerOnce from './addEventListenerOnce';
import __SPromise from '@coffeekraken/s-promise';
/**
 * @name      removeClassOnAnimationEnd
 * @namespace            js.dom.class
 * @type      Function
 * @platform          js
 * @status      beta
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
        id: 'removeClassOnAnimationEnd',
    });
}
export default removeClassOnAnimationEnd;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLHNCQUFzQixNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMseUJBQXlCLENBQUMsSUFBSSxFQUFFLEdBQUc7SUFDeEMsT0FBTyxJQUFJLFVBQVUsQ0FDakIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7UUFDWixvREFBb0Q7UUFDcEQsc0JBQXNCLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQy9DLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztnQkFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQyxpQkFBaUI7WUFDakIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztZQUNILHNCQUFzQjtZQUN0QixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsRUFDRDtRQUNJLEVBQUUsRUFBRSwyQkFBMkI7S0FDbEMsQ0FDSixDQUFDO0FBQ04sQ0FBQztBQUNELGVBQWUseUJBQXlCLENBQUMifQ==