// @ts-nocheck
import __wait from '../../../shared/datetime/wait.js';

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
export default function __addClassTimeout(
    cls: string | string[],
    $elm: HTMLElement,
    timeout: number = 1000,
): Promise<HTMLElement> {
    // make sure the cls argument is an Array
    if (!Array.isArray(cls)) cls = [cls];
    // add the class to the element
    $elm.classList.add(...cls);
    return new Promise(async (resolve) => {
        await __wait(timeout);
        $elm.classList.remove(...cls);
        resolve($elm);
    });
}
