"use strict";
// @ts-nocheck
// @shared
/**
 * @name        debounce
 * @namespace           sugar.js.function
 * @type      Function
 * @stable
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
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
module.exports = debounce;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVib3VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZWJvdW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7QUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILG1CQUFtQjtBQUNuQixTQUFTLFFBQVEsQ0FBQyxFQUFFLEVBQUUsS0FBSztJQUN6QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDakIsT0FBTztRQUNMLE1BQU0sT0FBTyxHQUFHLElBQUksRUFDbEIsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUNuQixZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEIsS0FBSyxHQUFHLFVBQVUsQ0FBQztZQUNqQixFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDWixDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsaUJBQVMsUUFBUSxDQUFDIn0=