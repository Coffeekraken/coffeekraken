"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getStyleProperty_1 = __importDefault(require("../style/getStyleProperty"));
/**
 * @name      textWidth
 * @namespace            js.dom.utils
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Get the text width in px of a passed string or the passed HTMLElement
 *
 * @param 		{String|HTMLElement}		source 		The source to process
 * @return 		{Number} 								The calculated width of the text
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import textWidth from '@coffeekraken/sugar/js/dom/textWidth'
 * // text of an HTMLElement
 * const width = textWidth(myCoolHTMLElement);
 *
 * // text directly (no font-size management so it's less accurate...)
 * const width = textWidth('Hello World');
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function textWidth(source) {
    // create an element
    const elm = document.createElement('span');
    elm.style.whiteSpace = 'nowrap';
    elm.style.position = 'absolute';
    elm.style.visibility = 'hidden';
    let text = source;
    // if the source if an html element
    if (source.tagName) {
        // set the text into the element
        const tagName = source.tagName.toLowerCase();
        switch (tagName) {
            case 'input':
            case 'textarea':
                text = source.value;
                break;
            default:
                text = source.innerText;
                break;
        }
        // get the font properties
        const fs = (0, getStyleProperty_1.default)(source, 'font-size');
        const ff = (0, getStyleProperty_1.default)(source, 'font-family');
        const ls = (0, getStyleProperty_1.default)(source, 'letter-spacing');
        elm.style.fontSize = fs;
        elm.style.fontFamily = ff;
        elm.style.letterSpacing = ls;
    }
    // replacing spaces
    text = text.replace(/ /g, '\u00a0');
    // set the element content
    elm.innerHTML = text;
    // append the element to the body
    document.body.appendChild(elm);
    // return the width of the element
    const width = elm.offsetWidth;
    // remove the element from the dom
    document.body.removeChild(elm);
    // return the width
    return width;
}
exports.default = textWidth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGlGQUEyRDtBQUUzRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxNQUE0QjtJQUMzQyxvQkFBb0I7SUFDcEIsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7SUFDaEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQ2hDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztJQUNoQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUM7SUFFbEIsbUNBQW1DO0lBQ25DLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtRQUNoQixnQ0FBZ0M7UUFDaEMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM3QyxRQUFRLE9BQU8sRUFBRTtZQUNiLEtBQUssT0FBTyxDQUFDO1lBQ2IsS0FBSyxVQUFVO2dCQUNYLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNwQixNQUFNO1lBQ1Y7Z0JBQ0ksSUFBSSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0JBQ3hCLE1BQU07U0FDYjtRQUVELDBCQUEwQjtRQUMxQixNQUFNLEVBQUUsR0FBRyxJQUFBLDBCQUFrQixFQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNuRCxNQUFNLEVBQUUsR0FBRyxJQUFBLDBCQUFrQixFQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNyRCxNQUFNLEVBQUUsR0FBRyxJQUFBLDBCQUFrQixFQUFDLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3hELEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUN4QixHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDMUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0tBQ2hDO0lBRUQsbUJBQW1CO0lBQ25CLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNwQywwQkFBMEI7SUFDMUIsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDckIsaUNBQWlDO0lBQ2pDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLGtDQUFrQztJQUNsQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDO0lBQzlCLGtDQUFrQztJQUNsQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixtQkFBbUI7SUFDbkIsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUNELGtCQUFlLFNBQVMsQ0FBQyJ9