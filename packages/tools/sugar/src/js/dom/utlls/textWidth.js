// @ts-nocheck
import __getStyleProperty from '../style/getStyleProperty';
/**
 * @name      textWidth
 * @namespace            js.dom.utils
 * @type      Function
 * @stable
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
        const fs = __getStyleProperty(source, 'font-size');
        const ff = __getStyleProperty(source, 'font-family');
        const ls = __getStyleProperty(source, 'letter-spacing');
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
export default textWidth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFdpZHRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGV4dFdpZHRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGtCQUFrQixNQUFNLDJCQUEyQixDQUFDO0FBRTNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBUyxTQUFTLENBQUMsTUFBTTtJQUN2QixvQkFBb0I7SUFDcEIsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7SUFDaEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQ2hDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztJQUNoQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUM7SUFFbEIsbUNBQW1DO0lBQ25DLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtRQUNsQixnQ0FBZ0M7UUFDaEMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM3QyxRQUFRLE9BQU8sRUFBRTtZQUNmLEtBQUssT0FBTyxDQUFDO1lBQ2IsS0FBSyxVQUFVO2dCQUNiLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNwQixNQUFNO1lBQ1I7Z0JBQ0UsSUFBSSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0JBQ3hCLE1BQU07U0FDVDtRQUVELDBCQUEwQjtRQUMxQixNQUFNLEVBQUUsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbkQsTUFBTSxFQUFFLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sRUFBRSxHQUFHLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3hELEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUN4QixHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDMUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0tBQzlCO0lBRUQsbUJBQW1CO0lBQ25CLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNwQywwQkFBMEI7SUFDMUIsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDckIsaUNBQWlDO0lBQ2pDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLGtDQUFrQztJQUNsQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDO0lBQzlCLGtDQUFrQztJQUNsQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixtQkFBbUI7SUFDbkIsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBQ0QsZUFBZSxTQUFTLENBQUMifQ==