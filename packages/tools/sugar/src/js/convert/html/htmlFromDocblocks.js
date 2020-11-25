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
        define(["require", "exports", "../../object/deepMerge", "../../docblock/SDocblock"], factory);
    }
})(function (require, exports) {
    "use strict";
    var deepMerge_1 = __importDefault(require("../../object/deepMerge"));
    var SDocblock_1 = __importDefault(require("../../docblock/SDocblock"));
    /**
     * @name            htmlFromDocblocks
     * @namespace       sugar.js.convert
     * @type            Function
     * @wip
     *
     * Take a markdown string as input and convert it to HTML.
     *
     * @param       {String}          inputString         The input string to convert to HTML
     * @param       {Object}          [settings={}]       An object of settings to configure your conversion process:
     * @return      {String}                              The HTML converted result
     *
     * @todo        interface
     * @todo        doc
     *
     * @example       js
     * import htmlFromDocblocks from '@coffeekraken/sugar/js/convert/html/htmlFromDocblocks';
     * htmlFromDocblocks(`
     *  \/\*\*
     *   * @name    Hello world
     *  \*\/
     * `);
     * // <h1>Hello world</h1>
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function htmlFromDocblocks(inputString, settings) {
        if (settings === void 0) { settings = {}; }
        settings = deepMerge_1.default({}, settings);
        var sDocblock = new SDocblock_1.default(inputString, settings);
        return sDocblock.toHtml(settings);
    }
    return htmlFromDocblocks;
});
