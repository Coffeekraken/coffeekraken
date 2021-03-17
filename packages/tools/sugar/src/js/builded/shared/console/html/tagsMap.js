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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnc01hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NoYXJlZC9jb25zb2xlL2h0bWwvdGFnc01hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVO0FBQ1YsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsMkRBQXVDO0lBQ3ZDLGdEQUE0QjtJQUM1QixlQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUVsQjs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFNLE9BQU8sR0FBRztRQUNkLEtBQUssRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxlQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUF0QixDQUFzQjtRQUMvQyxHQUFHLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTyxJQUFLLE9BQUEsZUFBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBcEIsQ0FBb0I7UUFDM0MsS0FBSyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLGVBQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQXRCLENBQXNCO1FBQy9DLE1BQU0sRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxlQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUF2QixDQUF1QjtRQUNqRCxJQUFJLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTyxJQUFLLE9BQUEsZUFBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBckIsQ0FBcUI7UUFDN0MsT0FBTyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLGVBQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQXhCLENBQXdCO1FBQ25ELElBQUksRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxlQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFyQixDQUFxQjtRQUM3QyxLQUFLLEVBQUUsVUFB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LENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFKbkQsQ0FJbUQ7UUFDckQsR0FBRyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBaEQsQ0FBZ0Q7UUFDdkUsSUFBSSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBaEQsQ0FBZ0Q7UUFDeEUsS0FBSyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLElBQUksSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBakQsQ0FBaUQ7UUFDMUUsTUFBTSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLElBQUksSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBakQsQ0FBaUQ7UUFDM0UsSUFBSSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBcEQsQ0FBb0Q7UUFDNUUsS0FBSyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBcEQsQ0FBb0Q7UUFDN0UsSUFBSSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLElBQUksSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBakQsQ0FBaUQ7UUFDekUsS0FBSyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLElBQUksSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBakQsQ0FBaUQ7UUFDMUUsTUFBTSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLElBQUksSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBbkQsQ0FBbUQ7UUFDN0UsT0FBTyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU87WUFDcEIsT0FBQSxJQUFJLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQW5ELENBQW1EO1FBQ3JELE1BQU0sRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxJQUFJLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQW5ELENBQW1EO1FBQzdFLE9BQU8sRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPO1lBQ3BCLE9BQUEsSUFBSSxJQUFJLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUFuRCxDQUFtRDtRQUVyRCxFQUFFLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTyxJQUFLLE9BQUEsSUFBSSxFQUFKLENBQUk7S0FDM0IsQ0FBQztJQUNGLGtCQUFlLE9BQU8sQ0FBQyJ9