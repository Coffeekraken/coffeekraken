// @ts-nocheck

import __getTransitionProperties from '../style/getTransitionProperties';

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
 * @feature       Callback support
 *
 * @param 		{HTMLElement} 				elm 		The element to monitor
 * @param 		{Function} 					[cb=null] 	An optional callback to call when the element transition has ended
 * @return 		(Promise<HTMLElement>) 								The promise that will be resolved when the element transition has ended
 *
 * @todo      tests
 *
 * @example 	js
 * import { __whenTransitionEnd } from '@coffeekraken/sugar/dom'
 * await __whenTransitionEnd(myCoolHTMLElement);
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __whenTransitionEnd(
    elm: HTMLElement,
    cb: Function = null,
): Promise<HTMLElement> {
    return new Promise((resolve, reject) => {
        const transition = __getTransitionProperties(elm);
        setTimeout(() => {
            resolve($elm);
            cb && cb($elm);
        }, transition.totalDuration);
    });
}
