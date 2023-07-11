// @ts-nocheck
import __getRotateProperties from './getRotateProperties.js';
import __getTranslateProperties from './getTranslateProperties.js';
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
 * @snippet         __getTransformProperties($1)
 *
 * @example  	js
 * import { __getTransformProperties } from '@coffeekraken/sugar/dom'
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
 * @since           2.0.0
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLHFCQUFxQixNQUFNLDBCQUEwQixDQUFDO0FBQzdELE9BQU8sd0JBQXdCLE1BQU0sNkJBQTZCLENBQUM7QUFFbkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUNILFNBQVMsc0JBQXNCLENBQUMsSUFBaUI7SUFLN0MsTUFBTSxPQUFPLEdBQUcscUJBQXFCLENBQUMsSUFBSSxDQUFDLEVBQ3ZDLFVBQVUsR0FBRyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVoRCxPQUFPO1FBQ0gsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3hCLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN4QixVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDeEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNsQixPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDckIsQ0FBQztBQUNOLENBQUM7QUFDRCxlQUFlLHNCQUFzQixDQUFDIn0=