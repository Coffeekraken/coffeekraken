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
        define(["require", "exports", "chalk"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const chalk_1 = __importDefault(require("chalk"));
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
    const tagsMap = {
        black: (tag, content) => chalk_1.default.black(content),
        red: (tag, content) => chalk_1.default.red(content),
        green: (tag, content) => chalk_1.default.green(content),
        yellow: (tag, content) => chalk_1.default.yellow(content),
        blue: (tag, content) => chalk_1.default.blue(content),
        magenta: (tag, content) => chalk_1.default.magenta(content),
        cyan: (tag, content) => chalk_1.default.cyan(content),
        white: (tag, content) => chalk_1.default.white(content),
        grey: (tag, content) => chalk_1.default.grey(content),
        bgBlack: (tag, content) => chalk_1.default.bgBlack(content),
        bgRed: (tag, content) => chalk_1.default.bgRed(content),
        bgGreen: (tag, content) => chalk_1.default.bgGreen(content),
        bgYellow: (tag, content) => chalk_1.default.bgYellow(content),
        bgBlue: (tag, content) => chalk_1.default.bgBlue(content),
        bgMagenta: (tag, content) => chalk_1.default.bgMagenta(content),
        bgCyan: (tag, content) => chalk_1.default.bgCyan(content),
        bgWhite: (tag, content) => chalk_1.default.bgWhite(content),
        bold: (tag, content) => chalk_1.default.bold(content),
        dim: (tag, content) => chalk_1.default.dim(content),
        italic: (tag, content) => chalk_1.default.italic(content),
        underline: (tag, content) => chalk_1.default.underline(content),
        strike: (tag, content) => chalk_1.default.strike(content),
        h1: (tag, content) => {
            return chalk_1.default.underline(chalk_1.default.bold(content)) + '\n\n';
        },
        h2: (tag, content) => {
            return chalk_1.default.bold(content) + '\n';
        },
        // iWarn: (tag, content) => __parseHtml('<yellow>⚠</yellow>'),
        // iCheck: (tag, content) => __parseHtml(`<green>✓</green>`),
        // iSuccess: (tag, content) => __parseHtml(`<green>✓</green>`),
        // iError: (tag, content) => __parseHtml(`<red>✖</red>`),
        // iCross: (tag, content) => __parseHtml(`<red>✖</red>`),
        // iClose: (tag, content) => `✖`,
        // iStart: (tag, content) => __parseHtml(`<green>‣</green>`),
        date: (tag, content) => new Date().getDate().toString().padStart('0', 2) +
            '-' +
            (new Date().getMonth() + 1).toString().padStart('0', 2) +
            '-' +
            new Date().getFullYear().toString().padStart('0', 2),
        time: (tag, content) => new Date().getHours().toString().padStart('0', 2) +
            ':' +
            new Date().getMinutes().toString().padStart('0', 2) +
            ':' +
            new Date().getMinutes().toString().padStart('0', 2),
        day: (tag, content) => new Date().getDate().toString().padStart('0', 2),
        days: (tag, content) => new Date().getDate().toString().padStart('0', 2),
        month: (tag, content) => new Date().getMonth().toString().padStart('0', 2),
        months: (tag, content) => new Date().getMonth().toString().padStart('0', 2),
        year: (tag, content) => new Date().getFullYear().toString().padStart('0', 2),
        years: (tag, content) => new Date().getFullYear().toString().padStart('0', 2),
        hour: (tag, content) => new Date().getHours().toString().padStart('0', 2),
        hours: (tag, content) => new Date().getHours().toString().padStart('0', 2),
        minute: (tag, content) => new Date().getMinutes().toString().padStart('0', 2),
        minutes: (tag, content) => new Date().getMinutes().toString().padStart('0', 2),
        second: (tag, content) => new Date().getSeconds().toString().padStart('0', 2),
        seconds: (tag, content) => new Date().getSeconds().toString().padStart('0', 2),
        br: (tag, content) => '\n'
    };
    exports.default = tagsMap;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnc01hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhZ3NNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsa0RBQTRCO0lBQzVCLGVBQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBRWxCOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sT0FBTyxHQUFHO1FBQ2QsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDL0MsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDM0MsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDL0MsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDakQsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0MsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDbkQsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0MsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDL0MsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFN0MsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDbkQsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDL0MsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDbkQsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDckQsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDakQsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7UUFDdkQsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDakQsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFFbkQsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0MsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDM0MsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFB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