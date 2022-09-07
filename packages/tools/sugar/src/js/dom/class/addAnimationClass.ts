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
 * @todo        tests
 *
 * @example    js
 * import { __addAnimationClass } from '@coffeekraken/sugar/dom';
 *  __addAnimationClass(myElm, 'my-cool-class').then($elm => {
 *    // do something at the animation end...
 * });
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __addAnimationClass(
    $elm: HTMLElement,
    cls: string | string[],
): Promise<HTMLElement> {
    // make sure the cls argument is an Array
    if (!Array.isArray(cls)) cls = [cls];
    // add the class to the element
    cls.forEach((_cls) => {
        $elm.classList.add(_cls);
    });
    // remove the class at the end of the animation
    return __removeClassesOnAnimationEnd($elm, cls);
}
