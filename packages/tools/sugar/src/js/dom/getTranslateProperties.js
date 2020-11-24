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
