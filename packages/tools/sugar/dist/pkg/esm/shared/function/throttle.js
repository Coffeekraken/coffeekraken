// @ts-nocheck
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
export default throttle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxtQkFBbUI7QUFDbkIsU0FBUyxRQUFRLENBQUMsRUFBRSxFQUFFLFVBQVU7SUFDNUIsVUFBVSxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLElBQUksSUFBSSxDQUFDO0lBQ1QsT0FBTztRQUNILE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQztRQUNyQixNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxFQUNsQixJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLEdBQUcsR0FBRyxVQUFVLEVBQUU7WUFDbkMsSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUNYLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzNCO0lBQ0wsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUNELGtCQUFrQjtBQUNsQixlQUFlLFFBQVEsQ0FBQyJ9