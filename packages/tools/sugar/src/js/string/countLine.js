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
        define(["require", "exports", "../object/deepMerge", "strip-ansi"], factory);
    }
})(function (require, exports) {
    "use strict";
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var strip_ansi_1 = __importDefault(require("strip-ansi"));
    /**
     * @name                                  countLine
     * @namespace           sugar.js.string
     * @type                                  Function
     * @stable
     *
     * Count how many characters their is in the passed line.
     * This function will exclude the characters like the html tags like <red>, etc...
     *
     * @param           {String}              line              The line to count
     * @param           {Object}              [count={}]        Specify what you want to count outside of the normal characters of yourse. Here's the list of available options:
     * - htmlTags (false) {Boolean}: Specify if you want to count the html tags or not
     * - terminalSpecialChars (false) {Boolean}: Specify if you want to count the terminal specials chars like "\u001b[30m", etc...
     * - newLineChars (false) {Boolean}: Specify if you want to count the new line special char "\n" or not
     * @return          {Number}                                How many characters their is in the line
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import countLine from '@coffeekraken/sugar/js/string/countLine';
     * countLine('Hello <red>World</red>'); // 11
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function countLine(line, count) {
        if (count === void 0) { count = {}; }
        count = deepMerge_1.default({
            htmlTags: false,
            terminalSpecialChars: false,
            newLineChars: false
        }, count);
        var newLine = line;
        if (count.terminalSpecialChars === false) {
            newLine = strip_ansi_1.default(newLine);
        }
        if (count.htmlTags === false) {
            newLine = newLine.replace(/<\/?[a-zA-Z0-9]+\s?\/?>/g, '');
        }
        if (count.newLineChars === false) {
            newLine = newLine.replace('\n', '');
        }
        return newLine.length;
    }
    return countLine;
});
//# sourceMappingURL=countLine.js.map