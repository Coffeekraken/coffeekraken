// @ts-nocheck
import __convert from '../../shared/unit/convert';
/**
 * @name      getTranslateProperties
 * @namespace            js.dom
 * @type      Function
 * @stable
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VHJhbnNsYXRlUHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFRyYW5zbGF0ZVByb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sU0FBUyxNQUFNLDJCQUEyQixDQUFDO0FBRWxEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUFTLHNCQUFzQixDQUFDLElBQUksRUFBRSxJQUFJLEdBQUcsSUFBSTtJQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQjtRQUFFLE9BQU87SUFDckMsSUFBSSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQ2IsTUFBTSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsTUFBTSxTQUFTLEdBQ2IsS0FBSyxDQUFDLFNBQVM7UUFDZixLQUFLLENBQUMsZUFBZTtRQUNyQixLQUFLLENBQUMsWUFBWTtRQUNsQixLQUFLLENBQUMsV0FBVyxDQUFDO0lBQ3BCLElBQUksQ0FBQyxTQUFTO1FBQ1osT0FBTztZQUNMLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztTQUNMLENBQUM7SUFDSixHQUFHLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQzVDLElBQUksR0FBRyxFQUFFO1FBQ1Asc0JBQXNCO1FBQ3RCLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDZixPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQzthQUN4QixPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQzthQUNoQixLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN4QixPQUFPO1lBQ0wsQ0FBQyxFQUFFLFNB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