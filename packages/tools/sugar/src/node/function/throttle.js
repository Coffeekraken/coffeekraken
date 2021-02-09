"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
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
/*eslint-enable */
exports.default = throttle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyb3R0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aHJvdHRsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7O0FBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILG1CQUFtQjtBQUNuQixTQUFTLFFBQVEsQ0FBQyxFQUFFLEVBQUUsVUFBVTtJQUM5QixVQUFVLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDakMsSUFBSSxJQUFJLENBQUM7SUFDVCxPQUFPO1FBQ0wsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLEVBQ3BCLElBQUksR0FBRyxTQUFTLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksR0FBRyxHQUFHLFVBQVUsRUFBRTtZQUNyQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1lBQ1gsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDekI7SUFDSCxDQUFDLENBQUM7QUFDSixDQUFDO0FBQ0Qsa0JBQWtCO0FBQ2xCLGtCQUFlLFFBQVEsQ0FBQyJ9