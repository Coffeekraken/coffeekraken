"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.tagsMap = void 0;
const replaceTags_1 = __importDefault(require("../html/replaceTags"));
const chalk_1 = __importDefault(require("chalk"));
chalk_1.default.level = 3;
/**
 * @name                                parseHtml
 * @namespace          sugar.js.console
 * @type                                Function
 *
 * Parse the simple html tags to format the console message
 *
 * @param           {String|Array}                  message                 The message to format of an array of messages to format
 * @return          {String}                                          The formated message
 *
 * @todo        interface
 * @todo        doc
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
exports.tagsMap = {
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
    iWarn: (tag, content) => parseHtml('<yellow>⚠</yellow> '),
    iCheck: (tag, content) => parseHtml(`<green>✓</green> `),
    iCross: (tag, content) => parseHtml(`<red>✖</red> `),
    iClose: (tag, content) => `✖`,
    iStart: (tag, content) => parseHtml(`<green>‣</green> `),
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
function parseHtml(message) {
    let isArray = false;
    if (Array.isArray(message)) {
        isArray = true;
    }
    else {
        message = [message];
    }
    message = message.map((m) => {
        return replaceTags_1.default(m, exports.tagsMap);
    });
    if (isArray)
        return message;
    return message[0];
}
module.exports = parseHtml;
//# sourceMappingURL=module.js.map