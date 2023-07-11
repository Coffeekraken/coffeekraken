// @ts-nocheck

import __getTransitionProperties from '../style/getTransitionProperties.js';

/**
 * @name      whenTransitionEnd
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
 * @status        stable
 * @async
 *
 * Monitor an HTMLElement to be notified when his transition has ended
 *
 * @feature       Promise based API
 *
 * @param 		{HTMLElement} 				elm 		The element to monitor
 * @return 		(Promise<HTMLElement>) 								The promise that will be resolved when the element transition has ended
 *
 * @snippet         __whenTransitionEnd($1)
 * __whenTransitionEnd($1).then(\$elm => {
 *      $2
 * });
 *
 * @todo      tests
 *
 * @example 	js
 * import { __whenTransitionEnd } from '@coffeekraken/sugar/dom'
 * await __whenTransitionEnd(myCoolHTMLElement);
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __whenTransitionEnd(
    elm: HTMLElement,
): Promise<HTMLElement> {
    return new Promise((resolve) => {
        const transition = __getTransitionProperties(elm);
        setTimeout(() => {
            resolve($elm);
        }, transition.totalDuration);
    });
}
