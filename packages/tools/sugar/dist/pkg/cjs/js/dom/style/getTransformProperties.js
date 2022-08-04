"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getTranslateProperties_1 = __importDefault(require("./getTranslateProperties"));
const getRotateProperties_1 = __importDefault(require("./getRotateProperties"));
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
    const rotates = (0, getRotateProperties_1.default)($elm), translates = (0, getTranslateProperties_1.default)($elm);
    return {
        translateX: translates.x,
        translateY: translates.y,
        translateZ: translates.z,
        rotateX: rotates.x,
        rotateY: rotates.y,
        rotateZ: rotates.z,
    };
}
exports.default = getTransformProperties;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHNGQUFnRTtBQUNoRSxnRkFBMEQ7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQkc7QUFDSCxTQUFTLHNCQUFzQixDQUMzQixJQUFpQjtJQU1qQixNQUFNLE9BQU8sR0FBRyxJQUFBLDZCQUFxQixFQUFDLElBQUksQ0FBQyxFQUN2QyxVQUFVLEdBQUcsSUFBQSxnQ0FBd0IsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUVoRCxPQUFPO1FBQ0gsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3hCLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN4QixVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDeEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNsQixPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDckIsQ0FBQTtBQUNMLENBQUM7QUFDRCxrQkFBZSxzQkFBc0IsQ0FBQyJ9