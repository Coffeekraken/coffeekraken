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
    Object.defineProperty(exports, "__esModule", { value: true });
    var deepMerge_1 = __importDefault(require("../../object/deepMerge"));
    var marked_1 = __importDefault(require("marked"));
    /**
     * @name            htmlFromMarkdown
     * @namespace       sugar.js.convert
     * @type            Function
     * @status              wip
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
    exports.default = htmlFromMarkdown;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbEZyb21NYXJrZG93bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImh0bWxGcm9tTWFya2Rvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztJQUdWLHFFQUFpRDtJQUNqRCxrREFBOEI7SUFFOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJCRztJQUNILFNBQVMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFFBQWE7UUFBYix5QkFBQSxFQUFBLGFBQWE7UUFDbEQsUUFBUSxHQUFHLG1CQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLGdCQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sZ0JBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQ0Qsa0JBQWUsZ0JBQWdCLENBQUMifQ==