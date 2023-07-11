// @ts-nocheck

import __camelize from '../../../shared/string/camelize.js';
import __parse from '../../../shared/string/parse.js';

/**
 * @name      getStyleProperty
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @status      beta
 *
 * Get a style property on the passed element through the computed style.
 * This function try to store the actual style to not trigger more that 1 redraw
 * each js execution loop.
 *
 * @param 		{HTMLElement} 					elm  		The element to get style from
 * @param 		{String} 						property 	The css property to get
 * @return 		{Mixed} 									The style value
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __getStyleProperty($1, $2)
 *
 * @example  	js
 * import { __getStyleProperty } from '@coffeekraken/sugar/dom'
 * const opacity = __getStyleProperty(myCoolHTMLElement, 'opacity');
 *
 * @see 		https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __getStyleProperty(
    elm: HTMLElement,
    property: string,
): any {
    if (!elm) return;
    const computed = elm._sComputedStyle || window.getComputedStyle(elm);
    const prefixes = ['', 'webkit-', 'moz-', 'ms-', 'o-', 'khtml-'];
    for (let i = 0; i < prefixes.length; i++) {
        const prefix = prefixes[i];
        const value = computed[__camelize(`${prefix}${property}`)];
        if (value && value.trim() !== '') return __parse(value);
    }
    return null;
}
