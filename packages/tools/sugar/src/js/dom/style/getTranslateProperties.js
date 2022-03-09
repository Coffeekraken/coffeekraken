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
 * @example  	js
 * import getTranslateProperties from '@coffeekraken/sugar/js/dom/getTranslateProperties'
 * const props = getTranslateProperties(myCoolHTMLElement);
 * // output format
 * // {
 * // 	x : 100,
 * // 	y : 0,
 * // 	z : 0
 * // }
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function getTranslateProperties($elm) {
    if (!window.getComputedStyle)
        return {
            x: 0,
            y: 0,
            z: 0
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
export default getTranslateProperties;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VHJhbnNsYXRlUHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFRyYW5zbGF0ZVByb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sS0FBSyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsU0FBUyxzQkFBc0IsQ0FDM0IsSUFBaUI7SUFNakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0I7UUFBRSxPQUFPO1lBQ2pDLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztTQUNQLENBQUM7SUFDRixNQUFNLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxNQUFNLFNBQVMsR0FDWCxLQUFLLENBQUMsU0FBUztRQUNmLEtBQUssQ0FBQyxlQUFlO1FBQ3JCLEtBQUssQ0FBQyxZQUFZO1FBQ2xCLEtBQUssQ0FBQyxXQUFXLENBQUM7SUFDdEIsSUFBSSxDQUFDLFNBQVM7UUFDVixPQUFPO1lBQ0gsQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1NBQ1AsQ0FBQztJQUVOLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEQsT0FBTztRQUNILENBQUMsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDO1FBQ2YsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFDZixDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQztLQUNsQixDQUFDO0FBQ04sQ0FBQztBQUNELGVBQWUsc0JBQXNCLENBQUMifQ==