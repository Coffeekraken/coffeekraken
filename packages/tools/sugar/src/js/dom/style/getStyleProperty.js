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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0U3R5bGVQcm9wZXJ0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFN0eWxlUHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sUUFBUSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3ZELE9BQU8sUUFBUSxNQUFNLGlDQUFpQyxDQUFDO0FBRXZEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQVMsZ0JBQWdCLENBQUMsR0FBZ0IsRUFBRSxRQUFnQjtJQUN4RCxvQkFBb0I7SUFDcEIsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNaLEdBQUcsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQy9CLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLGVBQWUsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckUsR0FBRyxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUM7SUFFL0IsTUFBTSxRQUFRLEdBQUcsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxHQUFHLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6RCxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtZQUFFLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzVEO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUNELGVBQWUsZ0JBQWdCLENBQUMifQ==