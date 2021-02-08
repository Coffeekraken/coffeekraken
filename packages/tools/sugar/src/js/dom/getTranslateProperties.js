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
        define(["require", "exports", "../unit/convert"], factory);
    }
})(function (require, exports) {
    "use strict";
    var convert_1 = __importDefault(require("../unit/convert"));
    /**
     * @name      getTranslateProperties
     * @namespace           sugar.js.dom
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
    function getTranslateProperties($elm, unit) {
        if (unit === void 0) { unit = 'px'; }
        if (!window.getComputedStyle)
            return;
        var idx, mat;
        var style = getComputedStyle($elm);
        var transform = style.transform ||
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
            var val = mat[1]
                .replace('matrix3d(', '')
                .replace(')', '')
                .split(',')
                .map(function (v) { return v.trim(); });
            return {
                x: convert_1.default(val[12], unit, $elm),
                y: convert_1.default(val[13], unit, $elm),
                z: convert_1.default(val[14], unit, $elm)
            };
        }
        mat = transform.match(/^matrix\((.+)\)$/);
        if (mat) {
            // preparing the value
            var val = mat[1]
                .replace('matrix(', '')
                .replace(')', '')
                .split(',')
                .map(function (v) { return v.trim(); });
            return {
                x: convert_1.default(val[4], unit, $elm),
                y: convert_1.default(val[5], unit, $elm),
                z: convert_1.default(val[6], unit, $elm) || 0
            };
        }
        mat = transform.match(/^translate3d\((.+)\)$/);
        if (mat) {
            // preparing the value
            var val = mat[1]
                .replace('translate3d(', '')
                .replace(')', '')
                .split(',')
                .map(function (v) { return v.trim(); });
            return {
                x: convert_1.default(val[0], unit, $elm),
                y: convert_1.default(val[1], unit, $elm),
                z: convert_1.default(val[2], unit, $elm) || 0
            };
        }
        mat = transform.match(/^translate\((.+)\)$/);
        if (mat) {
            // preparing the value
            var val = mat[1]
                .replace('translate(', '')
                .replace(')', '')
                .split(',')
                .map(function (v) { return v.trim(); });
            return {
                x: convert_1.default(val[0], unit, $elm),
                y: convert_1.default(val[1], unit, $elm),
                z: 0
            };
        }
        mat = transform.match(/translate[XYZ]\((.+)\)/);
        if (mat) {
            // preparing the value
            var xReg = /translateX\((\S+)\)/;
            var yReg = /translateY\((\S+)\)/;
            var zReg = /translateZ\((\S+)\)/;
            var xRegRes = mat[0].match(xReg);
            var yRegRes = mat[0].match(yReg);
            var zRegRes = mat[0].match(zReg);
            var xRes = 0;
            if (xRegRes[1]) {
                xRes = convert_1.default(xRegRes[1], unit, $elm);
            }
            var yRes = 0;
            if (yRegRes[1]) {
                yRes = convert_1.default(yRegRes[1], unit, $elm);
            }
            var zRes = 0;
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
    return getTranslateProperties;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VHJhbnNsYXRlUHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFRyYW5zbGF0ZVByb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7SUFFZCw0REFBd0M7SUFFeEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJCRztJQUNILFNBQVMsc0JBQXNCLENBQUMsSUFBSSxFQUFFLElBQVc7UUFBWCxxQkFBQSxFQUFBLFdBQVc7UUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0I7WUFBRSxPQUFPO1FBQ3JDLElBQUksR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUNiLElBQU0sS0FBSyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLElBQU0sU0FBUyxHQUNiLEtBQUssQ0FBQyxTQUFTO1lBQ2YsS0FBSyxDQUFDLGVBQWU7WUFDckIsS0FBSyxDQUFDLFlBQVk7WUFDbEIsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUztZQUNaLE9BQU87Z0JBQ0wsQ0FBQyxFQUFFLENBQUM7Z0JBQ0osQ0FBQyxFQUFFLENBQUM7Z0JBQ0osQ0FBQyxFQUFFLENBQUM7YUFDTCxDQUFDO1FBQ0osR0FBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUM1QyxJQUFJLEdBQUcsRUFBRTtZQUNQLHNCQUFzQjtZQUN0QixJQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNmLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO2lCQUN4QixPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztpQkFDaEIsS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDVixHQUFHLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQVIsQ0FBUSxDQUFDLENBQUM7WUFDeEIsT0FBTztn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