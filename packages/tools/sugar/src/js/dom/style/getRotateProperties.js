// @ts-nocheck
import * as rematrix from 'rematrix';
/**
 * @name      getRotateProperties
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Get a rotate properties of an HTMLElement
 *
 * @param 		{HTMLElement} 					$elm  		The element to get the properties from
 * @return 		{Object} 									The translate x,y and z properties
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import getRotateProperties from '@coffeekraken/sugar/js/dom/getRotateProperties'
 * const props = getRotateProperties(myCoolHTMLElement);
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
function getRotateProperties($elm) {
    if (!window.getComputedStyle)
        return;
    let idx, mat;
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
    const matrix = rematrix.fromString(transform).toString();
    var values = matrix.split(','), pi = Math.PI, sinB = parseFloat(values[8]), b = Math.round(Math.asin(sinB) * 180 / pi), cosB = Math.cos(b * pi / 180), matrixVal10 = parseFloat(values[9]), a = Math.round(Math.asin(-matrixVal10 / cosB) * 180 / pi), matrixVal1 = parseFloat(values[0]), c = Math.round(Math.acos(matrixVal1 / cosB) * 180 / pi);
    return {
        x: a,
        y: b,
        z: c,
    };
}
export default getRotateProperties;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Um90YXRlUHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFJvdGF0ZVByb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sS0FBSyxRQUFRLE1BQU0sVUFBVSxDQUFDO0FBRXJDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsU0FBUyxtQkFBbUIsQ0FDeEIsSUFBaUI7SUFNakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0I7UUFBRSxPQUFPO0lBQ3JDLElBQUksR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUNiLE1BQU0sS0FBSyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLE1BQU0sU0FBUyxHQUNYLEtBQUssQ0FBQyxTQUFTO1FBQ2YsS0FBSyxDQUFDLGVBQWU7UUFDckIsS0FBSyxDQUFDLFlBQVk7UUFDbEIsS0FBSyxDQUFDLFdBQVcsQ0FBQztJQUN0QixJQUFJLENBQUMsU0FBUztRQUNWLE9BQU87WUFDSCxDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7U0FDUCxDQUFDO0lBRU4sTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6RCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUMxQixFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFDWixJQUFJLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUM1QixDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFDMUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFDN0IsV0FBVyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDbkMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQ3pELFVBQVUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ2xDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUU1RCxPQUFPO1FBQ0gsQ0FBQyxFQUFFLENBQUM7UUFDSixDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDO0tBQ1AsQ0FBQztBQUVOLENBQUM7QUFDRCxlQUFlLG1CQUFtQixDQUFDIn0=