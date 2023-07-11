// @ts-nocheck

import __styleObjectToString from '../../../shared/css/transform/styleObjectToString.js';
import __styleStringToObject from '../../../shared/css/transform/styleStringToObject.js';

/**
 * @name      style
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Set or remove a css style property on an HTMLElement
 *
 * @param 		{HTMLElement} 			elm 			The element to process
 * @param 		{Object} 				styleObj 		An object of style to apply
 * @return 		(Object) 								The element applied style
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __style($1, $2)
 *
 * @example 	js
 * import { __style } from '@coffeekraken/sugar/dom'
 * __style(myCoolHTMLElement, {
 * 		paddingLeft : 20,
 * 		display : null
 * });
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __style(elm: HTMLElement, styleObj: any): any {
    // convert style string to object
    const styleAttr = elm.getAttribute('style');

    if (styleAttr) {
        styleObj = {
            ...__styleStringToObject(styleAttr),
            ...styleObj,
        };
    }

    // apply the style to the element
    // elm.setAttribute('style', __styleObjectToString(current.styleObj));
    elm.style.cssText = __styleObjectToString(styleObj);

    // return the style
    return elm.style;
}
