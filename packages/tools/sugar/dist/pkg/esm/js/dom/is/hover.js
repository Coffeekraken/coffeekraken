// @ts-nocheck
/**
 * @name      hover
 * @namespace            js.dom.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Check if the mouse is hover the passed HTMLElement
 *
 * @param    {HTMLElement}    $elm    The HTMLElement to check
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import hover from '@coffeekraken/sugar/js/dom/is/hover'
 * const $myElm = document.querySelector('.my-elm')
 * if (hover($myElm)) {
 *   // do something
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function hover($elm) {
    return $elm.parentElement.querySelector(':hover') === $elm;
}
export default hover;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxLQUFLLENBQUMsSUFBaUI7SUFDNUIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUM7QUFDL0QsQ0FBQztBQUNELGVBQWUsS0FBSyxDQUFDIn0=