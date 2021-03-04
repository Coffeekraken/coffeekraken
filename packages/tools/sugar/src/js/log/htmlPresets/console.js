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
        define(["require", "exports", "../../html/replaceTags", "chalk"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var replaceTags_1 = __importDefault(require("../../html/replaceTags"));
    var chalk_1 = __importDefault(require("chalk"));
    chalk_1.default.level = 3;
    /**
     * @name                              console
     * @namespace           sugar.js.log.htmlPresets
     * @type                              Function
     * @status              wip
     *
     * Replace all the "log" html tags like "<red>", "<bold>", etc... with the corresponding syntax for the terminal
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @param                   {String}                      text                        The text to process
     * @return                  {String}                                                  The processed text ready for the terminal
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function consoleFn(text) {
        return replaceTags_1.default(text, {
            black: function (tag, content) { return chalk_1.default.black(content); },
            red: function (tag, content) { return chalk_1.default.red(content); },
            green: function (tag, content) { return chalk_1.default.green(content); },
            yellow: function (tag, content) { return chalk_1.default.yellow(content); },
            blue: function (tag, content) { return chalk_1.default.blue(content); },
            magenta: function (tag, content) { return chalk_1.default.magenta(content); },
            cyan: function (tag, content) { return chalk_1.default.cyan(content); },
            white: function (tag, content) { return chalk_1.default.white(content); },
            bgBlack: function (tag, content) { return chalk_1.default.bgBlack(content); },
            bgRed: function (tag, content) { return chalk_1.default.bgRed(content); },
            bgGreen: function (tag, content) { return chalk_1.default.bgGreen(content); },
            bgYellow: function (tag, content) { return chalk_1.default.bgYellow(content); },
            bgBlue: function (tag, content) { return chalk_1.default.bgBlue(content); },
            bgMagenta: function (tag, content) { return chalk_1.default.bgMagenta(content); },
            bgCyan: function (tag, content) { return chalk_1.default.bgCyan(content); },
            bgWhite: function (tag, content) { return chalk_1.default.bgWhite(content); },
            bold: function (tag, content) { return chalk_1.default.bold(content); },
            dim: function (tag, content) { return chalk_1.default.dim(content); },
            italic: function (tag, content) { return chalk_1.default.italic(content); },
            underline: function (tag, content) { return chalk_1.default.underline(content); },
            strike: function (tag, content) { return chalk_1.default.strike(content); },
            br: function (tag, content) { return '\n'; }
        });
    }
    exports.default = consoleFn;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnNvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztJQUVWLHVFQUFtRDtJQUNuRCxnREFBNEI7SUFDNUIsZUFBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFFbEI7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0gsU0FBUyxTQUFTLENBQUMsSUFBSTtRQUNyQixPQUFPLHFCQUFhLENBQUMsSUFBSSxFQUFFO1lBQ3pCLEtBQUssRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxlQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUF0QixDQUFzQjtZQUMvQyxHQUFHLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTyxJQUFLLE9BQUEsZUFBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBcEIsQ0FBb0I7WUFDM0MsS0FBSyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLGVBQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQXRCLENBQXNCO1lBQy9DLE1BQU0sRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxlQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUF2QixDQUF1QjtZQUNqRCxJQUFJLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTyxJQUFLLE9BQUEsZUFBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBckIsQ0FBcUI7WUFDN0MsT0FBTyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLGVBQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQXhCLENBQXdCO1lBQ25ELElBQUksRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxlQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFyQixDQUFxQjtZQUM3QyxLQUFLLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTyxJQUFLLE9BQUEsZUFBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBdEIsQ0FBc0I7WUFFL0MsT0FBTyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLGVBQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQXhCLENBQXdCO1lBQ25ELEtBQUssRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxlQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUF0QixDQUFzQjtZQUMvQyxPQUFPLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTyxJQUFLLE9BQUEsZUFBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBeEIsQ0FBd0I7WUFDbkQsUUFBUSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLGVBQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQXpCLENBQXlCO1lBQ3JELE1BQU0sRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxlQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUF2QixDQUF1QjtZQUNqRCxTQUFTLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTyxJQUFLLE9BQUEsZUFBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBMUIsQ0FBMEI7WUFDdkQsTUFBTSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLGVBQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQXZCLENBQXVCO1lBQ2pELE9BQU8sRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxlQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUF4QixDQUF3QjtZQUVuRCxJQUFJLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTyxJQUFLLE9BQUEsZUFBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBckIsQ0FBcUI7WUFDN0MsR0FBRyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLGVBQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQXBCLENBQW9CO1lBQzNDLE1BQU0sRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxlQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUF2QixDQUF1QjtZQUNqRCxTQUFTLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTyxJQUFLLE9BQUEsZUFBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBMUIsQ0FBMEI7WUFDdkQsTUFBTSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLGVBQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQXZCLENBQXVCO1lBRWpELEVBQUUsRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxJQUFJLEVBQUosQ0FBSTtTQUMzQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=