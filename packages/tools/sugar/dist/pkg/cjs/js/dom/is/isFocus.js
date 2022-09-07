"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      isFocus
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
 * import { __isFocus } from '@coffeekraken/sugar/dom'
 * const $myElm = document.querySelector('.my-elm')
 * if (__isFocus($myElm)) {
 *   // do something
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isFocus($elm) {
    return $elm.parentElement.querySelector(':focus') === $elm;
}
exports.default = __isFocus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUF3QixTQUFTLENBQUMsSUFBaUI7SUFDL0MsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUM7QUFDL0QsQ0FBQztBQUZELDRCQUVDIn0=