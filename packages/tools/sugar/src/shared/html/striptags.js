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
        define(["require", "exports", "striptags"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const striptags_1 = __importDefault(require("striptags"));
    /**
     * @name        striptags
     * @namespace            js.html
     * @type      Function
     * @stable
     *
     * Strip tags of an html string.
     * This is a simple wrapper of the nice "striptags" package that you can find here: https://www.npmjs.com/package/striptags
     *
     * @param    {String}    html    The html string to process
     * @param    {String}    allowableTags    The tags that are allowed like <h1><h2>...
     * @param     {String}    tagReplacement    A string with which you want to replace the tags
     * @return    {String}    The processed string without tags
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import striptags from '@coffeekraken/sugar/js/string/striptags'
     * striptags('<p><span>Hello</span> world</p>', '<span>') // <span>Hello</span> world
     *
     * @see       https://www.npmjs.com/package/striptags
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function striptags(html, allowedTags, tagReplacement) {
        return striptags_1.default(html, allowedTags, tagReplacement);
    }
    exports.default = striptags;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXB0YWdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RyaXB0YWdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDBEQUFvQztJQUVwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNILFNBQVMsU0FBUyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsY0FBYztRQUNsRCxPQUFPLG1CQUFXLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=