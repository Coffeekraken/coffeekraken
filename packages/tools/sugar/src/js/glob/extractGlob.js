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
    return extractGlob;
});
//# sourceMappingURL=extractGlob.js.map