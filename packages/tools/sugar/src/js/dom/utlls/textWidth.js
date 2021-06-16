// @ts-nocheck
import __getStyleProperty from '../style/getStyleProperty';
/**
 * @name      textWidth
 * @namespace            js.dom.utils
 * @type      Function
 * @platform      js
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dFdpZHRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGV4dFdpZHRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGtCQUFrQixNQUFNLDJCQUEyQixDQUFDO0FBRTNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQVMsU0FBUyxDQUFDLE1BQTRCO0lBQzdDLG9CQUFvQjtJQUNwQixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztJQUNoQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDaEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO0lBQ2hDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQztJQUVsQixtQ0FBbUM7SUFDbkMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO1FBQ2xCLGdDQUFnQztRQUNoQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdDLFFBQVEsT0FBTyxFQUFFO1lBQ2YsS0FBSyxPQUFPLENBQUM7WUFDYixLQUFLLFVBQVU7Z0JBQ2IsSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ3BCLE1BQU07WUFDUjtnQkFDRSxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFDeEIsTUFBTTtTQUNUO1FBRUQsMEJBQTBCO1FBQzFCLE1BQU0sRUFBRSxHQUFHLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNuRCxNQUFNLEVBQUUsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDckQsTUFBTSxFQUFFLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDeEQsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUMxQixHQUFHLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7S0FDOUI7SUFFRCxtQkFBbUI7SUFDbkIsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLDBCQUEwQjtJQUMxQixHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUNyQixpQ0FBaUM7SUFDakMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0Isa0NBQWtDO0lBQ2xDLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUM7SUFDOUIsa0NBQWtDO0lBQ2xDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLG1CQUFtQjtJQUNuQixPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFDRCxlQUFlLFNBQVMsQ0FBQyJ9