// @ts-nocheck

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
 @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isFocus($elm: HTMLElement): boolean {
    return $elm.parentElement.querySelector(':focus') === $elm;
}
