// @ts-nocheck

/**
 * @name        throttle
 * @namespace            shared.function
 * @type      Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * This utils function allows you to make sure that a function that will normally be called
 * several times, for example during a scroll event, to be called once each threshhold time
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 		js
 * import { __throttle } from '@coffeekraken/sugar/function';
 * const myThrottledFn = __throttle(() => {
 * 		// my function content that will be
 * 		// executed only once each second
 * }, 1000);
 *
 * document.addEventListener('scroll', (e) => {
 * 		// call my throttled function
 * 		myThrottledFn();
 * });
 *
 * @since         2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __throttle(fn, threshhold) {
    threshhold || (threshhold = 250);
    let last;
    return function () {
        const context = this;
        const now = new Date(),
            args = arguments;
        if (!last || last <= now - threshhold) {
            last = now;
            fn.apply(context, args);
        }
    };
}
