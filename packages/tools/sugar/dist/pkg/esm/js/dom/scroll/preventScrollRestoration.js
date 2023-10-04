/**
 * @name      preventScrollRestoration
 * @namespace            js.dom.scroll
 * @type      Function
 * @platform          js
 * @status          stable
 *
 * Function that set the `history.scrollRestoration` property to `manual`
 *
 * @snippet         __preventScrollRestoration()
 *
 * @example 	js
 * import { __preventScrolLRestoration } from '@coffeekraken/sugar/dom'
 * __preventScrollRestoration();
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function preventScrollRestoration() {
    if ('scrollRestoration' in history) {
        // Back off, browser, I got this...
        history.scrollRestoration = 'manual';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsd0JBQXdCO0lBQzVDLElBQUksbUJBQW1CLElBQUksT0FBTyxFQUFFO1FBQ2hDLG1DQUFtQztRQUNuQyxPQUFPLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO0tBQ3hDO0FBQ0wsQ0FBQyJ9