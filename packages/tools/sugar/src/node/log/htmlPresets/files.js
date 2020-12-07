"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const replaceTags_1 = __importDefault(require("../../html/replaceTags"));
/**
 * @name                              files
 * @namespace           sugar.js.log.htmlPresets
 * @type                              Function
 * @wip
 *
 * Replace all the "log" html tags like "<red>", "<bold>", etc... with the corresponding syntax for the files
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
function files(text) {
    return replaceTags_1.default(text, {
        black: (tag, content) => content,
        red: (tag, content) => content,
        green: (tag, content) => content,
        yellow: (tag, content) => content,
        blue: (tag, content) => content,
        magenta: (tag, content) => content,
        cyan: (tag, content) => content,
        white: (tag, content) => content,
        bgBlack: (tag, content) => content,
        bgRed: (tag, content) => content,
        bgGreen: (tag, content) => content,
        bgYellow: (tag, content) => content,
        bgBlue: (tag, content) => content,
        bgMagenta: (tag, content) => content,
        bgCyan: (tag, content) => content,
        bgWhite: (tag, content) => content,
        bold: (tag, content) => content,
        dim: (tag, content) => content,
        italic: (tag, content) => content,
        underline: (tag, content) => content,
        strike: (tag, content) => content,
        br: (tag, content) => '\n'
    });
}
module.exports = files;
//# sourceMappingURL=files.js.map