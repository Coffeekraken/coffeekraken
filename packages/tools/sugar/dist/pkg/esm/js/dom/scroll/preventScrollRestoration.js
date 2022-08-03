/**
 * @name      preventScrollRestoration
 * @namespace            js.dom.scroll
 * @type      Function
 * @platform          js
 * @status          stable
 *
 * Function that set the `history.scrollRestoration` property to `manual`
 *
 * @example 	js
 * import __preventScrolLRestoration from '@coffeekraken/sugar/js/dom/scroll/preventScrollRestoration'
 * __preventScrollRestoration();
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function () {
    if ('scrollRestoration' in history) {
        // Back off, browser, I got this...
        history.scrollRestoration = 'manual';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILE1BQU0sQ0FBQyxPQUFPO0lBQ1YsSUFBSSxtQkFBbUIsSUFBSSxPQUFPLEVBQUU7UUFDbEMsbUNBQW1DO1FBQ25DLE9BQU8sQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUM7S0FDdEM7QUFDTCxDQUFDIn0=