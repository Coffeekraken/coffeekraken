// @ts-nocheck

import { __addEventListenerOnce } from '@coffeekraken/sugar/dom';

/**
 * @name      whenAnimationEnd
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
 * @status      stable
 * @async
 *
 * Detect when animation ends
 *
 * @param    {HTMLElement}    elm    The element to listen on
 * @return   {Promise<HTMLElement>}                  A promise that will be resolved once the animation has ended
 *
 * @snippet         __whenAnimationEnd($1)
 * __whenAnimationEnd($1).then(\$elm => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example    js
 * import { __whenAnimationEnd } from '@coffeekraken/sugar/dom'
 * __whenAnimationEnd(myCoolElm).then(($elm) => {
 *      // do something...
 * });
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __whenAnimationEnd(
    $elm: HTMLElement,
): Promise<HTMLElement> {
    return new Promise((resolve) => {
        __addEventListenerOnce($elm, 'animationend', (e) => {
            resolve($elm);
        });
    });
}
