"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
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
 * import { __textWidth } from '@coffeekraken/sugar/dom'
 * // text of an HTMLElement
 * const width =  __textWidth(myCoolHTMLElement);
 *
 * // text directly (no font-size management so it's less accurate...)
 * const width =  __textWidth('Hello World');
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __textWidth(source) {
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
        const fs = (0, dom_1.__getStyleProperty)(source, 'font-size');
        const ff = (0, dom_1.__getStyleProperty)(source, 'font-family');
        const ls = (0, dom_1.__getStyleProperty)(source, 'letter-spacing');
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
exports.default = __textWidth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLGlEQUE2RDtBQUU3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUF3QixXQUFXLENBQUMsTUFBNEI7SUFDNUQsb0JBQW9CO0lBQ3BCLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0MsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO0lBQ2hDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztJQUNoQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7SUFDaEMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDO0lBRWxCLG1DQUFtQztJQUNuQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7UUFDaEIsZ0NBQWdDO1FBQ2hDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDN0MsUUFBUSxPQUFPLEVBQUU7WUFDYixLQUFLLE9BQU8sQ0FBQztZQUNiLEtBQUssVUFBVTtnQkFDWCxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDcEIsTUFBTTtZQUNWO2dCQUNJLElBQUksR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUN4QixNQUFNO1NBQ2I7UUFFRCwwQkFBMEI7UUFDMUIsTUFBTSxFQUFFLEdBQUcsSUFBQSx3QkFBa0IsRUFBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbkQsTUFBTSxFQUFFLEdBQUcsSUFBQSx3QkFBa0IsRUFBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDckQsTUFBTSxFQUFFLEdBQUcsSUFBQSx3QkFBa0IsRUFBQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUN4RCxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDeEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQzFCLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztLQUNoQztJQUVELG1CQUFtQjtJQUNuQixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDcEMsMEJBQTBCO0lBQzFCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLGlDQUFpQztJQUNqQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixrQ0FBa0M7SUFDbEMsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQztJQUM5QixrQ0FBa0M7SUFDbEMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsbUJBQW1CO0lBQ25CLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUEzQ0QsOEJBMkNDIn0=