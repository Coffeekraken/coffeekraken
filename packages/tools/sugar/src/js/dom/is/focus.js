// @ts-nocheck
/**
 * @name      focus
 * @namespace            js.dom.is
 * @type      Function
 * @stable
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function focus($elm) {
    return $elm.parentElement.querySelector(':focus') === $elm;
}
export default focus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmb2N1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyxLQUFLLENBQUMsSUFBSTtJQUNqQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksQ0FBQztBQUM3RCxDQUFDO0FBQ0QsZUFBZSxLQUFLLENBQUMifQ==