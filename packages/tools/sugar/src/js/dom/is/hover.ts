// @ts-nocheck

/**
 * @name      hover
 * @namespace            js.dom.is
 * @type      Function
 * @platform          js
 * @platform          ts
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function hover($elm: HTMLElement): boolean {
  return $elm.parentElement.querySelector(':hover') === $elm;
}
export default hover;
