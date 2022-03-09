// @ts-nocheck
import __getTranslateProperties from './getTranslateProperties';
import __getRotateProperties from './getRotateProperties';
/**
 * @name      getTransformProperties
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
 * import getTransformProperties from '@coffeekraken/sugar/js/dom/getTransformProperties'
 * const props = getTransformProperties(myCoolHTMLElement);
 * // output format
 * // {
 * // 	translateX : 100,
 * // 	translateY : 0,
 * // 	translateZ : 0,
 * //   rotateX: 0,
 * //   rotateY: 0,
 * //   rotateZ: 0
 * // }
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function getTransformProperties($elm) {
    const rotates = __getRotateProperties($elm), translates = __getTranslateProperties($elm);
    return {
        translateX: translates.x,
        translateY: translates.y,
        translateZ: translates.z,
        rotateX: rotates.x,
        rotateY: rotates.y,
        rotateZ: rotates.z,
    };
}
export default getTransformProperties;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VHJhbnNmb3JtUHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFRyYW5zZm9ybVByb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sd0JBQXdCLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxxQkFBcUIsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStCRztBQUNILFNBQVMsc0JBQXNCLENBQzNCLElBQWlCO0lBTWpCLE1BQU0sT0FBTyxHQUFHLHFCQUFxQixDQUFDLElBQUksQ0FBQyxFQUN2QyxVQUFVLEdBQUcsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFaEQsT0FBTztRQUNILFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN4QixVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDeEIsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3hCLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNsQixPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3JCLENBQUE7QUFDTCxDQUFDO0FBQ0QsZUFBZSxzQkFBc0IsQ0FBQyJ9