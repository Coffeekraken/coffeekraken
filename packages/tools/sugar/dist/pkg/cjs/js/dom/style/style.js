"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styleString2Object_1 = __importDefault(require("../styleString2Object"));
const styleObject2String_1 = __importDefault(require("../styleObject2String"));
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
 * import style from '@coffeekraken/sugar/js/dom/style'
 * style(myCoolHTMLElement, {
 * 		paddingLeft : 20,
 * 		display : null
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function style(elm, styleObj) {
    // convert style string to object
    const styleAttr = elm.getAttribute('style');
    if (styleAttr) {
        styleObj = Object.assign(Object.assign({}, (0, styleString2Object_1.default)(styleAttr)), styleObj);
    }
    // apply the style to the element
    // elm.setAttribute('style', __styleObject2String(current.styleObj));
    elm.style.cssText = (0, styleObject2String_1.default)(styleObj);
    // return the style
    return elm.style;
}
exports.default = style;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUdkLCtFQUF5RDtBQUN6RCwrRUFBeUQ7QUFFekQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsU0FBUyxLQUFLLENBQUMsR0FBZ0IsRUFBRSxRQUFhO0lBQzFDLGlDQUFpQztJQUNqQyxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTVDLElBQUksU0FBUyxFQUFFO1FBQ1gsUUFBUSxtQ0FDRCxJQUFBLDRCQUFvQixFQUFDLFNBQVMsQ0FBQyxHQUMvQixRQUFRLENBQ2QsQ0FBQztLQUNMO0lBRUQsaUNBQWlDO0lBQ2pDLHFFQUFxRTtJQUNyRSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFBLDRCQUFvQixFQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRW5ELG1CQUFtQjtJQUNuQixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDckIsQ0FBQztBQUNELGtCQUFlLEtBQUssQ0FBQyJ9