// @ts-nocheck
import * as rematrix from 'rematrix';
/**
 * @name      getScaleProperty
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Get a scale properties of an HTMLElement
 *
 * @param 		{HTMLElement} 					$elm  		The element to get the properties from
 * @return 		{Number}                                     The scale property
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __getScaleProperty($1)
 *
 * @example  	js
 * import { __getScaleProperty } from '@coffeekraken/sugar/dom'
 * const props = __getScaleProperty(myCoolHTMLElement);
 * // output format
 * // 2
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __getScaleProperty($elm) {
    if (!window.getComputedStyle)
        return;
    const style = getComputedStyle($elm);
    const transform = style.transform ||
        style.webkitTransform ||
        style.mozTransform ||
        style.msTransform;
    if (!transform)
        return 1;
    const matrix = rematrix.fromString(transform).toString();
    var values = matrix.split(','), pi = Math.PI, sinB = parseFloat(values[8]), b = Math.round((Math.asin(sinB) * 180) / pi), cosB = Math.cos((b * pi) / 180), matrixVal10 = parseFloat(values[9]), a = Math.round((Math.asin(-matrixVal10 / cosB) * 180) / pi), matrixVal1 = parseFloat(values[0]), c = Math.round((Math.acos(matrixVal1 / cosB) * 180) / pi);
    return {
        x: a,
        y: b,
        z: c,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEtBQUssUUFBUSxNQUFNLFVBQVUsQ0FBQztBQUVyQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGtCQUFrQixDQUFDLElBQWlCO0lBQ3hELElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCO1FBQUUsT0FBTztJQUNyQyxNQUFNLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxNQUFNLFNBQVMsR0FDWCxLQUFLLENBQUMsU0FBUztRQUNmLEtBQUssQ0FBQyxlQUFlO1FBQ3JCLEtBQUssQ0FBQyxZQUFZO1FBQ2xCLEtBQUssQ0FBQyxXQUFXLENBQUM7SUFDdEIsSUFBSSxDQUFDLFNBQVM7UUFBRSxPQUFPLENBQUMsQ0FBQztJQUV6QixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3pELElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQzFCLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUNaLElBQUksR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzVCLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsRUFDNUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQy9CLFdBQVcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ25DLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsRUFDM0QsVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDbEMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUU5RCxPQUFPO1FBQ0gsQ0FBQyxFQUFFLENBQUM7UUFDSixDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDO0tBQ1AsQ0FBQztBQUNOLENBQUMifQ==