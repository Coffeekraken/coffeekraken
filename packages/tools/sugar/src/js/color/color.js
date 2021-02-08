// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SColor"], factory);
    }
})(function (require, exports) {
    "use strict";
    var SColor_1 = __importDefault(require("./SColor"));
    /**
     * @name                color
     * @namespace           sugar.js.color
     * @type                Function
     *
     * Simple wrapper to create an SColor instance quickly
     *
     * @param         {Mixed}             color           A color in any format like rgba Object, hsl Object, hsv Object, hex String, rgba String, hsl String or hsv String
     * @return        {SColor}                            An SColor instance representing your color
     *
     * @example         js
     * import color from '@coffeekraken/sugar/js/color/color';
     * const myColor = color('#ff00ff');
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function color(color) {
        return new SColor_1.default(color);
    }
    return color;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7SUFFVixvREFBZ0M7SUFFaEM7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsU0FBUyxLQUFLLENBQUMsS0FBSztRQUNsQixPQUFPLElBQUksZ0JBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsT0FBUyxLQUFLLENBQUMifQ==