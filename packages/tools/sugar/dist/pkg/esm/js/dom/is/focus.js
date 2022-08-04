// @ts-nocheck
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
export default focus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxLQUFLLENBQUMsSUFBaUI7SUFDNUIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUM7QUFDL0QsQ0FBQztBQUNELGVBQWUsS0FBSyxDQUFDIn0=