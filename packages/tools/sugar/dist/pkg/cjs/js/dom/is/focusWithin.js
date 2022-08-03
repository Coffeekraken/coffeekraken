"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      focusWithin
 * @namespace            js.dom.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Check if the mouse is focusWithin the passed HTMLElement
 *
 * @param    {HTMLElement}    $elm    The HTMLElement to check
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import isFocusWithin from '@coffeekraken/sugar/js/dom/is/focusWithin'
 * const $myElm = document.querySelector('.my-elm')
 * if (isFocusWithin($myElm)) {
 *   // do something
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function focusWithin($elm) {
    return $elm.parentElement.querySelector(':focus-within') === $elm;
}
exports.default = focusWithin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLFdBQVcsQ0FBQyxJQUFpQjtJQUNsQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxLQUFLLElBQUksQ0FBQztBQUN0RSxDQUFDO0FBQ0Qsa0JBQWUsV0FBVyxDQUFDIn0=