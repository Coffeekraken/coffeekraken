// @ts-nocheck

/**
 * @name      wrap
 * @namespace            js.dom.manipulate
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * Wrap an HTMLElement inside another `$wrapper` one
 *
 * @param    {HTMLElement}    $toWrap    The element to wrap
 * @param    {HTMLElement}    $wrapper    The wrapper element
 * @return    {HTMLElement}           The toWrap element
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __wrap } from '@coffeekraken/sugar/dom'
 * const $wrapper = document.createElement('div')
 * // assuming:
 * // <div>
 * //   <span class="wrap">Hello World</span>
 * // </div>
 * __wrap(document.querySelector('.wrap'), $wrapper)
 * // output:
 * // <div>
 * //   <div>
 * //     <span class="wrap">Hello World</span>
 * //   </div>
 * // </div>
 *
 @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __wrap(
    $elm: HTMLElement,
    $wrapper: HTMLElement,
): HTMLElement {
    if (typeof $wrapper === 'string') {
        $wrapper = document.createElement($wrapper);
    }
    const $parent = $elm.parentNode;
    const $sibling = $elm.nextSibling;
    if ($sibling) {
        $parent.insertBefore($wrapper, $sibling);
    } else {
        $parent.appendChild($wrapper);
    }
    return $wrapper.appendChild($elm);
}
