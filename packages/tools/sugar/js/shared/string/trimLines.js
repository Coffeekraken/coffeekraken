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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpbUxpbmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC9zdHJpbmcvdHJpbUxpbmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFVixrRUFBOEM7SUFFOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNkJHO0lBQ0gsU0FBUyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQWE7UUFBYix5QkFBQSxFQUFBLGFBQWE7UUFDdEMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsV0FBVyxFQUFFLENBQUM7WUFDZCxZQUFZLEVBQUUsQ0FBQztZQUNmLGNBQWMsRUFBRSxJQUFJO1NBQ3JCLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRixNQUFNLEdBQUcsTUFBTTthQUNaLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDWCxHQUFHLENBQUMsVUFBQyxJQUFJO1lBQ1IsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRTtnQkFDNUIsSUFBSSxJQUFJLEtBQUssRUFBRTtvQkFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQzVCO1lBQ0QsSUFBSSxRQUFRLENBQUMsV0FBVztnQkFDdEIsSUFBSSxHQUFHLEtBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBTSxDQUFDO1lBQ3RELElBQUksUUFBUSxDQUFDLFlBQVk7Z0JBQ3ZCLElBQUksR0FBRyxLQUFHLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUcsQ0FBQztZQUN2RCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQzthQUNELE1BQU0sQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLElBQUksS0FBSyxDQUFDLENBQUMsRUFBWCxDQUFXLENBQUM7YUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNELGtCQUFlLFNBQVMsQ0FBQyJ9