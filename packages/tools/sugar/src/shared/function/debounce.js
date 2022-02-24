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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVib3VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZWJvdW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQUNILG1CQUFtQjtBQUNuQixTQUFTLFFBQVEsQ0FBQyxFQUFFLEVBQUUsS0FBSztJQUN2QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDakIsT0FBTztRQUNILE1BQU0sT0FBTyxHQUFHLElBQUksRUFDaEIsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUNyQixZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEIsS0FBSyxHQUFHLFVBQVUsQ0FBQztZQUNmLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNkLENBQUMsQ0FBQztBQUNOLENBQUM7QUFDRCxrQkFBa0I7QUFDbEIsZUFBZSxRQUFRLENBQUMifQ==