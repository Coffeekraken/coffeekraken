// @ts-nocheck
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
export default focusWithin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxXQUFXLENBQUMsSUFBaUI7SUFDbEMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsS0FBSyxJQUFJLENBQUM7QUFDdEUsQ0FBQztBQUNELGVBQWUsV0FBVyxDQUFDIn0=