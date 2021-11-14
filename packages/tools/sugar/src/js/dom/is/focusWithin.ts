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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function focusWithin($elm: HTMLElement): boolean {
    return $elm.parentElement.querySelector(':focus-within') === $elm;
}
export default focusWithin;
