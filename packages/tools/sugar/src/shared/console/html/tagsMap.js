"use strict";
// @shared
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseHtml_1 = __importDefault(require("../parseHtml"));
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
    iWarn: (tag, content) => parseHtml_1.default('<yellow>⚠</yellow>'),
    iCheck: (tag, content) => parseHtml_1.default(`<green>✓</green>`),
    iSuccess: (tag, content) => parseHtml_1.default(`<green>✓</green>`),
    iError: (tag, content) => parseHtml_1.default(`<red>✖</red>`),
    iCross: (tag, content) => parseHtml_1.default(`<red>✖</red>`),
    iClose: (tag, content) => `✖`,
    iStart: (tag, content) => parseHtml_1.default(`<green>‣</green>`),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnc01hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhZ3NNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFVBQVU7QUFDVixjQUFjOzs7OztBQUVkLDZEQUF1QztBQUN2QyxrREFBNEI7QUFDNUIsZUFBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7QUFFbEI7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxPQUFPLEdBQUc7SUFDZCxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztJQUMvQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUMzQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztJQUMvQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNqRCxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUM3QyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUNuRCxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUM3QyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztJQUMvQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUU3QyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUNuRCxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztJQUMvQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUNuRCxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztJQUNyRCxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNqRCxTQUFTLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztJQUN2RCxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNqRCxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUVuRCxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUM3QyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxlQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUMzQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFF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QUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDeEUsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMxRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzNFLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDNUUsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUM3RSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3pFLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDMUUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUM3RSxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FDeEIsSUFBSSxJQUFJLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNyRCxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzdFLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUN4QixJQUFJLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBRXJELEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLElBQUk7Q0FDM0IsQ0FBQztBQUNGLGtCQUFlLE9BQU8sQ0FBQyJ9