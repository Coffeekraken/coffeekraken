// @ts-nocheck
import { __camelize, __parse } from '@coffeekraken/sugar/string';
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
export default function __getStyleProperty(elm, property) {
    // // caching mecanisme
    // setTimeout(() => {
    //     elm._sComputedStyle = null;
    // });
    _console.log('ELM', elm);
    const computed = window.getComputedStyle(elm);
    // elm._sComputedStyle = computed;
    const prefixes = ['', 'webkit-', 'moz-', 'ms-', 'o-', 'khtml-'];
    for (let i = 0; i < prefixes.length; i++) {
        const prefix = prefixes[i];
        const value = computed[__camelize(`${prefix}${property}`)];
        if (value && value.trim() !== '')
            return __parse(value);
    }
    return null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRWpFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxrQkFBa0IsQ0FDdEMsR0FBZ0IsRUFDaEIsUUFBZ0I7SUFFaEIsdUJBQXVCO0lBQ3ZCLHFCQUFxQjtJQUNyQixrQ0FBa0M7SUFDbEMsTUFBTTtJQUNOLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QyxrQ0FBa0M7SUFFbEMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsTUFBTSxHQUFHLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzRCxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtZQUFFLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzNEO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9