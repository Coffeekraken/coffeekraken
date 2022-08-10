// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import __whenAnimationEnd from '../detect/whenAnimationEnd';

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
    return new __SPromise(
        async ({ resolve }) => {
            // wait end of animation
            await __whenAnimationEnd($elm);
            // remove class
            if (!Array.isArray(cls)) cls = [cls];
            // remove the cls
            cls.forEach((_cls) => {
                $elm.classList.remove(_cls);
            });
            // resolve the process
            resolve(e);
        },
        {
            id: 'removeClassOnAnimationEnd',
        },
    );
}
export default removeClassOnAnimationEnd;
