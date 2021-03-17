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
        define(["require", "exports", "../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    /**
     * @name          trimLines
     * @namespace     sugar.js.string
     * @type          Function
     * @stable
     *
     * This function take a string and trim each lines
     *
     * @param       {String}        string        The string to trim lines of
     * @param       {Object}        [settings={}]     An object settings. Here's the object properties:
     * - leftPadding (0) {Number}: Specify a left padding to set. 1 padding represent 1 space character
     * - rightPadding (0) {Number}: Specify a right padding to set.
     * - keepEmptyLines (true) {Boolean}: Specify if you want to keep empty lines or not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import trimLines from '@coffeekraken/sugar/js/string/trimLines';
     * trimLines(`my cool lines
     *      that have some lines to trim
     * and some not...`);
     * // my cool lines
     * // that have some lines to trim
     * // and some not...
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function trimLines(string, settings) {
        if (settings === void 0) { settings = {}; }
        settings = deepMerge_1.default({
            leftPadding: 0,
            rightPadding: 0,
            keepEmptyLines: true
        }, settings);
        string = string
            .split('\n')
            .map(function (line) {
            line = line.trim();
            if (!settings.keepEmptyLines) {
                if (line === '')
                    return -1;
            }
            if (settings.leftPadding)
                line = "" + ' '.repeat(settings.leftPadding) + line;
            if (settings.rightPadding)
                line = "" + line + ' '.repeat(settings.rightPadding);
            return line;
        })
            .filter(function (line) { return line !== -1; })
            .join('\n');
        return string;
    }
    exports.default = trimLines;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpbUxpbmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc2hhcmVkL3N0cmluZy90cmltTGluZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztJQUVWLGtFQUE4QztJQUU5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E2Qkc7SUFDSCxTQUFTLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBYTtRQUFiLHlCQUFBLEVBQUEsYUFBYTtRQUN0QyxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7WUFDRSxXQUFXLEVBQUUsQ0FBQztZQUNkLFlBQVksRUFBRSxDQUFDO1lBQ2YsY0FBYyxFQUFFLElBQUk7U0FDckIsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLE1BQU0sR0FBRyxNQUFNO2FBQ1osS0FBSyxDQUFDLElBQUksQ0FBQzthQUNYLEdBQUcsQ0FBQyxVQUFDLElBQUk7WUFDUixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFO2dCQUM1QixJQUFJLElBQUksS0FBSyxFQUFFO29CQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDNUI7WUFDRCxJQUFJLFFBQVEsQ0FBQyxXQUFXO2dCQUN0QixJQUFJLEdBQUcsS0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFNLENBQUM7WUFDdEQsSUFBSSxRQUFRLENBQUMsWUFBWTtnQkFDdkIsSUFBSSxHQUFHLEtBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBRyxDQUFDO1lBQ3ZELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDO2FBQ0QsTUFBTSxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFYLENBQVcsQ0FBQzthQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFZCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=