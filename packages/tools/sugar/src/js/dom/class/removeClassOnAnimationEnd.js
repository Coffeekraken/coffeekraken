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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlQ2xhc3NPbkFuaW1hdGlvbkVuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlbW92ZUNsYXNzT25BbmltYXRpb25FbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sc0JBQXNCLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyx5QkFBeUIsQ0FBQyxJQUFJLEVBQUUsR0FBRztJQUN4QyxPQUFPLElBQUksVUFBVSxDQUNqQixDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtRQUNaLG9EQUFvRDtRQUNwRCxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JDLGlCQUFpQjtZQUNqQixHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsc0JBQXNCO1lBQ3RCLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxFQUNEO1FBQ0ksRUFBRSxFQUFFLDJCQUEyQjtLQUNsQyxDQUNKLENBQUM7QUFDTixDQUFDO0FBQ0QsZUFBZSx5QkFBeUIsQ0FBQyJ9