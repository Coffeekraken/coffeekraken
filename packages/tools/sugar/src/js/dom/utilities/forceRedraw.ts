// @ts-nocheck

import __getStyleProperty from '../style/getStyleProperty';

/**
 * @name      forceRedraw
 * @namespace            js.dom.utils
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Force the element to be painted again in case of visual issues
 *
 * @param    {HTMLElement}    $elm    The HTMLElement to force the redraw on
 * @return    {HTMLElement}    The HTMLElement to maintain chainability
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __forceRedraw()
 *
 * @example    js
 * import { __forceRedraw } from '@coffeekraken/sugar/dom'
 * __forceRedraw($elm)
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __forceRedraw($elm: HTMLElement): HTMLElement {
    const display = __getStyleProperty($elm, 'display');
    $elm.style.display = 'none';
    $elm.offsetHeight;
    $elm.style.display = display;
    return $elm;
}
