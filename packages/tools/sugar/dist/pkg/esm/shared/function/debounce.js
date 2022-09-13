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
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 		js
 * import { __debounce } from '@coffeekraken/sugar/function';
 * const myDebouncedFn = __debounce(() => {
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
export default function __debounce(fn, delay) {
    let timer = null;
    return function () {
        const context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxVQUFVLENBQUMsRUFBRSxFQUFFLEtBQUs7SUFDeEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLE9BQU87UUFDSCxNQUFNLE9BQU8sR0FBRyxJQUFJLEVBQ2hCLElBQUksR0FBRyxTQUFTLENBQUM7UUFDckIsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BCLEtBQUssR0FBRyxVQUFVLENBQUM7WUFDZixFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDZCxDQUFDLENBQUM7QUFDTixDQUFDIn0=