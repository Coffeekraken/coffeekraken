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
        define(["require", "exports", "../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const deepMerge_1 = __importDefault(require("../object/deepMerge"));
    /**
     * @name          trimLines
     * @namespace     sugar.js.string
     * @type          Function
     * @stable
     *
     * This function take a string and trim each lines
     *
     * @param       {String}        string        The string to trim lines of
     * @param       {Object}        [settings={}]     An object settings. Here's the object properties:
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
    function trimLines(string, settings = {}) {
        settings = deepMerge_1.default({
            leftPadding: 0,
            rightPadding: 0,
            keepEmptyLines: true
        }, settings);
        string = string
            .split('\n')
            .map((line) => {
            line = line.trim();
            if (!settings.keepEmptyLines) {
                if (line === '')
                    return -1;
            }
            if (settings.leftPadding)
                line = `${' '.repeat(settings.leftPadding)}${line}`;
            if (settings.rightPadding)
                line = `${line}${' '.repeat(settings.rightPadding)}`;
            return line;
        })
            .filter((line) => line !== -1)
            .join('\n');
        return string;
    }
    exports.default = trimLines;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpbUxpbmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJpbUxpbmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLG9FQUE4QztJQUU5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E2Qkc7SUFDSCxTQUFTLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDdEMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsV0FBVyxFQUFFLENBQUM7WUFDZCxZQUFZLEVBQUUsQ0FBQztZQUNmLGNBQWMsRUFBRSxJQUFJO1NBQ3JCLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRixNQUFNLEdBQUcsTUFBTTthQUNaLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDWCxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNaLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUU7Z0JBQzVCLElBQUksSUFBSSxLQUFLLEVBQUU7b0JBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUM1QjtZQUNELElBQUksUUFBUSxDQUFDLFdBQVc7Z0JBQ3RCLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO1lBQ3RELElBQUksUUFBUSxDQUFDLFlBQVk7Z0JBQ3ZCLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDO1lBQ3ZELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDO2FBQ0QsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNELGtCQUFlLFNBQVMsQ0FBQyJ9