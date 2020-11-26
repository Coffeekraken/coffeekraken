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
