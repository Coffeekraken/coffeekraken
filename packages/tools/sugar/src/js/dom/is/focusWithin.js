// @ts-nocheck
/**
 * @name      focusWithin
 * @namespace            js.dom.is
 * @type      Function
 * @stable
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function focusWithin($elm) {
    return $elm.parentElement.querySelector(':focus-within') === $elm;
}
export default focusWithin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXNXaXRoaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmb2N1c1dpdGhpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyxXQUFXLENBQUMsSUFBSTtJQUN2QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxLQUFLLElBQUksQ0FBQztBQUNwRSxDQUFDO0FBQ0QsZUFBZSxXQUFXLENBQUMifQ==