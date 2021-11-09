import * as __rematrix from 'rematrix';

/**
 * @name      getTransformProperties
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @platform          ts
 * @status        beta
 *
 * Get transform properties (scale, transform and rotate) of an HTMLElement
 *
 * @param 		{HTMLElement} 					$elm  		The element to get the properties from
 * @return 		{Object} 									The transform properties
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
 * // 	x : 100,
 * // 	y : 0,
 * // 	z : 0
 * // }
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export interface IGetTransformPropertiesResult {}
export default function getTransformProperties(
    $elm,
): IGetTransformPropertiesResult {
    const style = getComputedStyle($elm);
    const transform = style.transform || style.webkitTransform;

    console.log(__rematrix.toString(__rematrix.fromString(transform)));

    return {};
}
