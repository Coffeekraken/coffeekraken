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
        define(["require", "exports", "../../object/deepMerge", "../../docblock/SDocblock"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var deepMerge_1 = __importDefault(require("../../object/deepMerge"));
    var SDocblock_1 = __importDefault(require("../../docblock/SDocblock"));
    /**
     * @name            htmlFromDocblocks
     * @namespace       sugar.js.convert
     * @type            Function
     * @status              wip
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
    exports.default = htmlFromDocblocks;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbEZyb21Eb2NibG9ja3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJodG1sRnJvbURvY2Jsb2Nrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7O0lBR1YscUVBQWlEO0lBQ2pELHVFQUFtRDtJQUVuRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EwQkc7SUFDSCxTQUFTLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxRQUFhO1FBQWIseUJBQUEsRUFBQSxhQUFhO1FBQ25ELFFBQVEsR0FBRyxtQkFBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNyQyxJQUFNLFNBQVMsR0FBRyxJQUFJLG1CQUFXLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3pELE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0Qsa0JBQWUsaUJBQWlCLENBQUMifQ==