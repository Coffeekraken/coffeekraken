"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        debounce
 * @namespace            js.function
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This utils function allows you to make sure that a function that will normally be called
 * several times, for example during a scroll event, to be called only once after
 * the delay passed
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 		js
 * import debounce from '@coffeekraken/sugar/js/function/debounce';
 * const myDebouncedFn = debounce(() => {
 * 		// my function content that will be
 * 		// executed only once after the 1 second delay
 * }, 1000);
 *
 * document.addEventListener('scroll', (e) => {
 * 		// call my debounced function
 * 		myDebouncedFn();
 * });
 *
 * @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
/*eslint-disable */
function debounce(fn, delay) {
    let timer = null;
    return function () {
        const context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}
/*eslint-enable */
exports.default = debounce;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Qkc7QUFDSCxtQkFBbUI7QUFDbkIsU0FBUyxRQUFRLENBQUMsRUFBRSxFQUFFLEtBQUs7SUFDdkIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLE9BQU87UUFDSCxNQUFNLE9BQU8sR0FBRyxJQUFJLEVBQ2hCLElBQUksR0FBRyxTQUFTLENBQUM7UUFDckIsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BCLEtBQUssR0FBRyxVQUFVLENBQUM7WUFDZixFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDZCxDQUFDLENBQUM7QUFDTixDQUFDO0FBQ0Qsa0JBQWtCO0FBQ2xCLGtCQUFlLFFBQVEsQ0FBQyJ9