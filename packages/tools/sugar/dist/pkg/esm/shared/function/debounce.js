// @ts-nocheck
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
export default debounce;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBQ0gsbUJBQW1CO0FBQ25CLFNBQVMsUUFBUSxDQUFDLEVBQUUsRUFBRSxLQUFLO0lBQ3ZCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztJQUNqQixPQUFPO1FBQ0gsTUFBTSxPQUFPLEdBQUcsSUFBSSxFQUNoQixJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ3JCLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQixLQUFLLEdBQUcsVUFBVSxDQUFDO1lBQ2YsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2QsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUNELGtCQUFrQjtBQUNsQixlQUFlLFFBQVEsQ0FBQyJ9