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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEtBQUssVUFBVSxNQUFNLFVBQVUsQ0FBQztBQUV2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQVMsc0JBQXNCLENBQzNCLElBQWlCO0lBTWpCLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCO1FBQUUsT0FBTztZQUNqQyxDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7U0FDUCxDQUFDO0lBQ0YsTUFBTSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsTUFBTSxTQUFTLEdBQ1gsS0FBSyxDQUFDLFNBQVM7UUFDZixLQUFLLENBQUMsZUFBZTtRQUNyQixLQUFLLENBQUMsWUFBWTtRQUNsQixLQUFLLENBQUMsV0FBVyxDQUFDO0lBQ3RCLElBQUksQ0FBQyxTQUFTO1FBQ1YsT0FBTztZQUNILENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztTQUNQLENBQUM7SUFFTixNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xELE9BQU87UUFDSCxDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQztRQUNmLENBQUMsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDO1FBQ2YsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUM7S0FDbEIsQ0FBQztBQUNOLENBQUM7QUFDRCxlQUFlLHNCQUFzQixDQUFDIn0=