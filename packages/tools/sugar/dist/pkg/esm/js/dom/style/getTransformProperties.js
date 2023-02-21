// @ts-nocheck
import { __getRotateProperties, __getTranslateProperties, } from '@coffeekraken/sugar/dom';
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
 @since           2.0.0
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQ0gscUJBQXFCLEVBQ3JCLHdCQUF3QixHQUMzQixNQUFNLHlCQUF5QixDQUFDO0FBRWpDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JHO0FBQ0gsU0FBUyxzQkFBc0IsQ0FBQyxJQUFpQjtJQUs3QyxNQUFNLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsRUFDdkMsVUFBVSxHQUFHLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWhELE9BQU87UUFDSCxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDeEIsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3hCLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN4QixPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztLQUNyQixDQUFDO0FBQ04sQ0FBQztBQUNELGVBQWUsc0JBQXNCLENBQUMifQ==