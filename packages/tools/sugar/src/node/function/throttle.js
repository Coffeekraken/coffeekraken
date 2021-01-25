"use strict";
// @ts-nocheck
// @shared
/**
 * @name        throttle
 * @namespace           sugar.js.function
 * @type      Function
 * @stable
 *
 * This utils function allows you to make sure that a function that will normally be called
 * several times, for example during a scroll event, to be called once each threshhold time
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 		js
 * import throttle from '@coffeekraken/sugar/js/function/throttle';
 * const myThrottledFn = throttle(() => {
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
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
/*eslint-disable */
function throttle(fn, threshhold) {
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
module.exports = throttle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyb3R0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aHJvdHRsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7QUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsbUJBQW1CO0FBQ25CLFNBQVMsUUFBUSxDQUFDLEVBQUUsRUFBRSxVQUFVO0lBQzlCLFVBQVUsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNqQyxJQUFJLElBQUksQ0FBQztJQUNULE9BQU87UUFDTCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDckIsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsRUFDcEIsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxHQUFHLEdBQUcsVUFBVSxFQUFFO1lBQ3JDLElBQUksR0FBRyxHQUFHLENBQUM7WUFDWCxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN6QjtJQUNILENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxpQkFBUyxRQUFRLENBQUMifQ==