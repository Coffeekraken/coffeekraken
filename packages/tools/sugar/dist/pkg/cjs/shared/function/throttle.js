"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        throttle
 * @namespace            js.function
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
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUNILG1CQUFtQjtBQUNuQixTQUFTLFFBQVEsQ0FBQyxFQUFFLEVBQUUsVUFBVTtJQUM1QixVQUFVLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDakMsSUFBSSxJQUFJLENBQUM7SUFDVCxPQUFPO1FBQ0gsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLEVBQ2xCLElBQUksR0FBRyxTQUFTLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksR0FBRyxHQUFHLFVBQVUsRUFBRTtZQUNuQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1lBQ1gsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDM0I7SUFDTCxDQUFDLENBQUM7QUFDTixDQUFDO0FBQ0Qsa0JBQWtCO0FBQ2xCLGtCQUFlLFFBQVEsQ0FBQyJ9