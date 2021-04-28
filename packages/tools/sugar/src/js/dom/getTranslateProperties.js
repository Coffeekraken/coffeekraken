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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VHJhbnNsYXRlUHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9qcy9kb20vZ2V0VHJhbnNsYXRlUHJvcGVydGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCx3RUFBa0Q7SUFFbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJCRztJQUNILFNBQVMsc0JBQXNCLENBQUMsSUFBSSxFQUFFLElBQUksR0FBRyxJQUFJO1FBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCO1lBQUUsT0FBTztRQUNyQyxJQUFJLEdBQUcsRUFBRSxHQUFHLENBQUM7UUFDYixNQUFNLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxNQUFNLFNBQVMsR0FDYixLQUFLLENBQUMsU0FBUztZQUNmLEtBQUssQ0FBQyxlQUFlO1lBQ3JCLEtBQUssQ0FBQyxZQUFZO1lBQ2xCLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFDcEIsSUFBSSxDQUFDLFNBQVM7WUFDWixPQUFPO2dCQUNMLENBQUMsRUFBRSxDQUFDO2dCQUNKLENBQUMsRUFBRSxDQUFDO2dCQUNKLENBQUMsRUFBRSxDQUFDO2FBQ0wsQ0FBQztRQUNKLEdBQUcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDNUMsSUFBSSxHQUFHLEVBQUU7WUFDUCxzQkFBc0I7WUFDdEIsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDZixPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQztpQkFDeEIsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7aUJBQ2hCLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUs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