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
        define(["require", "exports", "glob-parent"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var glob_parent_1 = __importDefault(require("glob-parent"));
    /**
     * @name                extractGlob
     * @namespace           sugar.js.glob
     * @type                Function
     * @stable
     *
     * This function simply return you the glob part of a passed string
     *
     * @param       {String}            string          The string from which to extract the glob part
     * @return      {String}                            The glob part of the passed string
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import extractGlob from '@coffeekraken/sugar/js/glob/extractGlob';
     * extractGlob('/coco/hello/*.js'); // => '*.js'
     *
     * @see             https://www.npmjs.com/package/glob-parent
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function extractGlob(string) {
        var parent = glob_parent_1.default(string);
        var final = string.replace(parent, '');
        if (final.slice(0, 1) === '/')
            final = final.slice(1);
        return final;
    }
    exports.default = extractGlob;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdEdsb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHRyYWN0R2xvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsNERBQXVDO0lBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bc0JHO0lBQ0gsU0FBUyxXQUFXLENBQUMsTUFBTTtRQUN6QixJQUFNLE1BQU0sR0FBRyxxQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRztZQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNELGtCQUFlLFdBQVcsQ0FBQyJ9