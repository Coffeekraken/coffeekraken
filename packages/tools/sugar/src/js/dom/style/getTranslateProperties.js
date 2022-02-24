// @ts-nocheck
import __convert from '../../../shared/unit/convert';
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
            z: 0,
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
            z: __convert(val[14], unit, $elm),
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
            z: __convert(val[6], unit, $elm) || 0,
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
            z: __convert(val[2], unit, $elm) || 0,
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
            z: 0,
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
            z: zRes,
        };
    }
    return {
        x: 0,
        y: 0,
        z: 0,
    };
}
export default getTranslateProperties;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VHJhbnNsYXRlUHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFRyYW5zbGF0ZVByb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sU0FBUyxNQUFNLDhCQUE4QixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsU0FBUyxzQkFBc0IsQ0FDM0IsSUFBaUIsRUFDakIsT0FBNEIsSUFBSTtJQU1oQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQjtRQUFFLE9BQU87SUFDckMsSUFBSSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQ2IsTUFBTSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsTUFBTSxTQUFTLEdBQ1gsS0FBSyxDQUFDLFNBQVM7UUFDZixLQUFLLENBQUMsZUFBZTtRQUNyQixLQUFLLENBQUMsWUFBWTtRQUNsQixLQUFLLENBQUMsV0FBVyxDQUFDO0lBQ3RCLElBQUksQ0FBQyxTQUFTO1FBQ1YsT0FBTztZQUNILENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztTQUNQLENBQUM7SUFDTixHQUFHLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQzVDLElBQUksR0FBRyxFQUFFO1FBQ0wsc0JBQXNCO1FBQ3RCLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDYixPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQzthQUN4QixPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQzthQUNoQixLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMxQixPQUFPO1lBQ0gsQ0FBQyxFQUFFLFNB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