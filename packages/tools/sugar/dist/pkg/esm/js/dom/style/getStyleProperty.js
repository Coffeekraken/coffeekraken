// @ts-nocheck
import camelize from '../../../shared/string/camelize';
import autoCast from '../../../shared/string/autoCast';
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
 * @example  	js
 * import getStyleProperty from '@coffeekraken/sugar/js/dom/getStyleProperty'
 * const opacity = getStyleProperty(myCoolHTMLElement, 'opacity');
 *
 * @see 		https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function getStyleProperty(elm, property) {
    // caching mecanisme
    setTimeout(() => {
        elm._sComputedStyle = null;
    });
    const computed = elm._sComputedStyle || window.getComputedStyle(elm);
    elm._sComputedStyle = computed;
    const prefixes = ['', 'webkit-', 'moz-', 'ms-', 'o-', 'khtml-'];
    for (let i = 0; i < prefixes.length; i++) {
        const prefix = prefixes[i];
        const value = computed[camelize(`${prefix}${property}`)];
        if (value && value.trim() !== '')
            return autoCast(value);
    }
    return null;
}
export default getStyleProperty;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSxpQ0FBaUMsQ0FBQztBQUN2RCxPQUFPLFFBQVEsTUFBTSxpQ0FBaUMsQ0FBQztBQUV2RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLGdCQUFnQixDQUFDLEdBQWdCLEVBQUUsUUFBZ0I7SUFDeEQsb0JBQW9CO0lBQ3BCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDWixHQUFHLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUMvQixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxlQUFlLElBQUksTUFBTSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JFLEdBQUcsQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO0lBRS9CLE1BQU0sUUFBUSxHQUFHLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNoRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN0QyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sR0FBRyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekQsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7WUFBRSxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM1RDtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFDRCxlQUFlLGdCQUFnQixDQUFDIn0=