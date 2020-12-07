"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const replaceTags_1 = __importDefault(require("../../html/replaceTags"));
/**
 * @name                              mail
 * @namespace           sugar.js.log.htmlPresets
 * @type                              Function
 * @wip
 *
 * Replace all the "log" html tags like "<red>", "<bold>", etc... with the corresponding syntax for mail formating
 *
 * @param                   {String}                      text                        The text to process
 * @return                  {String}                                                  The processed text ready for the terminal
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function mail(text) {
    return replaceTags_1.default(text, {
        black: (tag, content) => `<span style="color: black">${content}</span>`,
        red: (tag, content) => `<span style="color: #FF0000">${content}</span>`,
        green: (tag, content) => `<span style="color: #008000">${content}</span>`,
        yellow: (tag, content) => `<span style="color: #F1C40F">${content}</span>`,
        blue: (tag, content) => `<span style="color: #0000FF">${content}</span>`,
        magenta: (tag, content) => `<span style="color: #800080">${content}</span>`,
        cyan: (tag, content) => `<span style="color: #5DADE2">${content}</span>`,
        white: (tag, content) => `<span style="color: white">${content}</span>`,
        bgBlack: (tag, content) => `<span style="background-color: black">${content}</span>`,
        bgRed: (tag, content) => `<span style="background-color: #FF0000">${content}</span>`,
        bgGreen: (tag, content) => `<span style="background-color: #008000">${content}</span>`,
        bgYellow: (tag, content) => `<span style="background-color: #F1C40F">${content}</span>`,
        bgBlue: (tag, content) => `<span style="background-color: #0000FF">${content}</span>`,
        bgMagenta: (tag, content) => `<span style="background-color: #800080">${content}</span>`,
        bgCyan: (tag, content) => `<span style="background-color: #5DADE2">${content}</span>`,
        bgWhite: (tag, content) => `<span style="background-color: white">${content}</span>`,
        bold: (tag, content) => `<span style="font-weight: bold;">${content}</span>`,
        dim: (tag, content) => `<span style="">${content}</span>`,
        italic: (tag, content) => `<span style="font-style: italic;">${content}</span>`,
        underline: (tag, content) => `<span style="font-style: underline;">${content}</span>`,
        strike: (tag, content) => `<span text-decoration="line-through;">${content}</span>`,
        br: (tag, content) => '<br />'
    });
}
module.exports = mail;
//# sourceMappingURL=mail.js.map