// @shared
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
        define(["require", "exports", "../parseHtml", "chalk"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var parseHtml_1 = __importDefault(require("../parseHtml"));
    var chalk_1 = __importDefault(require("chalk"));
    chalk_1.default.level = 3;
    /**
     * @name        tagsMap
     * @namespace   sugar.js.console.html
     * @type        Object
     *
     * Store the tag->function map used in ```parseHtml``` function for example
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var tagsMap = {
        black: function (tag, content) { return chalk_1.default.black(content); },
        red: function (tag, content) { return chalk_1.default.red(content); },
        green: function (tag, content) { return chalk_1.default.green(content); },
        yellow: function (tag, content) { return chalk_1.default.yellow(content); },
        blue: function (tag, content) { return chalk_1.default.blue(content); },
        magenta: function (tag, content) { return chalk_1.default.magenta(content); },
        cyan: function (tag, content) { return chalk_1.default.cyan(content); },
        white: function (tag, content) { return chalk_1.default.white(content); },
        grey: function (tag, content) { return chalk_1.default.grey(content); },
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
        h1: function (tag, content) {
            return chalk_1.default.underline(chalk_1.default.bold(content)) + '\n\n';
        },
        h2: function (tag, content) {
            return chalk_1.default.bold(content) + '\n';
        },
        iWarn: function (tag, content) { return parseHtml_1.default('<yellow>⚠</yellow>'); },
        iCheck: function (tag, content) { return parseHtml_1.default("<green>\u2713</green>"); },
        iSuccess: function (tag, content) { return parseHtml_1.default("<green>\u2713</green>"); },
        iError: function (tag, content) { return parseHtml_1.default("<red>\u2716</red>"); },
        iCross: function (tag, content) { return parseHtml_1.default("<red>\u2716</red>"); },
        iClose: function (tag, content) { return "\u2716"; },
        iStart: function (tag, content) { return parseHtml_1.default("<green>\u2023</green>"); },
        date: function (tag, content) {
            return new Date().getDate().toString().padStart('0', 2) +
                '-' +
                (new Date().getMonth() + 1).toString().padStart('0', 2) +
                '-' +
                new Date().getFullYear().toString().padStart('0', 2);
        },
        time: function (tag, content) {
            return new Date().getHours().toString().padStart('0', 2) +
                ':' +
                new Date().getMinutes().toString().padStart('0', 2) +
                ':' +
                new Date().getMinutes().toString().padStart('0', 2);
        },
        day: function (tag, content) { return new Date().getDate().toString().padStart('0', 2); },
        days: function (tag, content) { return new Date().getDate().toString().padStart('0', 2); },
        month: function (tag, content) { return new Date().getMonth().toString().padStart('0', 2); },
        months: function (tag, content) { return new Date().getMonth().toString().padStart('0', 2); },
        year: function (tag, content) { return new Date().getFullYear().toString().padStart('0', 2); },
        years: function (tag, content) { return new Date().getFullYear().toString().padStart('0', 2); },
        hour: function (tag, content) { return new Date().getHours().toString().padStart('0', 2); },
        hours: function (tag, content) { return new Date().getHours().toString().padStart('0', 2); },
        minute: function (tag, content) { return new Date().getMinutes().toString().padStart('0', 2); },
        minutes: function (tag, content) {
            return new Date().getMinutes().toString().padStart('0', 2);
        },
        second: function (tag, content) { return new Date().getSeconds().toString().padStart('0', 2); },
        seconds: function (tag, content) {
            return new Date().getSeconds().toString().padStart('0', 2);
        },
        br: function (tag, content) { return '\n'; }
    };
    exports.default = tagsMap;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnc01hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhZ3NNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTtBQUNWLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDJEQUF1QztJQUN2QyxnREFBNEI7SUFDNUIsZUFBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFFbEI7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBTSxPQUFPLEdBQUc7UUFDZCxLQUFLLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTyxJQUFLLE9BQUEsZUFBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBdEIsQ0FBc0I7UUFDL0MsR0FBRyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLGVBQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQXBCLENBQW9CO1FBQzNDLEtBQUssRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxlQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUF0QixDQUFzQjtRQUMvQyxNQUFNLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTyxJQUFLLE9BQUEsZUFBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBdkIsQ0FBdUI7UUFDakQsSUFBSSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLGVBQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQXJCLENBQXFCO1FBQzdDLE9BQU8sRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxlQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUF4QixDQUF3QjtRQUNuRCxJQUFJLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTyxJQUFLLE9BQUEsZUFBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBckIsQ0FBcUI7UUFDN0MsS0FBSyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLGVBQU8sQ0FB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LEVBQUUsQ0FBQyxDQUFDO1FBSm5ELENBSW1EO1FBQ3JELEdBQUcsRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQWhELENBQWdEO1FBQ3ZFLElBQUksRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQWhELENBQWdEO1FBQ3hFLEtBQUssRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxJQUFJLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQWpELENBQWlEO1FBQzFFLE1BQU0sRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxJQUFJLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQWpELENBQWlEO1FBQzNFLElBQUksRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQXBELENBQW9EO1FBQzVFLEtBQUssRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQXBELENBQW9EO1FBQzdFLElBQUksRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxJQUFJLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQWpELENBQWlEO1FBQ3pFLEtBQUssRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxJQUFJLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQWpELENBQWlEO1FBQzFFLE1BQU0sRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxJQUFJLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQW5ELENBQW1EO1FBQzdFLE9BQU8sRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPO1lBQ3BCLE9BQUEsSUFBSSxJQUFJLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUFuRCxDQUFtRDtRQUNyRCxNQUFNLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTyxJQUFLLE9BQUEsSUFBSSxJQUFJLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFuRCxDQUFtRDtRQUM3RSxPQUFPLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTztZQUNwQixPQUFBLElBQUksSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFBbkQsQ0FBbUQ7UUFFckQsRUFBRSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLElBQUksRUFBSixDQUFJO0tBQzNCLENBQUM7SUFDRixrQkFBZSxPQUFPLENBQUMifQ==