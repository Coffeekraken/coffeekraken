// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import __addEventListenerOnce from '../event/addEventListenerOnce';

/**
 * @name      whenAnimationEnd
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
 * @status      beta
 * @async
 *
 * Detect when animation ends
 *
 * @param    {HTMLElement}    elm    The element to listen on
 * @return   {Promise}                  A promise that will be resolved once the animation has ended
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import whenAnimationEnd from '@coffeekraken/sugar/js/dom/whenAnimationEnd'
 * await whenAnimationEnd(myCoolElm);
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function whenAnimationEnd($elm, cls) {
    return new __SPromise(
        ({ resolve }) => {
            __addEventListenerOnce($elm, 'animationend', (e) => {
                resolve(e);
            });
        },
        {
            id: 'whenAnimationEnd',
        },
    );
}
