// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../shared/unit/convert"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const convert_1 = __importDefault(require("../../shared/unit/convert"));
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
                x: convert_1.default(val[12], unit, $elm),
                y: convert_1.default(val[13], unit, $elm),
                z: convert_1.default(val[14], unit, $elm)
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
                x: convert_1.default(val[4], unit, $elm),
                y: convert_1.default(val[5], unit, $elm),
                z: convert_1.default(val[6], unit, $elm) || 0
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
                x: convert_1.default(val[0], unit, $elm),
                y: convert_1.default(val[1], unit, $elm),
                z: convert_1.default(val[2], unit, $elm) || 0
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
                x: convert_1.default(val[0], unit, $elm),
                y: convert_1.default(val[1], unit, $elm),
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
                xRes = convert_1.default(xRegRes[1], unit, $elm);
            }
            let yRes = 0;
            if (yRegRes[1]) {
                yRes = convert_1.default(yRegRes[1], unit, $elm);
            }
            let zRes = 0;
            if (zRegRes[1]) {
                zRes = convert_1.default(zRegRes[1], unit, $elm);
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
    exports.default = getTranslateProperties;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VHJhbnNsYXRlUHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFRyYW5zbGF0ZVByb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsd0VBQWtEO0lBRWxEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EyQkc7SUFDSCxTQUFTLHNCQUFzQixDQUFDLElBQUksRUFBRSxJQUFJLEdBQUcsSUFBSTtRQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQjtZQUFFLE9BQU87UUFDckMsSUFBSSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ2IsTUFBTSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsTUFBTSxTQUFTLEdBQ2IsS0FBSyxDQUFDLFNBQVM7WUFDZixLQUFLLENBQUMsZUFBZTtZQUNyQixLQUFLLENBQUMsWUFBWTtZQUNsQixLQUFLLENBQUMsV0FBVyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTO1lBQ1osT0FBTztnQkFDTCxDQUFDLEVBQUUsQ0FBQztnQkFDSixDQUFDLEVBQUUsQ0FBQztnQkFDSixDQUFDLEVBQUUsQ0FBQzthQUNMLENBQUM7UUFDSixHQUFHLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzVDLElBQUksR0FBRyxFQUFFO1lBQ1Asc0JBQXNCO1lBQ3RCLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ2YsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7aUJBQ3hCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO2lCQUNoQixLQUFLLENBQUMsR0FBRyxDQUFDO2lCQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDeEIsT0FBTztnQkFDTCxDQUFDLEVBQUUs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