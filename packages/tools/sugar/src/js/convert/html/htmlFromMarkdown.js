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
        define(["require", "exports", "../../object/deepMerge", "marked"], factory);
    }
})(function (require, exports) {
    "use strict";
    var deepMerge_1 = __importDefault(require("../../object/deepMerge"));
    var marked_1 = __importDefault(require("marked"));
    /**
     * @name            htmlFromMarkdown
     * @namespace       sugar.js.convert
     * @type            Function
     * @wip
     *
     * Take a markdown string as input and convert it to HTML.
     *
     * @param       {String}          inputString         The input string to convert to HTML
     * @param       {Object}          [settings={}]       An object of settings to configure your conversion process. All the ```marked``` settings are supported
     * @return      {String}                              The HTML converted result
     *
     * @todo        interface
     * @todo        doc
     *
     * @example       js
     * import htmlFromMarkdown from '@coffeekraken/sugar/js/convert/html/htmlFromMarkdown';
     * htmlFromMarkdown(`
     *  # Hello world
     *  How are you?
     * `);
     * // <h1>Hello world</h1>
     * // <p>How are you</p>
     *
     * @since       2.0.0
     * @see       https://marked.js.org/#/README.md
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function htmlFromMarkdown(inputString, settings) {
        if (settings === void 0) { settings = {}; }
        settings = deepMerge_1.default({}, settings);
        marked_1.default.setOptions(settings);
        return marked_1.default(inputString);
    }
    return htmlFromMarkdown;
});
