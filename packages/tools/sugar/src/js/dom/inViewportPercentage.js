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
        define(["require", "exports", "./isVisible"], factory);
    }
})(function (require, exports) {
    "use strict";
    var isVisible_1 = __importDefault(require("./isVisible"));
    /**
     * @name      inViewportPercentage
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Return how many percent the passed element is visible in the viewport
     *
     * @param 		{HTMLElement} 				elm  		The element to get the in viewport percentage from
     * @return 		{Number} 								The percentage visible in the viewport
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example  	js
     * import inViewportPercentage from '@coffeekraken/sugar/js/dom/inViewportPercentage'
     * const percentage = inViewportPercentage(myCoolHTMLElement);
     * // 20
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function inViewportPercentage(elm) {
        // if not visible at all
        if (!isVisible_1.default(elm))
            return 0;
        // calculate the visible percentage
        var bounding = elm.getBoundingClientRect();
        var percentageWidth = 100, percentageHeight = 100;
        // percentageHeight
        if (bounding.top >= 0 && bounding.bottom <= window.innerHeight) {
            percentageHeight = 100;
        }
        else {
            var elmHeight = bounding.bottom - bounding.top;
            if (bounding.top < 0) {
                percentageHeight -= (100 / elmHeight) * (bounding.top * -1);
            }
            if (bounding.bottom > window.innerHeight) {
                percentageHeight -=
                    (100 / elmHeight) * (bounding.bottom - window.innerHeight);
            }
        }
        percentageHeight = Math.round(percentageHeight);
        if (percentageHeight < 0)
            percentageHeight = 0;
        if (percentageHeight > 100)
            percentageHeight = 100;
        // percentageWidth
        if (bounding.left >= 0 && bounding.right <= window.innerWidth) {
            percentageWidth = 100;
        }
        else {
            var elmWidth = bounding.right - bounding.left;
            if (bounding.left < 0) {
                percentageWidth -= (100 / elmWidth) * (bounding.left * -1);
            }
            if (bounding.right > window.innerWidth) {
                percentageWidth -=
                    (100 / elmWidth) * (bounding.right - window.innerWidth);
            }
        }
        percentageWidth = Math.round(percentageWidth);
        if (percentageWidth < 0)
            percentageWidth = 0;
        if (percentageWidth > 100)
            percentageWidth = 100;
        // calculate the percentage in total
        return Math.round((100 / (100 * 100)) * (percentageWidth * percentageHeight));
    }
    return inViewportPercentage;
});
