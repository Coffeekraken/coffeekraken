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
/*eslint-enable */
export default throttle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyb3R0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aHJvdHRsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTtBQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxtQkFBbUI7QUFDbkIsU0FBUyxRQUFRLENBQUMsRUFBRSxFQUFFLFVBQVU7SUFDOUIsVUFBVSxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLElBQUksSUFBSSxDQUFDO0lBQ1QsT0FBTztRQUNMLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQztRQUNyQixNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxFQUNwQixJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLEdBQUcsR0FBRyxVQUFVLEVBQUU7WUFDckMsSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUNYLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUNELGtCQUFrQjtBQUNsQixlQUFlLFFBQVEsQ0FBQyJ9