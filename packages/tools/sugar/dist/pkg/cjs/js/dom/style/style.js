"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const css_1 = require("@coffeekraken/sugar/css");
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
function __style(elm, styleObj) {
    // convert style string to object
    const styleAttr = elm.getAttribute('style');
    if (styleAttr) {
        styleObj = Object.assign(Object.assign({}, (0, css_1.__styleString2Object)(styleAttr)), styleObj);
    }
    // apply the style to the element
    // elm.setAttribute('style', __styleObject2String(current.styleObj));
    elm.style.cssText = (0, css_1.__styleObject2String)(styleObj);
    // return the style
    return elm.style;
}
exports.default = __style;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLGlEQUdpQztBQUVqQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQXdCLE9BQU8sQ0FBQyxHQUFnQixFQUFFLFFBQWE7SUFDM0QsaUNBQWlDO0lBQ2pDLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFNUMsSUFBSSxTQUFTLEVBQUU7UUFDWCxRQUFRLG1DQUNELElBQUEsMEJBQW9CLEVBQUMsU0FBUyxDQUFDLEdBQy9CLFFBQVEsQ0FDZCxDQUFDO0tBQ0w7SUFFRCxpQ0FBaUM7SUFDakMscUVBQXFFO0lBQ3JFLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUEsMEJBQW9CLEVBQUMsUUFBUSxDQUFDLENBQUM7SUFFbkQsbUJBQW1CO0lBQ25CLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQztBQUNyQixDQUFDO0FBakJELDBCQWlCQyJ9