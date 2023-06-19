// @ts-nocheck

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
export default function __removeClassOnAnimationEnd(
    $elm: HTMLElement,
    cls: string | string[],
): Promise<HTMLElement> {
    return new Promise(async (resolve) => {
        // wait end of animation
        await __whenAnimationEnd($elm);
        // remove class
        if (!Array.isArray(cls)) cls = [cls];
        // remove the cls
        cls.forEach((_cls) => {
            $elm.classList.remove(_cls);
        });
        // resolve the process
        resolve($elm);
    });
}
