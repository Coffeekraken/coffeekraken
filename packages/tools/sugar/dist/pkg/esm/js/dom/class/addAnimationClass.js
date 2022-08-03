// @ts-nocheck
import __removeClassesOnAnimationEnd from './removeClassOnAnimationEnd';
/**
 * @name        addAnimationClass
 * @namespace            js.dom.class
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Add a class that trigger an animation and remove it at the end
 *
 * @param    {HTMLElement}    $elm    The element to take care of
 * @param    {String|Array}    cls    The class or classes (Array) to apply
 * @return    {Promise}               A promise that will be resolved once the class have been removed and the animation finished
 *
 * @todo        interface
 * @todo        doc
 * @todo        tests
 *
 * @example    js
 * import addAnimationClass from '@coffeekraken/sugar/js/dom/addAnimationClass'
 * addAnimationClass(myElm, 'my-cool-class').then($elm => {
 *    // do something at the animation end...
 * });
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function addAnimationClass($elm, cls) {
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
export default addAnimationClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLDZCQUE2QixNQUFNLDZCQUE2QixDQUFDO0FBQ3hFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBUyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsR0FBRztJQUNoQyx5Q0FBeUM7SUFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckMsK0JBQStCO0lBQy9CLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUMsQ0FBQztJQUNILCtDQUErQztJQUMvQyxPQUFPLDZCQUE2QixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNwRCxDQUFDO0FBQ0QsZUFBZSxpQkFBaUIsQ0FBQyJ9