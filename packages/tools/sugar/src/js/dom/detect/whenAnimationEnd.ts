// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';

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
 * @return   {SPromise<HTMLElement>}                  A promise that will be resolved once the animation has ended
 *
 * @todo      tests
 *
 * @example    js
 * import { __whenAnimationEnd } from '@coffeekraken/sugar/dom'
 * await __whenAnimationEnd(myCoolElm);
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __whenAnimationEnd(
    $elm: HTMLElement,
): __SPromise<HTMLElement> {
    return new __SPromise(({ resolve }) => {
        __addEventListenerOnce($elm, 'animationend', (e) => {
            resolve($elm);
        });
    });
}
