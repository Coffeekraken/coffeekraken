"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
 * import { __preventScrolLRestoration } from '@coffeekraken/sugar/dom'
 * __preventScrollRestoration();
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1() {
    if ('scrollRestoration' in history) {
        // Back off, browser, I got this...
        history.scrollRestoration = 'manual';
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0g7SUFDSSxJQUFJLG1CQUFtQixJQUFJLE9BQU8sRUFBRTtRQUNoQyxtQ0FBbUM7UUFDbkMsT0FBTyxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztLQUN4QztBQUNMLENBQUM7QUFMRCw0QkFLQyJ9