// @ts-nocheck

/**
 * @name      isFocusWithin
 * @namespace            js.dom.is
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Check if the mouse is isFocusWithin the passed HTMLElement
 *
 * @param    {HTMLElement}    $elm    The HTMLElement to check
 *
 * @snippet         __isFocusWithin($1)
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __isFocusWithin } from '@coffeekraken/sugar/dom'
 * const $myElm = document.querySelector('.my-elm')
 * if (__isFocusWithin($myElm)) {
 *   // do something
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isFocusWithin($elm: HTMLElement): boolean {
    return $elm.parentElement.querySelector(':focus-within') === $elm;
}
