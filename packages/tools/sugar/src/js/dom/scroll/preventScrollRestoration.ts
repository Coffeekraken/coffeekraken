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
