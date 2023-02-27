// @ts-nocheck

/**
 * @name        debounce
 * @namespace            shared.function
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This utils function allows you to make sure that a function that will normally be called
 * several times, for example during a scroll event, to be called only once after
 * the delay passed
 *
 * @param       {Number}        delay          A delay in ms to wait between two function calls
 * @param       {Function}      fn              The function to debounce
 * 
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __debounce($1, $2)
 * __debounce($1, () => {
 *      $2
 * })
 * 
 * @example 		js
 * import { __debounce } from '@coffeekraken/sugar/function';
 * const myDebouncedFn = __debounce(1000, () => {
 * 		// my function content that will be
 * 		// executed only once after the 1 second delay
 * });
 *
 * document.addEventListener('scroll', (e) => {
 * 		// call my debounced function
 * 		myDebouncedFn();
 * });
 *
 * @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __debounce(delay, fn) {
    let timer = null;
    return function () {
        const context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}
