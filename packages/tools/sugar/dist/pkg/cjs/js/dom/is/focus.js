"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      focus
 * @namespace            js.dom.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Check if the mouse is focus the passed HTMLElement
 *
 * @param    {HTMLElement}    $elm    The HTMLElement to check
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import isFocus from '@coffeekraken/sugar/js/dom/is/focus'
 * const $myElm = document.querySelector('.my-elm')
 * if (isFocus($myElm)) {
 *   // do something
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function focus($elm) {
    return $elm.parentElement.querySelector(':focus') === $elm;
}
exports.default = focus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLEtBQUssQ0FBQyxJQUFpQjtJQUM1QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksQ0FBQztBQUMvRCxDQUFDO0FBQ0Qsa0JBQWUsS0FBSyxDQUFDIn0=