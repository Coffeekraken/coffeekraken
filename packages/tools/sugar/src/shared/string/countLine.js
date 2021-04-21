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
        define(["require", "exports", "../object/deepMerge", "strip-ansi"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const deepMerge_1 = __importDefault(require("../object/deepMerge"));
    const strip_ansi_1 = __importDefault(require("strip-ansi"));
    /**
     * @name                                  countLine
     * @namespace            js.string
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
     * @return          {Number}                                How many characters their is in the line
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
    function countLine(line, count = {}) {
        count = deepMerge_1.default({
            htmlTags: false,
            terminalSpecialChars: false,
            newLineChars: false
        }, count);
        let newLine = line;
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
    exports.default = countLine;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRMaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY291bnRMaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLG9FQUE4QztJQUM5Qyw0REFBcUM7SUFFckM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMEJHO0lBQ0gsU0FBUyxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxFQUFFO1FBQ2pDLEtBQUssR0FBRyxtQkFBVyxDQUNqQjtZQUNFLFFBQVEsRUFBRSxLQUFLO1lBQ2Ysb0JBQW9CLEVBQUUsS0FBSztZQUMzQixZQUFZLEVBQUUsS0FBSztTQUNwQixFQUNELEtBQUssQ0FDTixDQUFDO1FBRUYsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksS0FBSyxDQUFDLG9CQUFvQixLQUFLLEtBQUssRUFBRTtZQUN4QyxPQUFPLEdBQUcsb0JBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNoQztRQUNELElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxLQUFLLEVBQUU7WUFDNUIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDM0Q7UUFDRCxJQUFJLEtBQUssQ0FBQyxZQUFZLEtBQUssS0FBSyxFQUFFO1lBQ2hDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNyQztRQUVELE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUN4QixDQUFDO0lBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=