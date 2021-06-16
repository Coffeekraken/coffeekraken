// @ts-nocheck
import __convert from '../../../shared/unit/convert';
/**
 * @name      getTranslateProperties
 * @namespace            js.dom.style
 * @type      Function
 * @platform      js
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function getTranslateProperties($elm, unit = 'px') {
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
            z: 0
        };
    mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) {
        // preparing the value
        const val = mat[1]
            .replace('matrix3d(', '')
            .replace(')', '')
            .split(',')
            .map((v) => v.trim());
        return {
            x: __convert(val[12], unit, $elm),
            y: __convert(val[13], unit, $elm),
            z: __convert(val[14], unit, $elm)
        };
    }
    mat = transform.match(/^matrix\((.+)\)$/);
    if (mat) {
        // preparing the value
        const val = mat[1]
            .replace('matrix(', '')
            .replace(')', '')
            .split(',')
            .map((v) => v.trim());
        return {
            x: __convert(val[4], unit, $elm),
            y: __convert(val[5], unit, $elm),
            z: __convert(val[6], unit, $elm) || 0
        };
    }
    mat = transform.match(/^translate3d\((.+)\)$/);
    if (mat) {
        // preparing the value
        const val = mat[1]
            .replace('translate3d(', '')
            .replace(')', '')
            .split(',')
            .map((v) => v.trim());
        return {
            x: __convert(val[0], unit, $elm),
            y: __convert(val[1], unit, $elm),
            z: __convert(val[2], unit, $elm) || 0
        };
    }
    mat = transform.match(/^translate\((.+)\)$/);
    if (mat) {
        // preparing the value
        const val = mat[1]
            .replace('translate(', '')
            .replace(')', '')
            .split(',')
            .map((v) => v.trim());
        return {
            x: __convert(val[0], unit, $elm),
            y: __convert(val[1], unit, $elm),
            z: 0
        };
    }
    mat = transform.match(/translate[XYZ]\((.+)\)/);
    if (mat) {
        // preparing the value
        const xReg = /translateX\((\S+)\)/;
        const yReg = /translateY\((\S+)\)/;
        const zReg = /translateZ\((\S+)\)/;
        const xRegRes = mat[0].match(xReg);
        const yRegRes = mat[0].match(yReg);
        const zRegRes = mat[0].match(zReg);
        let xRes = 0;
        if (xRegRes[1]) {
            xRes = __convert(xRegRes[1], unit, $elm);
        }
        let yRes = 0;
        if (yRegRes[1]) {
            yRes = __convert(yRegRes[1], unit, $elm);
        }
        let zRes = 0;
        if (zRegRes[1]) {
            zRes = __convert(zRegRes[1], unit, $elm);
        }
        return {
            x: xRes,
            y: yRes,
            z: zRes
        };
    }
    return {
        x: 0,
        y: 0,
        z: 0
    };
}
export default getTranslateProperties;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VHJhbnNsYXRlUHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFRyYW5zbGF0ZVByb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sU0FBUyxNQUFNLDhCQUE4QixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsU0FBUyxzQkFBc0IsQ0FBQyxJQUFpQixFQUFFLE9BQTRCLElBQUk7SUFLakYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0I7UUFBRSxPQUFPO0lBQ3JDLElBQUksR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUNiLE1BQU0sS0FBSyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLE1BQU0sU0FBUyxHQUNiLEtBQUssQ0FBQyxTQUFTO1FBQ2YsS0FBSyxDQUFDLGVBQWU7UUFDckIsS0FBSyxDQUFDLFlBQVk7UUFDbEIsS0FBSyxDQUFDLFdBQVcsQ0FBQztJQUNwQixJQUFJLENBQUMsU0FBUztRQUNaLE9BQU87WUFDTCxDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7U0FDTCxDQUFDO0lBQ0osR0FBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUM1QyxJQUFJLEdBQUcsRUFBRTtRQUNQLHNCQUFzQjtRQUN0QixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ2YsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7YUFDeEIsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7YUFDaEIsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDeEIsT0FBTztZQUNMLENBQUMsRUFBRSxTQUFT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