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
 * @example 	js
 * import { __style } from '@coffeekraken/sugar/dom'
 * __style(myCoolHTMLElement, {
 * 		paddingLeft : 20,
 * 		display : null
 * });
 *
 @since           2.0.0
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLGlEQUdpQztBQUVqQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUF3QixPQUFPLENBQUMsR0FBZ0IsRUFBRSxRQUFhO0lBQzNELGlDQUFpQztJQUNqQyxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTVDLElBQUksU0FBUyxFQUFFO1FBQ1gsUUFBUSxtQ0FDRCxJQUFBLDBCQUFvQixFQUFDLFNBQVMsQ0FBQyxHQUMvQixRQUFRLENBQ2QsQ0FBQztLQUNMO0lBRUQsaUNBQWlDO0lBQ2pDLHFFQUFxRTtJQUNyRSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFBLDBCQUFvQixFQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRW5ELG1CQUFtQjtJQUNuQixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDckIsQ0FBQztBQWpCRCwwQkFpQkMifQ==