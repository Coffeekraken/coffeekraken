"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
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
 * @snippet         __throttle($1, $2)
 * __throttle($1, () => {
 *      $2
 * })
 *
 * @example 		js
 * import { __throttle } from '@coffeekraken/sugar/function';
 * const myThrottledFn = __throttle(1000, () => {
 * 		// my function content that will be
 * 		// executed only once each second
 * });
 *
 * document.addEventListener('scroll', (e) => {
 * 		// call my throttled function
 * 		myThrottledFn();
 * });
 *
 * @since         2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __throttle(threshhold, fn) {
    threshhold || (threshhold = 250);
    let last;
    return function () {
        const context = this;
        const now = new Date(), args = arguments;
        if (!last || last <= now - threshhold) {
            last = now;
            fn.apply(context, args);
        }
    };
}
exports.default = __throttle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0NHO0FBQ0gsU0FBd0IsVUFBVSxDQUFDLFVBQVUsRUFBRSxFQUFFO0lBQzdDLFVBQVUsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNqQyxJQUFJLElBQUksQ0FBQztJQUNULE9BQU87UUFDSCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDckIsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsRUFDbEIsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxHQUFHLEdBQUcsVUFBVSxFQUFFO1lBQ25DLElBQUksR0FBRyxHQUFHLENBQUM7WUFDWCxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMzQjtJQUNMLENBQUMsQ0FBQztBQUNOLENBQUM7QUFaRCw2QkFZQyJ9