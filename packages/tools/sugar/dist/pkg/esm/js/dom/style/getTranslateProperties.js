// @ts-nocheck
import * as __rematrix from 'rematrix';
/**
 * @name      getTranslateProperties
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Get a translate properties of an HTMLElement
 *
 * @param 		{HTMLElement} 					$elm  		The element to get the properties from
 * @return 		{Object} 									The translate x,y and z properties
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __getTranslateProperties($1)
 *
 * @example  	js
 * import { __getTranslateProperties } from '@coffeekraken/sugar/dom'
 * const props = __getTranslateProperties(myCoolHTMLElement);
 * // output format
 * // {
 * // 	x : 100,
 * // 	y : 0,
 * // 	z : 0
 * // }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __getTranslateProperties($elm) {
    if (!window.getComputedStyle)
        return {
            x: 0,
            y: 0,
            z: 0,
        };
    const style = getComputedStyle($elm);
    const transform = style.transform ||
        style.webkitTransform ||
        style.mozTransform ||
        style.msTransform;
    if (!transform)
        return {
            x: 0,
            y: 0,
            z: 0,
        };
    const matrix3d = __rematrix.fromString(transform);
    return {
        x: matrix3d[12],
        y: matrix3d[13],
        z: matrix3d[14],
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEtBQUssVUFBVSxNQUFNLFVBQVUsQ0FBQztBQUV2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSx3QkFBd0IsQ0FBQyxJQUFpQjtJQUs5RCxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQjtRQUN4QixPQUFPO1lBQ0gsQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1NBQ1AsQ0FBQztJQUNOLE1BQU0sS0FBSyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLE1BQU0sU0FBUyxHQUNYLEtBQUssQ0FBQyxTQUFTO1FBQ2YsS0FBSyxDQUFDLGVBQWU7UUFDckIsS0FBSyxDQUFDLFlBQVk7UUFDbEIsS0FBSyxDQUFDLFdBQVcsQ0FBQztJQUN0QixJQUFJLENBQUMsU0FBUztRQUNWLE9BQU87WUFDSCxDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7U0FDUCxDQUFDO0lBRU4sTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsRCxPQUFPO1FBQ0gsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFDZixDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUNmLENBQUMsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDO0tBQ2xCLENBQUM7QUFDTixDQUFDIn0=